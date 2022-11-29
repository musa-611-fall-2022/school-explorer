import schools from '../data/schools.js';
import { initializeSchoolMap,showSchoolOnMap } from './school-map.js';
import { showSchoolsInList } from './schools-list.js';


let schoolMap = initializeSchoolMap();
showSchoolOnMap(schools, schoolMap);

let schoollist = document.querySelector('#school-list');
showSchoolsInList( schools, schoollist);

let gradeCheckboxes = document.querySelectorAll('.grade-checkbox');
let schoolNameInput = document.querySelector('#school-name-input');

function getFilteredSchools(){
    let filteredSchools = schools;

    // filter based on name
    const text = schoolNameInput.value;
    filteredSchools = schools.filter(function (school){
        const name = school['name'].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });

    // filter based on grade checkbox 
    for (const checkbox of gradeCheckboxes) {
        if (checkbox.checked){
            filteredSchools = filteredSchools.filter( function (school){
                const grade = checkbox.value;
                if (school[grade] == 1) {
                    return school;
                } else {
                    return 0;
                }
            });
        }
    }

    return filteredSchools;
}

for (const cb of gradeCheckboxes) {
    cb.addEventListener('change', () => {
        const filteredSchools = getFilteredSchools();
        showSchoolOnMap(filteredSchools, schoolMap);
        showSchoolsInList(filteredSchools, schoollist);
    });
}

schoolNameInput.addEventListener('input', () => {
    const filteredSchools = getFilteredSchools();
    showSchoolOnMap(filteredSchools, schoolMap);
    showSchoolsInList(filteredSchools, schoollist);
});


// Expose variables to the global scope
window.school = schools;
window.schoolMap = schoolMap;
window.gradeCheckboxes = gradeCheckboxes;
//window.makeSchoolFeature = makeSchoolFeature;