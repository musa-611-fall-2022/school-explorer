function initializeSchoolMap() {
    let schoolMap = L.map('school-map').setView([39.995, -75.13], 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/keelbn/cl8w1pun9001514odcvwo00gb/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2VlbGJuIiwiYSI6ImNqaWVseGZjZzA3emMzdnAxM296OTFjNG8ifQ.W2j9Y2mz4t6vGRyKJk_Nyw', {
        maxZoom: 19,
        minZoom: 10,
        attribution: '© OpenStreetMap',
    }).addTo(schoolMap);


    return schoolMap;
}

function makeSchoolFeature(school) {
    return {
        "type": "Feature",
        "id": school['sdp_id'],
        "properties": {
          "school_name": school['name'],
          "abbr_name": school['abbr_name'],
          "address": school['Street Address'],
          "grades": school['Current Grade Span Served'],
        },
        "geometry": school['geom'],
      };
}

function showSchoolsOnMap(schoolsToShow, schoolsMap) {
    if (schoolsMap.schoolLayer !== undefined){
        schoolsMap.removeLayer(schoolsMap.schoolLayer);
    }

    const schoolFeatureCollection = {
        "type": "FeatureCollection",
        "features": schoolsToShow.map(makeSchoolFeature),
    };

    schoolsMap.schoolLayer = L.geoJSON(schoolFeatureCollection, {
        pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
        style:{
            stroke: null,
            fillOpacity: 0.9,
            radius: 3,
            color: 'red',
        },
    })
    .bindTooltip(layer => layer.feature.properties['schoo_name'])
    .addTo(schoolsMap);

    //schoolsMap.selectedLayer = L.geoJSON
}

export {
    initializeSchoolMap,
    showSchoolsOnMap,
};
