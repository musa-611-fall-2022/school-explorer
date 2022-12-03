import schools from '../data/schools.js';
import { initializeschoolMap, showSchoolOnMap } from '../js/school-map.js';
import { showSchoolInList } from './school-list.js';



let schoolMap = initializeschoolMap();
showSchoolOnMap(schools, schoolMap);

let schoolList = document.querySelector('#school-list');
showSchoolInList(schools, schoolList);

// define checkbox and textbox
let schoolGradeFilters = document.querySelectorAll('.schoolgrade-checkbox');
let schoolNameFilter = document.querySelector('#school-name-input');

function shouldShowSchool() {
    let filteredSchools = schools;
    //filter based on textbox
    const text = schoolNameFilter.value;
    filteredSchools = filteredSchools.filter(function (school) {
        const name = school['name'].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });

    //filter based on checkbox
    //here is a problem is that I can't select right grade, I just use the simple "includes" to select
    for (const checkbox of schoolGradeFilters) {
        if (checkbox.checked) {
            filteredSchools = filteredSchools.filter(function (schools) {
                const grade = checkbox.value;
                const hasGrade = schools['Current Grade Span Served'].includes(grade);
                return hasGrade;
            });
        }
    }

    return filteredSchools;
}

// define checkbox eventlistener:
for (const cb of schoolGradeFilters) {
    cb.addEventListener('change', () => {
        const filteredSchools = shouldShowSchool();
        showSchoolOnMap(filteredSchools, schoolMap);
        showSchoolInList(filteredSchools, schoolList);
    });
}

// text box
schoolNameFilter.addEventListener('input', () => {
    const filteredSchools = shouldShowSchool();
    showSchoolOnMap(filteredSchools, schoolMap);
    showSchoolInList(filteredSchools, schoolList);
});

window.schools = schools;
window.schoolNameFilter = schoolNameFilter;
window.schoolGradeFilters = schoolGradeFilters;
window.schoolList = schoolList;
window.schoolMap = schoolMap;
