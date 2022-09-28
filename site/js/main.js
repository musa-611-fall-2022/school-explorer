import schools from '../data/schools.js';
import { initializeStopMap, showStopsOnMap } from './school-map.js';

let schoolMap = L.map('schoolMap').setView([39.99873171497979, -75.1321119604354], 09);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(schoolMap);





let stopMap = initializeStopMap();
showStopsOnMap(stops, stopMap);

let routeCheckboxes = document.querySelectorAll('.route-checkbox');

for (const cb of routeCheckboxes) {
  cb.addEventListener('change', (evt) => {
    console.log('you clicked on a checkbox');
    console.log(evt.target);
  });
}

window.schools = schools;
window.routeCheckboxes = routeCheckboxes;
