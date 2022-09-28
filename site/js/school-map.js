import universitycity from '../data/universitycity.js';

function initializeStopMap() {
  let stopMap = L.map('stop-map').setView([39.95522712709254, -75.19864425285742], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
  }).addTo(stopMap);

  L.geoJSON(universitycity, {
    style: { fill: null, color: '#000' },
  }).addTo(stopMap);

  return stopMap;
}

function makeStopFeature(stop) {
  return {
    "type": "Feature",
    "id": stop['stop_id'],
    "properties": {
      "stop_name": stop['stop_name'],
      "routes_ids": stop['routes_ids'],
      "stop_id": stop['stop_id'],
      "wheelchair_boarding": stop['wheelchair_boarding'],
    },
    "geometry": stop['geom'],
  };
}

function showStopsOnMap(stopsToShow, stopMap) {
  const stopFeatureCollection = {
    "type": "FeatureCollection",
    "features": stopsToShow.map(makeStopFeature),
  };

  L.geoJSON(stopFeatureCollection, {
    pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
    style: {
      stroke: null,
      fillOpacity: 0.9,
      radius: 3,
    },
  }).addTo(stopMap);
}

export {
  initializeStopMap,
  showStopsOnMap,
};