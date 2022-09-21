import schools from '../data/schools.js'

let schoolMap = L.map('school-map').setView([39.95, -75.2], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(schoolMap);

//Expose variables to the global scope
window.schools = schools;


function makeSchoolFeature(d) {
    let thisSchool = schools[d];
    thisSchool.geom.coordinates = L.GeoJson.coordsToLatLngs(thisSchool.geom.coordinates)
    console.log(thisSchool.geom.coordinates)
    return thisSchool
}

/**for (let i = 0; i < schools.length; i++){
   
    let focus = makeSchoolFeature(i)
    let circle = L.circle(thisSchool.geom.coordinates)

    
}**/
makeSchoolFeature(1);

