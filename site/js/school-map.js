// import catchments from '../data/catchments.js';
import philly from '../data/philly.js';
// import schools from '../data/schools.js';
// import {schoolHighlight} from './school-list.js'; // might not need this


function initializeSchoolMap() {
    let schoolMap = L.map("school-map").setView([40.00658887714428, -75.1300204468765], 11);

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(schoolMap);

    // ATTEMPT AT STRETCH 1 TASK
    // L.geoJSON(catchments).addTo(schoolMap)

    L.geoJSON(philly, {
        style: {
            fill: null,
            color: "#023047",
            fillOpacity: 0.8,
        },
    }).addTo(schoolMap);

    return schoolMap;
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
    };
    return schoolInfo;
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
        fillOpacity: 0.7, radius: 5,
    },
})


.bindPopup(layer => layer.feature.properties['schoolName']).openPopup()

// ATTEMPT AT STRETCH 1 TASK
// .on("click", () => {
//     schoolHighlight(schools)
//     console.log(schools['name'])
// })


.addTo(schoolMap);

}

export {
    initializeSchoolMap,
    showSchoolsOnMap,
};

window.makeSchoolFeature=makeSchoolFeature;
console.log(makeSchoolFeature);

