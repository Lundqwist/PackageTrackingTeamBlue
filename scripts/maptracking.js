/*
if the user is logged in, show the map and tracking information.
Get coordinates from the packagedata.
Use coordinates in the map to track the package.


*/

let map = null;
let mapLayers = null;

// Orange pin used for the package's current location
const packageIcon = L.divIcon({
    className: "map-pin",
    html: '<svg viewBox="0 0 24 32" width="34" height="45"><path d="M12 0C5.4 0 0 5.3 0 11.9 0 20.8 12 32 12 32s12-11.2 12-20.1C24 5.3 18.6 0 12 0z" fill="#f26a1b"/><circle cx="12" cy="12" r="4.5" fill="#fff"/></svg>',
    iconSize: [34, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -40]
});

// Creates the map inside the element with the given id
function initMap(elementId) {
    map = L.map(elementId).setView([62, 15], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
    mapLayers = L.layerGroup().addTo(map);
}

// Draws the route: sender (blue dot) -> current location (orange pin) -> recipient (grey dot)
function showPackageOnMap(pkg) {
    mapLayers.clearLayers();

    const start = [pkg.from.latitude, pkg.from.longitude];
    const current = [pkg.currentLocation.latitude, pkg.currentLocation.longitude];
    const end = [pkg.recipient.latitude, pkg.recipient.longitude];

    L.polyline([start, current], { color: "#1556c9", weight: 4 }).addTo(mapLayers);
    L.polyline([current, end], { color: "#8a9bb8", weight: 3, dashArray: "6 8" }).addTo(mapLayers);

    L.circleMarker(start, { radius: 8, color: "#fff", weight: 3, fillColor: "#1556c9", fillOpacity: 1 })
        .bindPopup(pkg.from.company)
        .addTo(mapLayers);
    L.circleMarker(end, { radius: 7, color: "#fff", weight: 3, fillColor: "#8a9bb8", fillOpacity: 1 })
        .bindPopup(pkg.recipient.address)
        .addTo(mapLayers);
    L.marker(current, { icon: packageIcon })
        .bindPopup(pkg.currentLocation.name)
        .addTo(mapLayers);

    map.fitBounds(L.latLngBounds([start, current, end]), { padding: [40, 40], maxZoom: 12 });
}
