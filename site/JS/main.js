import schools from '../data/schools.js'
import { initializeSchoolMap, showSchoolsOnMap, showSchoolNames,} from './schools-map.js'

let schoolMap = initializeSchoolMap();
showSchoolsOnMap(schools, schoolMap);

//let schoolCheckboxes = document.querySelectorAll('.route-checkbox');

/*for (const cb of routeCheckboxes) {
    cb.addEventListener('change', (evt) => {
        console.log('you clicked on a checkbox');
        console.log(evt.target);
    })
}*/

showSchoolNames(schools, "console2");

window.schools = schools;
window.route

