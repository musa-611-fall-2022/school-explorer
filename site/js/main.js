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
        console.log('You clicked a checkbox');
        console.log(evt.target);
    });
}

//For when a change is made
schoolNameInput.addEventListener('change',() => {
    console.log('text changed: ' + schoolNameInput.value);
});

//For when content is inputted
schoolNameInput.addEventListener('input',() => {
    console.log('text changed: ' + schoolNameInput.value);
});

// Expose variables to the global scope
window.schools = schools;
window.schoolCheckboxes = schoolCheckboxes;