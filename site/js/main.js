import schools from '../data/schools.js';
import { initializeStopMap, showStopsOnMap } from './school-map.js';


let schoolMap = initializeSchoolMap();
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
