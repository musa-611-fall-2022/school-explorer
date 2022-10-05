import schools from '../data/schools.js';
import { initializeSchoolMap, showSchoolsOnMap} from './schools-maps.js';

let schoolMap = initializeSchoolMap();
showSchoolsOnMap(schools, schoolMap)

//All is for all the check boxes
let schoolCheckboxes = document.querySelectorAll('.grade-checkbox');

//No all because we only have one text box
let schoolNameInput = document.querySelector('#school-name-input');

for (const cb of schoolCheckboxes) {
    cb.addEventListener('change', (evt) => {
        const checkbox = evt.target;
        const level = checkbox.value.toLowerCase();
        const filteredSchools = schools.filter(function (schools) {
            const levels = schools["School Level"].toLowerCase();
            const hasLevels = levels.includes(level);
            return hasLevels;
        });
        showSchoolsOnMap(filteredSchools, schoolMap);
        console.log('why do you hate me?')
    });
}

schoolNameInput.addEventListener('input',() => {
    const text = schoolNameInput.value.toLowerCase();
    const filteredSchools = schools.filter(function (schools) {
        const name = schools["name"].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });
        showSchoolsOnMap(filteredSchools, schoolMap);
});

// Expose variables to the global scope
window.schools = schools;
window.schoolCheckboxes = schoolCheckboxes;
window.schoolMap = schoolMap;