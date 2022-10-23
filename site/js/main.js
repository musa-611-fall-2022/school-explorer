import schools from '../data/schools.js';
import { initializeSchoolMap, showSchoolsOnMap } from './school-map.js';
import { showSchoolsInList } from './schools-list.js';

let schoolMap = initializeSchoolMap();
showSchoolsOnMap(schools, schoolMap);

let schoolList = document.querySelector('#school-list');
showSchoolsInList(schools, schoolList);

let schoolLevelFilters = document.querySelectorAll('.grade-checkbox');
let schoolNameFilter = document.querySelector('#school-name-filter');

function getFilteredSchools() {
    let filteredSchools = schools;

    //Filter based on school name checkboxes
    const text = schoolNameFilter.value;
    filteredSchools = filteredSchools.filter(function (school) {
        const name = school['name'].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });

    //Filter based on grade level checkboxes
    for (const checkbox of schoolLevelFilters) {
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

for (const cb of schoolLevelFilters) {
    cb.addEventListener( 'change', () => {
        const filteredSchools = getFilteredSchools();
        showSchoolsOnMap(filteredSchools, schoolMap);
        showSchoolsInList(filteredSchools, schoolList);
        });
    }

schoolNameFilter.addEventListener('input', () => {
  const filteredSchools = getFilteredSchools();
    showSchoolsOnMap(filteredSchools, schoolMap);
    showSchoolsInList(filteredSchools, schoolList);
});

window.schools = schools;
window.schoolMap = schoolMap;
window.schoolLevelFilters = schoolLevelFilters;



