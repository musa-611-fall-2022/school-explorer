import schools from '../data/schools.js';
import {initializeSchoolMap, showSchoolsOnMap} from './school-map.js';
import {showSchoolsInList} from './school-list.js';

let schoolMap = initializeSchoolMap();
showSchoolsOnMap(schools, schoolMap);

let schoolList = document.querySelector('#school-list');
showSchoolsInList(schools, schoolList);

let schoolCheckboxes = document.querySelectorAll('.school-checkbox')
let schoolNameFilter = document.querySelector('#school-name-filter')

function shouldShowSchool () {
    let filteredSchools = schools;

// Filter based on school name
    const text = schoolNameFilter.value;
    filteredSchools = filteredSchools.filter(function(school) {
        const name = school['name'].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });

//  Filter based on school checkboxes
    for (const checkbox of schoolCheckboxes) {
        if (checkbox.checked) {
            filteredSchools = filteredSchools.filter(function (school) {
                const school_type = checkbox.value;
                if (school[school_type] === "1") {
                    return true
                } else {
                    return false
                }

            });
        }
    }

    return filteredSchools;
}

for (const cb of schoolCheckboxes) {
    cb.addEventListener('change', () => {
        const filteredSchools = shouldShowSchool();
        showSchoolsOnMap(filteredSchools, schoolMap);
    });
}

schoolNameFilter.addEventListener('input', () => {
    const filteredSchools = shouldShowSchool();
    showSchoolsOnMap(filteredSchools, schoolMap);
    showSchoolsInList(filteredSchools, schoolList);
});



window.schools = schools;
window.schoolMap = schoolMap;
window.schoolCheckboxes = schoolCheckboxes;
window.schoolNameFilter
