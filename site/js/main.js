import schools from '../data/schools.js';
import catchments from '../data/catchments.js';

let schoolMap = L.map('school-map').setView([40.0, -75.11], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { 
    maxZoom: 19, 
    attribution: '© OpenStreetMap',
 }).addTo(schoolMap);
 
 //Add catchments as a geojson layer
 L.geoJSON(catchments, {
    style: {fill: null, color: 'black'}
 }).addTo(schoolMap);

// Function to pull geomtery
// function pulls select features from each school
function makeSchoolFeature(school) {
    return{
        'type': 'Feature',
        'id': school["sdp_id"],
        'properties':{
            "school_name": school["name"],
            "Email": school["FACE Liason Email"],
            "Phone Number": school["FACE Liasion Phone Number"],
            "Admission type": school["Admission Type"],
            "Grades Served": school["Current Grade Span Served"],
        },
        "geometry": school["geom"],
    };
}

// Function should map all the points we just pulled
const schoolFeatureCollection = {
    "type": "FeatureCollection",
    "features": schools.map(makeSchoolFeature),
};

L.geoJSON(schoolFeatureCollection).addTo(schoolMap);


// Expose variables to the global scope
window.makeSchoolFeature = makeSchoolFeature;
window.schools = schools;
window.catchments = catchments;