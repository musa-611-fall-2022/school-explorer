function initializeSchoolMap() {
    let schoolMap = L.map('school-map').setView([39.95228, -75.16245], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
}).addTo(schoolMap);

    return schoolMap;
}



function makeSchoolfeature(school) {
    return {
        'type' : 'Feature',
        'id': school['sdp_id'],
        'properties' : {
            'school_name': school['sort_name'],
            'school_level': school['School level'],
            "Current Grade Span Served": school['Current Grade Span Served'],
            "Grade 1": school['Grade 1'],
            "Grade 2": school['Grade 2'],
            "Grade 3": school['Grade 3'],
            "Grade 4": school['Grade 4'],
            "Grade 5": school['Grade 5'],
            "Grade 6": school['Grade 6'],
            "Grade 7": school['Grade 7'],
            "Grade 8": school['Grade 8'],
            "Grade 9": school['Grade 9'],
            "Grade 10": school['Grade 10'],
            "Grade 11": school['Grade 11'],
            "Grade 12": school['Grade 12'],
            "Grade K": school['Grade K'],
        },
        "geometry" : school['geom'],
    };
}


function showSchoolOnMap(schoolToShow, schoolMap) {
    if (schoolMap.schoolLayers !== undefined) {
        schoolMap.removeLayer(schoolMap.schoolLayers);
    }

    const schoolFeatureCollection = {
        'type': 'FeatureCollection',
        'features': schoolToShow.map(makeSchoolfeature),
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
    initializeSchoolMap,
    showSchoolOnMap,
};


