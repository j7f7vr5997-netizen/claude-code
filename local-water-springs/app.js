(function () {
  "use strict";

  var citySelect = document.getElementById("city-select");
  var cityName = document.getElementById("city-name");
  var cityBlurb = document.getElementById("city-blurb");
  var geoStatus = document.getElementById("geo-status");
  var listEl = document.getElementById("springs-list");
  var filterButtons = document.querySelectorAll(".filter-btn");
  var locateBtn = document.getElementById("locate-btn");

  var state = {
    cityId: null,
    filter: "all",
    markers: [],
    activeId: null,
    userLocation: null,
    userMarker: null,
    sortByDistance: false,
  };

  var map = L.map("map", { scrollWheelZoom: true }).setView([30, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  window.CITIES.forEach(function (city) {
    var opt = document.createElement("option");
    opt.value = city.id;
    opt.textContent = city.name;
    citySelect.appendChild(opt);
  });

  citySelect.addEventListener("change", function () {
    setCity(citySelect.value);
  });

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      state.filter = btn.getAttribute("data-filter");
      render();
    });
  });

  locateBtn.addEventListener("click", function () {
    if (!navigator.geolocation) {
      geoStatus.textContent = "Geolocation isn't supported in this browser.";
      return;
    }
    geoStatus.textContent = "Locating you…";
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        state.userLocation = [pos.coords.latitude, pos.coords.longitude];
        state.sortByDistance = true;
        locateBtn.classList.add("active");
        var nearest = nearestCity(state.userLocation);
        geoStatus.textContent =
          "Showing " + nearest.name + " — nearest region in the dataset.";
        placeUserMarker();
        setCity(nearest.id);
      },
      function (err) {
        geoStatus.textContent =
          "Couldn't get your location (" + err.message + ").";
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  });

  function springId(city, idx) {
    return city.id + "-" + idx;
  }

  function typeIcon(type) {
    switch (type) {
      case "artesian":
        return "\uD83D\uDEB0"; // faucet
      case "mineral":
        return "\u2728"; // sparkles
      case "spring":
        return "\uD83D\uDCA7"; // droplet
      case "fountain":
        return "\u26F2"; // fountain
      default:
        return "\uD83D\uDCA7";
    }
  }

  function typeColor(type) {
    switch (type) {
      case "artesian":
        return "#1f8ab3";
      case "mineral":
        return "#6a4bb2";
      case "spring":
        return "#2a9670";
      case "fountain":
        return "#3a8ad1";
      default:
        return "#1f8ab3";
    }
  }

  function getCity(id) {
    for (var i = 0; i < window.CITIES.length; i++) {
      if (window.CITIES[i].id === id) return window.CITIES[i];
    }
    return null;
  }

  function haversine(a, b) {
    var R = 6371; // km
    var toRad = function (d) {
      return (d * Math.PI) / 180;
    };
    var dLat = toRad(b[0] - a[0]);
    var dLon = toRad(b[1] - a[1]);
    var lat1 = toRad(a[0]);
    var lat2 = toRad(b[0]);
    var h =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  function formatDistance(km) {
    if (km < 1) return Math.round(km * 1000) + " m";
    if (km < 10) return km.toFixed(1) + " km";
    return Math.round(km) + " km";
  }

  function nearestCity(coords) {
    var best = window.CITIES[0];
    var bestDist = haversine(coords, best.center);
    for (var i = 1; i < window.CITIES.length; i++) {
      var d = haversine(coords, window.CITIES[i].center);
      if (d < bestDist) {
        bestDist = d;
        best = window.CITIES[i];
      }
    }
    return best;
  }

  function placeUserMarker() {
    if (!state.userLocation) return;
    if (state.userMarker) {
      map.removeLayer(state.userMarker);
    }
    state.userMarker = L.marker(state.userLocation, {
      icon: L.divIcon({
        className: "you-icon",
        html: '<div class="you-marker"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      }),
      interactive: false,
    }).addTo(map);
  }

  function clearMarkers() {
    state.markers.forEach(function (m) {
      map.removeLayer(m.marker);
    });
    state.markers = [];
  }

  function makeIcon(type) {
    var color = typeColor(type);
    var emoji = typeIcon(type);
    var html =
      '<div style="background:' +
      color +
      ';color:white;border:2px solid white;border-radius:50%;' +
      "width:34px;height:34px;display:flex;align-items:center;justify-content:center;" +
      'font-size:16px;box-shadow:0 2px 6px rgba(0,0,0,0.25);">' +
      emoji +
      "</div>";
    return L.divIcon({
      className: "spring-marker",
      html: html,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -14],
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function directionsUrl(spring) {
    return (
      "https://www.openstreetmap.org/?mlat=" +
      spring.coords[0] +
      "&mlon=" +
      spring.coords[1] +
      "#map=18/" +
      spring.coords[0] +
      "/" +
      spring.coords[1]
    );
  }

  function popupHTML(spring, distanceKm) {
    var potableTag = spring.potable
      ? '<span class="potable-tag yes">Potable</span>'
      : '<span class="potable-tag no">Treat before drinking</span>';
    var distHtml =
      distanceKm != null
        ? '<span class="distance">' + formatDistance(distanceKm) + " away</span>"
        : "";
    return (
      '<div class="popup">' +
      "<h3>" +
      escapeHtml(spring.name) +
      "</h3>" +
      '<div class="venue">' +
      escapeHtml(spring.venue) +
      " &middot; " +
      escapeHtml(spring.address) +
      "</div>" +
      '<p class="desc">' +
      escapeHtml(spring.description) +
      "</p>" +
      '<div class="popup-meta">' +
      potableTag +
      distHtml +
      ' <a class="directions-link" target="_blank" rel="noopener" href="' +
      directionsUrl(spring) +
      '">View on OSM &rarr;</a>' +
      "</div>" +
      "</div>"
    );
  }

  function setActive(id) {
    state.activeId = id;
    var cards = listEl.querySelectorAll(".card");
    cards.forEach(function (c) {
      c.classList.toggle("active", c.getAttribute("data-id") === id);
    });
    var active = listEl.querySelector('.card[data-id="' + id + '"]');
    if (active) active.scrollIntoView({ behavior: "smooth", block: "nearest" });
    var entry = state.markers.find(function (m) {
      return m.id === id;
    });
    if (entry) {
      entry.marker.openPopup();
    }
  }

  function render() {
    var city = getCity(state.cityId);
    if (!city) return;

    cityName.textContent = city.name;
    cityBlurb.textContent = city.blurb;

    var items = city.springs.map(function (spring, idx) {
      var distanceKm = state.userLocation
        ? haversine(state.userLocation, spring.coords)
        : null;
      return {
        spring: spring,
        id: springId(city, idx),
        distanceKm: distanceKm,
      };
    });

    var filtered = items.filter(function (item) {
      return state.filter === "all" || item.spring.type === state.filter;
    });

    if (state.sortByDistance && state.userLocation) {
      filtered.sort(function (a, b) {
        return a.distanceKm - b.distanceKm;
      });
    }

    listEl.innerHTML = "";
    if (filtered.length === 0) {
      var empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent =
        "No " + state.filter + " springs listed for this region.";
      listEl.appendChild(empty);
    } else {
      filtered.forEach(function (item) {
        listEl.appendChild(buildCard(item));
      });
    }

    clearMarkers();
    filtered.forEach(function (item) {
      var marker = L.marker(item.spring.coords, {
        icon: makeIcon(item.spring.type),
      })
        .addTo(map)
        .bindPopup(popupHTML(item.spring, item.distanceKm));
      marker.on("click", function () {
        setActive(item.id);
      });
      state.markers.push({
        id: item.id,
        marker: marker,
        spring: item.spring,
      });
    });

    if (state.markers.length > 0) {
      var layers = state.markers.map(function (m) {
        return m.marker;
      });
      if (state.userMarker && state.sortByDistance) {
        layers.push(state.userMarker);
      }
      var group = L.featureGroup(layers);
      map.fitBounds(group.getBounds().pad(0.2));
    } else {
      map.setView(city.center, city.zoom);
    }
  }

  function buildCard(item) {
    var spring = item.spring;
    var card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-id", item.id);
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    var head = document.createElement("div");
    head.className = "card-head";

    var titleWrap = document.createElement("div");
    var title = document.createElement("div");
    title.className = "card-title";
    title.innerHTML =
      '<span class="badge ' +
      spring.type +
      '">' +
      spring.type +
      "</span> " +
      escapeHtml(spring.name);
    var venue = document.createElement("div");
    venue.className = "venue";
    venue.textContent = spring.venue + " \u00B7 " + spring.address;
    titleWrap.appendChild(title);
    titleWrap.appendChild(venue);

    var potable = document.createElement("span");
    potable.className = "potable-tag " + (spring.potable ? "yes" : "no");
    potable.textContent = spring.potable ? "Potable" : "Treat first";

    head.appendChild(titleWrap);
    head.appendChild(potable);

    var body = document.createElement("div");
    body.className = "card-body";
    body.textContent = spring.description;

    var meta = document.createElement("div");
    meta.className = "card-meta";

    var distSpan = document.createElement("span");
    distSpan.className = "distance";
    distSpan.textContent =
      item.distanceKm != null ? formatDistance(item.distanceKm) + " away" : "";
    meta.appendChild(distSpan);

    var dir = document.createElement("a");
    dir.className = "directions-link";
    dir.href = directionsUrl(spring);
    dir.target = "_blank";
    dir.rel = "noopener";
    dir.textContent = "View on map \u2192";
    dir.addEventListener("click", function (e) {
      e.stopPropagation();
    });
    meta.appendChild(dir);

    card.appendChild(head);
    card.appendChild(body);
    card.appendChild(meta);

    card.addEventListener("click", function () {
      setActive(item.id);
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActive(item.id);
      }
    });
    return card;
  }

  function setCity(id) {
    state.cityId = id;
    state.activeId = null;
    citySelect.value = id;
    render();
  }

  setCity(window.CITIES[0].id);

  setTimeout(function () {
    map.invalidateSize();
  }, 50);
  window.addEventListener("resize", function () {
    map.invalidateSize();
  });
})();
