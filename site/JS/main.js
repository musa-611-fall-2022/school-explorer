import schools from '../data/schools.js'
import { initializeSchoolMap, showSchoolsOnMap, showSchoolNames,} from './schools-map.js'
import { htmlToElement } from './template-tools.js'
import { listSchoolCheckBoxes, shouldShowSchool, getFilteredSchools } from './schools-list.js'

let schoolMap = initializeSchoolMap();
let schoolNameInput = document.querySelector('#school-name-filter');

showSchoolsOnMap(schools, schoolMap);
showSchoolNames(schools, "console2");
listSchoolCheckBoxes(schools, "checkboxList");

let schoolCheckboxes = document.querySelectorAll('.school-checkbox');

schoolNameInput.addEventListener('input', () => {
    const filteredSchools = getFilteredSchools();
    showSchoolNames(filteredSchools, "console2");
    showSchoolsOnMap(filteredSchools, schoolMap);
})

for (let cb of schoolCheckboxes) {
    cb.addEventListener('change', () => {
        const filteredSchools = getFilteredSchools();
        showSchoolNames(filteredSchools, "console2");
        showSchoolsOnMap(filteredSchools, schoolMap);
    })
};



window.schools = schools;
window.route;
window.schoolNameInput = schoolNameInput;
window.schoolCheckboxes = schoolCheckboxes;

