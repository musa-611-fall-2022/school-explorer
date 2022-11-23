import schools from '../data/schools.js'


//Phila outline? do we need that?

function makeSchoolFeature(school){
    return {
    "type": "Feature",
    "id": school['sdp_id'],
    "properties": {
      "school_name": school['name'], // I might want to include different features?
      "school_id": school['sdp_id'],
      "school_sortname": school['sort_name'],
    },
    "geometry": school['geom'],
  };
}

//const schoolFeatureCollection = { //creates geoJSON feature collection
//    "type": "FeatureCollection",
//    "features": schools.map(makeSchoolFeature),
//  };

function initMap(){
    let schoolMap = L.map('school-map').setView([40,-75.2],10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
  }).addTo(schoolMap);

  //L.geoJSON(schoolFeatureCollection, { //could create a separate function called showSchools
  //  pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
  //  style: {
  //    stroke: false,
  //    fillOpacity: 1,
  //    radius: 3,
  //    color: "#ff7800"
  //  }
  //}).addTo(schoolMap);

  }

function showSchoolsOnMap(schoolsToShow, schoolMap){
    const schoolFeatureCollection = { //creates geoJSON feature collection
        "type": "FeatureCollection",
        "features": schoolsToShow.map(makeSchoolFeature),
      };

    L.geoJSON(schoolFeatureCollection, { //could create a separate function called showSchools
        pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
        style: {
          stroke: false,
          fillOpacity: 1,
          radius: 3,
          color: "#ff7800"
        }
      }).addTo(schoolMap);
}


export {
    initMap,
    makeSchoolFeature,
    showSchoolsOnMap,
};