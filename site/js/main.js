import schools from '../data/schools.js';
import { initializeSchoolMap, showSchoolOnMap, } from '../js/school-map.js';
import { showSchoolInList } from './school-list.js';



let schoolmap = initializeSchoolMap();
showSchoolOnMap(schools, schoolmap);

let schoolList = document.querySelector('#school-list');
showSchoolInList(schools, schoolList);

// define checkbox and textbox
let gradeCheckboxes = document.querySelectorAll('.schoolgrade-checkbox');
let schoolNameInput = document.querySelector('#school-name-input');

function shouldShowSchool() {
    let filteredSchools = schools;
    //filter based on textbox
    const text = schoolNameInput.value;
    filteredSchools = filteredSchools.filter(function (school) {
        const name = school['name'].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });

    //filter based on checkbox
    //here is a problem is that I can't select right grade, I just use the simple "includes" to select
    for (const checkbox of gradeCheckboxes) {
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
for (const cb of gradeCheckboxes) {
    cb.addEventListener('change', () => {
        const filteredSchools = shouldShowSchool();
        showSchoolOnMap(filteredSchools, schoolmap);
        showSchoolInList(filteredSchools, schoolList);
    });
}

// text box
schoolNameInput.addEventListener('input', () => {
    const filteredSchools = shouldShowSchool();
    showSchoolOnMap(filteredSchools, schoolmap);
    showSchoolInList(filteredSchools, schoolList);
});

window.schools = schools;
window.schoolmap = schoolmap;
window.gradeCheckboxes = gradeCheckboxes;