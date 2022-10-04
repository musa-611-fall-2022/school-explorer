import schools from '../data/schools.js';

function initializeSchoolMap() {
    let schoolMap = L.map('school-map').setView([39.955, -75.15], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
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

    const stopFeatureCollection = {
        "type": "FeatureCollection",
        "features": schoolsToShow.map(makeSchoolFeature),
    };

    schoolsMap.schoolLayer = L.geoJSON(stopFeatureCollection, {
        pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
        style:{
            stroke: null,
            fillOpacity: 0.9,
            radius: 3,
        },
    }).addTo(schoolsMap);
}

function showSchoolNames(schoolsToShow, locationId) {
    const schoolNames = schoolsToShow.map(x => x.name + "<br>");
    document.getElementById(locationId).innerHTML = schoolNames.join("");
}

export {
    initializeSchoolMap,
    showSchoolsOnMap,
    showSchoolNames,
};
