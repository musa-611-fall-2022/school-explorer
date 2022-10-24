import allSchools from '../data/schools.js';
import { initializeSchoolMap, showSchoolsOnMap } from './school-map.js';
import { showSchoolsInList } from './schools-list.js';

let schoolMap = initializeSchoolMap();
showSchoolsOnMap(allSchools, schoolMap);

let schoolList = document.querySelector('#school-list');
showSchoolsInList(allSchools, schoolList);

let schoolNameFilter = document.querySelector('#school-name-filter');
let schoolLevelFilters = document.querySelectorAll('.grade-checkbox');
var schools = allSchools

function getFilteredSchools() {
    let filteredSchools = allSchools.filter(function (school){
        return school["name"].toLowerCase().includes(schoolNameFilter.value.toLowerCase())
    })
    //Filter based on school name checkboxes
    // for (const text of schoolNameFilter.value) {
    //     filteredSchools = filteredSchools.filter(function (school) {
    //         return school['name'].toLowerCase().includes(text);
    //     });
    // }

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
    schools = getFilteredSchools();
    showSchoolsOnMap(schools, schoolMap);
    showSchoolsInList(schools, schoolList);
    window.schools = schools;

    console.log(`WINDOW SCHOOLS ${window.schools.length}`)
});

window.schoolMap = schoolMap;
window.schoolLevelFilters = schoolLevelFilters;
window.schoolNameFilter = schoolNameFilter;

