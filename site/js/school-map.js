function initializeSchoolMap() {
    let schoolMap = L.map("school-map").setView([40.00658887714428, -75.1300204468765],11);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
    }).addTo(schoolMap);

    return schoolMap
    }


function makeSchoolFeature(schools) {
    const schoolInfo = {
        "type":"Feature",
        "id": schools['sdp_id'],
        "properties": {
            "schoolName": schools['name'],
            "schoolType": schools['School Level'],
            "id": schools['sdp_id'],
            "gradeLevels": {
                "gradeK": schools['Grade K'],
                "grade1": schools['Grade 1'],
                "grade2": schools['Grade 2'],
                "grade3": schools['Grade 3'],
                "grade4": schools['Grade 4'],
                "grade5": schools['Grade 5'],
                "grade6": schools['Grade 6'],
                "grade7": schools['Grade 7'],
                "grade8": schools['Grade 8'],
                "grade9": schools['Grade 9'],
                "grade10": schools['Grade 10'],
                "grade11": schools['Grade 11'],
                "grade12": schools['Grade 12'],
            }
        },
    "geometry": schools['geom'],
    }
    console.log(schoolInfo)
    return schoolInfo
}

function showSchoolsOnMap(schoolsToShow, schoolMap){
    if (schoolMap.schoolLayers !== undefined) {
        schoolMap.removeLayer(schoolMap.schoolLayers);
    }
const stopFeatureCollection = {
    "type": "FeatureCollection",
    "features": schoolsToShow.map(makeSchoolFeature),
};

schoolMap.schoolLayers = L.geoJSON(stopFeatureCollection, {
    pointToLayer: (geoJsonPoint, latlng) =>  L.circleMarker(latlng),
    style: {
        stroke: null,
        color: "#023047",
        fillOpacity: 0.8, 
        radius: 4,
    }
})
.bindTooltip(layer => layer.feature.properties['schoolName'])
.addTo(schoolMap);
}


export {
    initializeSchoolMap,
    showSchoolsOnMap,
};

window.makeSchoolFeature=makeSchoolFeature;
console.log(makeSchoolFeature)
