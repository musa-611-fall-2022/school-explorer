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
    let schoolMap = L.map('school-map').setView([40, -75.15], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
  }).addTo(schoolMap);

  return schoolMap;
  }

function showSchoolsOnMap(schoolsToShow, schoolMap, colorCode){
  if (schoolMap.schoolLayers !== undefined){
    schoolMap.removeLayer(schoolMap.schoolLayers);
  }

    const schoolFeatureCollection = { //creates geoJSON feature collection
        "type": "FeatureCollection",
        "features": schoolsToShow.map(makeSchoolFeature),
      };

    schoolMap.schoolLayers = L.geoJSON(schoolFeatureCollection, { //could create a separate function called showSchools
        pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
        style: {
          stroke: false,
          fillOpacity: 1,
          radius: 3,
          color: colorCode,
        },
      })
      .bindTooltip(layer => {
        return layer.feature.properties['school_name'];
      })
      .addTo(schoolMap);
}


export {
    initMap,
    makeSchoolFeature,
    showSchoolsOnMap,
};