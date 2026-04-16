# Free Flow — Local Free Water Springs

A zero-dependency single-page web app that maps free, publicly accessible water springs.
Pick a region from the dropdown or tap **Near me** to auto-select the closest curated region
and sort springs by distance from your current location.

## Run it

No build step. Serve the folder with any static server and open it in a browser:

```bash
cd local-water-springs
python3 -m http.server 8000
# then visit http://localhost:8000
```

(Or just open `index.html` directly — geolocation needs `https://` or `localhost`.)

## Features

- Interactive Leaflet map with OpenStreetMap tiles
- Curated dataset of known free public springs (artesian, mineral, wild, and fountain)
- Filter by spring type
- "Near me" uses browser geolocation to jump to the nearest region and sort by distance
- Each card links out to OpenStreetMap for directions
- Potable vs. "treat before drinking" indicator on every entry

## Adding springs

Edit `data.js`. Each region is an object with a `springs` array; every entry needs
`name`, `type`, `venue`, `address`, `coords: [lat, lng]`, `potable`, and `description`.
Keep the `type` value to one of `artesian`, `mineral`, `spring`, or `fountain` so the
filter buttons and marker colors stay consistent.

## Safety note

Listings are compiled from public sources. Spring conditions change. Always check with
local authorities and, if in doubt, filter or boil the water before drinking.
