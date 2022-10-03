import schools from '../data/schools.js';
import { initializeSchoolMap, showSchoolsOnMap} from './schools-maps.js';

let schoolMap = initializeSchoolMap();
showSchoolsOnMap(schools, schoolMap)

let schoolCheckboxes = document.querySelectorAll('.grade-checkbox');

for (const cb of schoolCheckboxes) {
    cb.addEventListener('change', (evt) => {
        console.log('You clicked a checkbox');
        console.log(evt.target);
    });
}





// Expose variables to the global scope
window.schools = schools;
window.schoolCheckboxes = schoolCheckboxes;