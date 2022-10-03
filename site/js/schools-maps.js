import schools from '../data/schools.js';

let schoolMap = L.map('school-map').setView([40.0, -75.11], 13);

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

//CIRCLE MARKER IS NOT WORKING
L.geoJSON(schoolFeatureCollection, {
    pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
    style:{
        stroke: null,
        fillOpacity: 0.9,
        radius: 3,
        
    },
}).addTo(schoolMap);

// Expose variables to the global scope
window.makeSchoolFeature = makeSchoolFeature;
window.schools = schools;