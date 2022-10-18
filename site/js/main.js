//import data
import schools from '../data/schools.js';
import { initializeSchoolsMap, showSchoolsOnMap } from './schools-map.js';

let schoolsMap = initializeSchoolsMap();
showSchoolsOnMap(schools, schoolsMap);

let gradeCheckboxes = document.querySelectorAll( '.grade-checkbox');
let schoolNameInput = document.querySelector('#school-name-input');

for (const cb of gradeCheckboxes){
    cb.addEventListener('change', (evt)=> {
        const checkbox = evt.target;
        const grade = checkbox.value;
        const isChecked = checkbox.checked;
        if (isChecked){
            console.log(grade);
        const filteredSchools = schools.filter(function(school){
            const grades = school['routes_ids'];
            const hasGrades = grades.includes(grades);
            return hasGrades;
        });
        showSchoolsOnMap(filteredSchools, schoolsMap);
    } else {
        showSchoolsOnMap(schools, schoolsMap);
    }
    });
}

schoolNameInput.addEventListener('input', () => {
    const text = schoolNameInput.value;
    console.log('the text box contains: ' + text);
    const filteredSchools = schools.filter(function (school){
        const name = school['name'].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });
    showSchoolsOnMap(filteredSchools, schoolsMap);
    console.log(filteredSchools);
});

//make data ?global
window.schools = schools;
window.schoolsMap = schoolsMap;

