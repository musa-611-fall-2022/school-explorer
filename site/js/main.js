import schools from '../data/schools.js';
import {initializeSchoolMap, showSchoolsOnMap} from './school-map.js';
import {showSchoolsInList} from './school-list.js';


let level = "Grade"

filteredSchools = filteredSchools.filter(function (school) {
    const school_type = checkbox.value;
    if (checkbox.value) {
        schools[c]
        return true
    } else {
        return false
    }
    return hasType;

let schoolMap = initializeSchoolMap();
showSchoolsOnMap(schools, schoolMap);

let schoolList = document.querySelector('#school-list');
showSchoolsInList(schools, schoolList);

let schoolCheckboxes = document.querySelectorAll('.school-checkbox')
let schoolNameInput = document.querySelector('#school-name-input')

function getFilteredSchools () {
    let filteredSchools = schools;

// Filter based on school name
    const text = schoolNameInput.value;
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
                const hasType = school['School Level'].includes(school_type);
                return hasType;
            });
        }
    }

    return filteredSchools;
}

for (const cb of schoolCheckboxes) {
    cb.addEventListener('change', () => {
        const filteredSchools = getFilteredSchools();
        showSchoolsOnMap(filteredSchools, schoolMap);
    });
}

schoolNameInput.addEventListener('input', () => {
    const filteredSchools = getFilteredSchools();
    showSchoolsOnMap(filteredSchools, schoolMap);
});

window.schools = schools;
window.schoolMap = schoolMap;
window.schoolCheckboxes = schoolCheckboxes;
