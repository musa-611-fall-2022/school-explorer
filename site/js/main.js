import schools from '../data/schools.js'

let schoolMap = L.map('school-map').setView([40,-75.2],10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
}).addTo(schoolMap);



// Expose variables to the global scope
window.schools = schools;
window.mapview=schoolMap