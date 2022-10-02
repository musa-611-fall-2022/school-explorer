import schools from '../data/schools.js';
import catchment from '../data/catchments.js';

let schoolMap = L.map('school-map').setView([40.0, -75.11], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { 
    maxZoom: 19, 
    attribution: '© OpenStreetMap',
 }).addTo(schoolMap);

// Expose variables to the global scope
window.schools = schools;
window.schools = catchment;