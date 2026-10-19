/*
if the user is logged in, show the map and tracking information.
Get coordinates from the packagedata.
Use coordinates in the map to track the package.


*/

/*
  ABOUT THE MAP
  -------------
  The map uses Leaflet (https://leafletjs.com), a free JavaScript library for
  interactive maps. It is loaded in status.html from a CDN (unpkg.com) BEFORE
  this file, which is why we can use the global object "L" here.

  The map pictures ("tiles") come from OpenStreetMap. Leaflet downloads small
  square images for the area you look at and puts them together.

  Coordinates are always written as [latitude, longitude]:
    latitude  = north/south (Sweden is around 55 to 69)
    longitude = east/west   (Sweden is around 11 to 24)
*/

// These start as null ("no value yet") and are filled in by initMap().
// They live outside the functions so that both functions can use them.
let map = null;
let mapLayers = null;

/*
  A custom marker icon: the orange map pin from the design.

  L.divIcon lets us use our own HTML (here an inline SVG drawing) as a marker
  instead of Leaflet's default blue pin image.
    iconSize   = width and height in pixels
    iconAnchor = which pixel of the icon touches the coordinate. [17, 45] is
                 the bottom-middle, so the tip of the pin points at the place.
    popupAnchor = where the popup bubble opens, relative to the anchor.
*/
const packageIcon = L.divIcon({
    className: "map-pin",
    html: '<svg viewBox="0 0 24 32" width="34" height="45"><path d="M12 0C5.4 0 0 5.3 0 11.9 0 20.8 12 32 12 32s12-11.2 12-20.1C24 5.3 18.6 0 12 0z" fill="#f26a1b"/><circle cx="12" cy="12" r="4.5" fill="#fff"/></svg>',
    iconSize: [34, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -40]
});

// Creates the map inside the HTML element with the given id (e.g. <div id="map">).
function initMap(elementId) {
    // Start centred over Sweden at zoom level 5 (higher number = closer).
    map = L.map(elementId).setView([62, 15], 5);

    // {s}, {z}, {x}, {y} are filled in by Leaflet: server, zoom level and tile
    // position. The attribution text is required by OpenStreetMap's licence.
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    // A layer group is a "box" for markers and lines. Putting everything for
    // one package in the same group means we can remove it all at once later.
    mapLayers = L.layerGroup().addTo(map);
}

/*
  Draws the journey of one package:
    blue dot      = where it was sent from
    solid line    = the part of the trip that is already done
    orange pin    = where the package is right now
    dashed line   = the part of the trip that is left
    grey dot      = the recipient's address
*/
function showPackageOnMap(pkg) {
    // Remove whatever the previous package drew on the map.
    mapLayers.clearLayers();

    // Pick out the coordinates from the package object (see data/packages.json).
    const start = [pkg.from.latitude, pkg.from.longitude];
    const current = [pkg.currentLocation.latitude, pkg.currentLocation.longitude];
    const end = [pkg.recipient.latitude, pkg.recipient.longitude];

    // A polyline is a line through a list of points.
    // dashArray "6 8" means: draw 6 pixels, skip 8 pixels, repeat.
    L.polyline([start, current], { color: "#1556c9", weight: 4 }).addTo(mapLayers);
    L.polyline([current, end], { color: "#8a9bb8", weight: 3, dashArray: "6 8" }).addTo(mapLayers);

    // circleMarker draws a dot that stays the same size in pixels when zooming.
    // bindPopup adds a little text bubble that opens when you click the marker.
    L.circleMarker(start, { radius: 8, color: "#fff", weight: 3, fillColor: "#1556c9", fillOpacity: 1 })
        .bindPopup(pkg.from.company)
        .addTo(mapLayers);
    L.circleMarker(end, { radius: 7, color: "#fff", weight: 3, fillColor: "#8a9bb8", fillOpacity: 1 })
        .bindPopup(pkg.recipient.address)
        .addTo(mapLayers);

    // The current location is added last so the pin is drawn on top.
    L.marker(current, { icon: packageIcon })
        .bindPopup(pkg.currentLocation.name)
        .addTo(mapLayers);

    // Zoom and move the map so all three points are visible.
    // padding keeps the points away from the edges; maxZoom stops it from
    // zooming in too far when the points are close together.
    map.fitBounds(L.latLngBounds([start, current, end]), { padding: [40, 40], maxZoom: 12 });
}
