import catchments from '../data/catchments.js';
import philly from '../data/philly.js';

function initializeSchoolMap() {
    let schoolMap = L.map("school-map").setView([40.00658887714428, -75.1300204468765],11);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
    }).addTo(schoolMap);

    L.geoJSON(catchments).addTo(schoolMap);

    L.geoJSON(philly, {
        style: {
            fill: null,
            color: "#023047",
            fillOpacity: 0.8 
        }
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
            "address": schools['Street Address'],
            "website": schools['Website'],
            "id": schools['sdp_id'],
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
const schoolFeatureCollection = {
    "type": "FeatureCollection",
    "features": schoolsToShow.map(makeSchoolFeature),
};

schoolMap.schoolLayers = L.geoJSON(schoolFeatureCollection, {
    pointToLayer: (geoJsonPoint, latlng) =>  L.circleMarker(latlng),
    style: {
        stroke: null,
        color: "#023047",
        fillOpacity: 0.9, 
        radius: 4,
    }
})

.bindPopup(layer => layer.feature.properties['schoolName'], {
    if (schoolName)
}).openPopup()
.addTo(schoolMap);


// .bindTooltip([layer => layer.feature.properties['website']])
// .bindTooltip(layer => layer.feature.properties['schoolName'])
// .addTo(schoolMap);
}

export {
    initializeSchoolMap,
    showSchoolsOnMap,
};

window.makeSchoolFeature=makeSchoolFeature;
console.log(makeSchoolFeature)
