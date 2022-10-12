import schools from '../data/schools.js'

let schoolMap = L.map('school-map').setView([40,-75.2],10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
}).addTo(schoolMap);

//Phila outline? do we need that?\

function makeSchoolFeature(school){
    return {
    "type": "Feature",
    "id": school['sdp_id'],
    "properties": {
      "school_name": school['name'],
      "school_id": school['sdp_id'],
      "school_sortname": school['sort_name'],
    },
    "geometry": school['geom'],
  };
}

const schoolFeatureCollection = {
  "type": "FeatureCollection",
  "features": schools.map(makeSchoolFeature),
};

L.geoJSON(schoolFeatureCollection, {
  pointToLayer: (geoJdonPoint, latlng) => L.circleMarker(latlng),
  style: {
    stroke: false,
    fillOpacity: 1,
    radius: 3,
    color: "#ff7800"
  }
}).addTo(schoolMap);


// Expose variables to the global scope
window.schools = schools;
window.mapview = schoolMap;
// might add a window.phila = phila; for an outline map
window.makeSchoolFeature = makeSchoolFeature;