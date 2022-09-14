// import schools data
import schools from '../data/schools.js';

// initializing map object using L (Leaflet) library
let schoolMap = L.map('school-map').setView([39.16, -75.2], 10);

// adding basemap to map (taken from Leaflet intro example)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
}).addTo(schoolMap);

// expose variables to the global scope
window.schools = schools;