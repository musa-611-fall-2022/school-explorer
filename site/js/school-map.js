import schools from '../data/schools.js';

function initializeSchoolMap() {
  let schoolMap = L.map('schoolMap').setView([39.99873171497979, -75.1321119604354], 09);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(schoolMap);

  L.geoJSON(schools, {
    style: { fill: null, color: '#000' },
  }).addTo(schoolMap);

  return schoolMap;
}

function makeSchoolFeature(school) {
  return {
    "type": "Feature",
    "id": school['stop_id'],
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