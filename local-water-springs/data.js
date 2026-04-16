// Free public water springs by city. Each spring entry includes:
//   name, type (artesian | mineral | spring | fountain), venue (the park or site),
//   address, coords ([lat, lng]), potable (boolean), description, url (optional).
// Data is curated from publicly available information; verify locally before drinking.
window.CITIES = [
  {
    id: "olympia-wa",
    name: "Olympia, WA",
    center: [47.0425, -122.8945],
    zoom: 14,
    blurb:
      "Olympia sits atop a shallow artesian aquifer; a restored public well flows free in the heart of downtown.",
    springs: [
      {
        name: "Artesian Commons Well",
        type: "artesian",
        venue: "Artesian Commons Park",
        address: "415 4th Ave E, Olympia, WA",
        coords: [47.0428, -122.8999],
        potable: true,
        description:
          "Free-flowing community-maintained artesian well. Locals bring jugs; flow runs 24/7.",
      },
      {
        name: "Diamond Parking Artesian Spigot",
        type: "artesian",
        venue: "Diamond Parking lot (historic spigot)",
        address: "4th Ave & Jefferson St, Olympia, WA",
        coords: [47.0423, -122.9013],
        potable: true,
        description:
          "The original downtown artesian tap that started the 'save the well' movement in the 1990s.",
      },
    ],
  },
  {
    id: "manitou-springs-co",
    name: "Manitou Springs, CO",
    center: [38.8597, -104.9172],
    zoom: 15,
    blurb:
      "Nine free-flowing, naturally carbonated mineral springs run along a walkable loop through the historic town.",
    springs: [
      {
        name: "Shoshone Spring",
        type: "mineral",
        venue: "Manitou Springs Historic District",
        address: "Canon Ave near Ruxton Ave, Manitou Springs, CO",
        coords: [38.8578, -104.9196],
        potable: true,
        description:
          "Strong mineral flavor, highest sodium content of the loop. Popular first stop on the Springs Walk.",
      },
      {
        name: "Navajo Spring",
        type: "mineral",
        venue: "Beneath the Manitou Springs Arcade",
        address: "934 Manitou Ave, Manitou Springs, CO",
        coords: [38.8586, -104.9168],
        potable: true,
        description:
          "The town's namesake spring. Flows from a stone grotto under the old arcade building.",
      },
      {
        name: "Cheyenne Spring",
        type: "mineral",
        venue: "Manitou Ave at Ruxton",
        address: "934 Manitou Ave, Manitou Springs, CO",
        coords: [38.8585, -104.9172],
        potable: true,
        description:
          "Low sodium, light carbonation. Often called the most drinkable of the mineral springs.",
      },
      {
        name: "Wheeler Spring",
        type: "mineral",
        venue: "Park Ave at Manitou Ave",
        address: "Park Ave & Manitou Ave, Manitou Springs, CO",
        coords: [38.8603, -104.9124],
        potable: true,
        description:
          "Discovered in 1920 beneath the Wheeler Bank. Rich in lithium and soda.",
      },
      {
        name: "Stratton Spring",
        type: "mineral",
        venue: "Manitou Ave median",
        address: "Manitou Ave near El Paso Blvd, Manitou Springs, CO",
        coords: [38.8606, -104.9093],
        potable: true,
        description:
          "Gazebo-style spring house at the east entrance to the historic district.",
      },
      {
        name: "Seven Minute Spring",
        type: "mineral",
        venue: "Seven Minute Spring Park",
        address: "Otoe Place, Manitou Springs, CO",
        coords: [38.8615, -104.9142],
        potable: true,
        description:
          "Named for its original geyser-like eruption cycle. Now a gentle pour from a stone basin.",
      },
      {
        name: "Twin Spring",
        type: "mineral",
        venue: "Ruxton Ave",
        address: "Ruxton Ave, Manitou Springs, CO",
        coords: [38.8561, -104.9225],
        potable: true,
        description:
          "Two spouts side by side; slightly sweeter than the downtown springs.",
      },
    ],
  },
  {
    id: "saratoga-springs-ny",
    name: "Saratoga Springs, NY",
    center: [43.0648, -73.7913],
    zoom: 14,
    blurb:
      "Twenty-one public mineral springs flow across Saratoga Spa State Park and Congress Park, all free to sample.",
    springs: [
      {
        name: "Congress Spring",
        type: "mineral",
        venue: "Congress Park",
        address: "268 Broadway, Saratoga Springs, NY",
        coords: [43.0793, -73.7884],
        potable: true,
        description:
          "Housed in a Greek Revival pavilion. High carbonation and a famously mineral bite.",
      },
      {
        name: "Hathorn Spring No. 1",
        type: "mineral",
        venue: "Congress Park entrance",
        address: "Spring St & Putnam St, Saratoga Springs, NY",
        coords: [43.0800, -73.7872],
        potable: true,
        description:
          "One of the strongest waters in town; historically bottled as a laxative tonic.",
      },
      {
        name: "Deer Park Spring",
        type: "mineral",
        venue: "Saratoga Spa State Park",
        address: "19 Roosevelt Dr, Saratoga Springs, NY",
        coords: [43.0537, -73.8021],
        potable: true,
        description:
          "Mild-tasting spring along the park's loop road; fill-up jugs on weekends.",
      },
      {
        name: "Orenda Spring",
        type: "mineral",
        venue: "Saratoga Spa State Park",
        address: "Geyser Rd, Saratoga Springs, NY",
        coords: [43.0509, -73.8106],
        potable: true,
        description:
          "Flows from a tufa mound the spring has built over decades. Iron-rich.",
      },
      {
        name: "Island Spouter",
        type: "mineral",
        venue: "Saratoga Spa State Park",
        address: "Geyser Creek, Saratoga Springs, NY",
        coords: [43.0501, -73.8112],
        potable: false,
        description:
          "A cold-water geyser — fun to visit but not intended for drinking.",
      },
    ],
  },
  {
    id: "ashland-or",
    name: "Ashland, OR",
    center: [42.1946, -122.7139],
    zoom: 15,
    blurb:
      "Ashland pipes its namesake lithia mineral water into a free public fountain right on the downtown plaza.",
    springs: [
      {
        name: "Lithia Fountain",
        type: "mineral",
        venue: "Ashland Plaza",
        address: "Plaza, Ashland, OR",
        coords: [42.1949, -122.7126],
        potable: true,
        description:
          "Three spouts pour lithium-rich mineral water piped from Lithia Springs. Famously sulfurous.",
      },
      {
        name: "Lithia Park Drinking Fountains",
        type: "fountain",
        venue: "Lithia Park",
        address: "59 Winburn Way, Ashland, OR",
        coords: [42.1928, -122.7142],
        potable: true,
        description:
          "Chilled fresh-water fountains along the creekside paths — not mineralized, but free and cold.",
      },
    ],
  },
  {
    id: "eldorado-springs-co",
    name: "Eldorado Springs, CO",
    center: [39.9314, -105.2737],
    zoom: 15,
    blurb:
      "A tiny canyon town famous for its artesian water; the public tap at the edge of town is free to fill.",
    springs: [
      {
        name: "Eldorado Artesian Public Tap",
        type: "artesian",
        venue: "Eldorado Springs bottling house",
        address: "294 Artesian Dr, Eldorado Springs, CO",
        coords: [39.9319, -105.2712],
        potable: true,
        description:
          "Outside spigot provided by the bottling company. Bring jugs; flow is continuous.",
      },
    ],
  },
  {
    id: "bay-area-ca",
    name: "San Francisco Bay Area, CA",
    center: [37.8651, -122.2585],
    zoom: 10,
    blurb:
      "A handful of free, publicly-known drinking springs sit within a short drive of the bay.",
    springs: [
      {
        name: "Sweeney Ridge Spring Box",
        type: "spring",
        venue: "Sweeney Ridge, GGNRA",
        address: "Sneath Ln trailhead, San Bruno, CA",
        coords: [37.6139, -122.4497],
        potable: false,
        description:
          "Historic concrete spring box along the ridgeline. Treat before drinking.",
      },
      {
        name: "Alhambra Natural Spring",
        type: "spring",
        venue: "Alhambra Valley roadside",
        address: "Alhambra Valley Rd, Martinez, CA",
        coords: [37.9592, -122.1543],
        potable: false,
        description:
          "Longstanding roadside pipe with a steady flow. Popular with locals; test or treat before drinking.",
      },
      {
        name: "Sunol Water Temple Tap",
        type: "fountain",
        venue: "Sunol Water Temple grounds",
        address: "505 Paloma Way, Sunol, CA",
        coords: [37.5835, -121.8840],
        potable: true,
        description:
          "Potable public fountain at the historic temple marking the confluence of Hetch Hetchy sources.",
      },
    ],
  },
  {
    id: "columbia-river-gorge",
    name: "Columbia River Gorge, OR",
    center: [45.6321, -121.9443],
    zoom: 10,
    blurb:
      "Free roadside springs line the old Columbia River Highway between Troutdale and Hood River.",
    springs: [
      {
        name: "Oneonta Roadside Spring",
        type: "spring",
        venue: "Historic Columbia River Hwy",
        address: "Historic US-30 near Oneonta Gorge, OR",
        coords: [45.5893, -122.0736],
        potable: false,
        description:
          "Pipe-fed roadside spring cascading from the cliff face. Treat before drinking.",
      },
      {
        name: "Starvation Creek Spring",
        type: "spring",
        venue: "Starvation Creek State Park",
        address: "I-84 Exit 55, Hood River, OR",
        coords: [45.6871, -121.6898],
        potable: false,
        description:
          "Creek-side flow near the falls pulloff. Cold and clear but untreated.",
      },
    ],
  },
  {
    id: "iceland-south",
    name: "South Iceland",
    center: [64.1466, -21.9426],
    zoom: 7,
    blurb:
      "Icelandic tap water comes from springs; several roadside and trailside flows are iconic stops.",
    springs: [
      {
        name: "Reykjavík Tap (Austurvöllur)",
        type: "fountain",
        venue: "Austurvöllur square",
        address: "Vallarstræti, Reykjavík",
        coords: [64.1466, -21.9402],
        potable: true,
        description:
          "The city drinking fountain delivers the same cold spring water as any home tap — among the cleanest in the world.",
      },
      {
        name: "Þingvellir National Park Spring",
        type: "spring",
        venue: "Þingvellir National Park",
        address: "Þingvellir, Bláskógabyggð",
        coords: [64.2558, -21.1295],
        potable: true,
        description:
          "Fill bottles at the visitor-center fountain fed directly by glacial springs.",
      },
    ],
  },
];
