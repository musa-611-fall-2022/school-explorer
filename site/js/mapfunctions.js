
function initSchoolMap(){
    let schoolMap = L.map('school-map').setView([39.95, -75.16], 10);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
    }).addTo(schoolMap);
    return schoolMap;
}


function makeSchoolFeature(school){
    return {
        "type": "Feature",
        "id": school['sdp_id'],
        "properties": {
          "school_name": school['name'],
          "admission_type": school['Admission_Type'],
          "year_open": school['Year Opened'],
        },
        "geometry": school['geom'],
      };
}

function showSchoolsOnMap(SchoolsToShow, schoolMap) {
  if (schoolMap.schoolLayers !== undefined) {
    schoolMap.removeLayer(schoolMap.schoolLayers);
  }
    const schoolFeatureCollection = {
      "type": "FeatureCollection",
      "features": SchoolsToShow.map(makeSchoolFeature),
    };
    schoolMap.schoolLayers = L.geoJSON(schoolFeatureCollection, {
      pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
      style: {
        stroke: null,
        fillOpacity: 0.9,
        radius: 3,
      },
    })
    .bindTooltip(layer => layer.feature.properties['school_name'])
    .addTo(schoolMap);
  }



export {
    initSchoolMap,
    showSchoolsOnMap,
};