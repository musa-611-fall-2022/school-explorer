
import schools from '../data/schools.js';

let schoolMap = L.map('school-map').setView( [39.96,-75.2],10)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
}).addTo(schoolMap);

//Expose varibles to the global scope
window.schools = schools;
