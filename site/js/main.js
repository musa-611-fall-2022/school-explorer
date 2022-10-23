// import schools from '../data/schools.js';
import { initializeSchoolMap, showSchoolsOnMap } from './school-map.js';
import { showSchoolsInList } from './schools-list.js';

let schoolMap = initializeSchoolMap();
showSchoolsOnMap(schools, schoolMap);

let schoolList = document.querySelector('#school-list');
showSchoolsInList(schools, schoolList);

let gradeCheckboxes = document.querySelectorAll('.grade-checkbox');
let schoolNameInput = document.querySelector('#school-name-filter');

function getFilteredSchools() {
    let filteredSchools = schools;

    //Filter based on school name checkboxes
    const text = schoolNameInput.value;
    filteredSchools = filteredSchools.filter(function (school) {
        const name = school['name'].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });

    //Filter based on grade level checkboxes
    for (const checkbox of gradeCheckboxes) {
        if (checkbox.checked) {
            filteredSchools = filteredSchools.filter(function (school) {
                const grades = checkbox.value;
                const hasGrade = school['School Level'].includes(grades);
                return hasGrade;
            });
        }
    }

    return filteredSchools;
}

for (const cb of gradeCheckboxes) {
    cb.addEventListener( 'change', () => {
        const filteredSchools = getFilteredSchools();
        showSchoolsOnMap(filteredSchools, schoolMap);
        showSchoolsInList(filteredSchools, schoolList);
        });
    } 

schoolNameInput.addEventListener('input', () => {
  const filteredSchools = getFilteredSchools();
    showSchoolsOnMap(filteredSchools, schoolMap);
    showSchoolsInList(filteredSchools, schoolList);
});

window.schools = schools;
window.schoolMap = schoolMap;
window.gradeCheckboxes = gradeCheckboxes;



