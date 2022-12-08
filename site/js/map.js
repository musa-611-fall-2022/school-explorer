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
      "school_level": school['School Level'],
    },
    "geometry": school['geom'],
  };
}


function initMap(){
    let schoolMap = L.map('school-map').setView([40,-75.15],11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
  }).addTo(schoolMap);

  return schoolMap
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
      })
      .bindTooltip(layer => {
        return layer.feature.properties['school_name']
      })
      .addTo(schoolMap);
}

function showSchoolsOnMap3(schoolsToShow, schoolMap){
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
        color: "#000000"
      }
    })
    .bindTooltip(layer => {
      return layer.feature.properties['school_name']
    })
    .addTo(schoolMap);
}

export {
    initMap,
    makeSchoolFeature,
    showSchoolsOnMap,
    showSchoolsOnMap3,
};