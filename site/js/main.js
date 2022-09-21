// import schools data
import schools from '../data/schools.js';

// expose school object to the global scope
window.schools = schools;

// initializing map object using L (Leaflet) library
let schoolMap = L.map('school-map').setView([39.95244193418098, -75.16433792450688], 11);

// adding basemap to map (taken from Leaflet intro example)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
}).addTo(schoolMap);

// function to turn school element into a geoJSON-like object
function makeSchoolFeature(school) {
    let schoolGeo = {
        "type":"FeatureCollection",
        "features":[{
            "type":"Feature",
            "geometry":{
                "type":"Point",
                "coordinates":school.geom.coordinates,
            },
            "properties":school,
        }],
    };
    return schoolGeo;
}
// expose function to window
window.makeSchoolFeature = makeSchoolFeature;

//create geoJSON layer to put school data into
let schoolLayer = L.geoJSON().addTo(schoolMap);

// function to add an array of schools to the map
function displaySchoolArray(schoolArray, schoolLayer) {
    for (let i = 0; i < schoolArray.length; i++) {
        let school = makeSchoolFeature(schoolArray[i]);
        schoolLayer.addData(school);
    }
}
displaySchoolArray(schools, schoolLayer);

