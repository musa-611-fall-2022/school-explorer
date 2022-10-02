import schools from '../data/schools.js';

function initializeSchoolMap() {
  let schoolMap = L.map('schoolMap').setView([39.99873171497979, -75.1321119604354], 11);

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
    "id": school['sdp_id'],
    "properties": {
      "school_name": school['name'],
      "school_type": school['School Level'],
      "school_id": school['sdp_id']
    },
    "geometry": school['geom'],
  };
}

function showSchoolsOnMap(schoolsToShow, schoolMap) {
  if (schoolMap.stopLayers !== undefined){
    schoolMap.removeLayer(schoolMap.stopLayers);
  }
  
  const stopFeatureCollection = {
    "type": "FeatureCollection",
    "features": schoolsToShow.map(makeSchoolFeature),
  };

  schoolMap.stopLayers = L.geoJSON(stopFeatureCollection, {
    pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
    style: {
      stroke: null,
      fillOpacity: 0.9,
      radius: 3,
    },
  })
  .bindTooltip(layer => {return layer.feature.properties['school_name']})
  .addTo(schoolMap);
}



export {
  initializeSchoolMap,
  showSchoolsOnMap,
};