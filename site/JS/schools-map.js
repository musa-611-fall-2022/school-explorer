import schools from '../data/schools.js';

function initializeSchoolMap() {
    let schoolMap = L.map('school-map').setView([39.955, -75.15], 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/keelbn/cl8c2nvmq003114li896sf85z/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2VlbGJuIiwiYSI6ImNqaWVseGZjZzA3emMzdnAxM296OTFjNG8ifQ.W2j9Y2mz4t6vGRyKJk_Nyw', {
        maxZoom: 19,
        minZoom: 10,
        attribution: '© OpenStreetMap',
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

    console.log(schoolFeatureCollection);

    schoolsMap.schoolLayer = L.geoJSON(schoolFeatureCollection, {
        pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
        style:{
            stroke: null,
            fillOpacity: 0.9,
            radius: 3,
            color: 'red',
        },
        
    }).addTo(schoolsMap);

    //schoolsMap.selectedLayer = L.geoJSON
}

export {
    initializeSchoolMap,
    showSchoolsOnMap,
};
