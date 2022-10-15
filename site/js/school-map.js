import schools from '../data/schools.js';

function initializeSchoolMap() {
  let schoolMap = L.map('schoolMap').setView([39.99873171497979, -75.1321119604354], 11);

  L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(schoolMap);

  L.geoJSON(schools, {
    style: { fill: null, color: '#000' },
  }).addTo(schoolMap);

  return schoolMap;
}

function makeSchoolFeature(schools) {
  const schoolInfo = {
    "type": "Feature",
    "id": schools['sdp_id'],
    "properties": {
      "school_name": schools["name"],
      "school_type": schools['School Level'],
      "school_id": schools['sdp_id'],
      "address": schools['Street Address']
    },
    "geometry": schools['geom'],
  };

  return schoolInfo;
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
      radius: 4,
    },
  })
  .bindTooltip(layer => {return layer.feature.properties['school_name']})
  .addTo(schoolMap);
}



export {
  initializeSchoolMap,
  showSchoolsOnMap,
};