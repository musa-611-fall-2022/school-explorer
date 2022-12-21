
import schools from '../data/schools.js';
import { showSchoolsInList } from './schoolList.js';
import { mapInitialize, showSchoolsOnMap } from './schoolMap.js';

//Initialize school map
let schoolMap = mapInitialize();

//Show schools on map
showSchoolsOnMap(schools, schoolMap);

//School filter & list
let schoolNameFilter = document.querySelector('#school-name-filter');
let gradeCheckboxes = document.querySelectorAll('.grade-checkbox');
let schoolList = document.querySelector('#school-list');

showSchoolsInList(schools, schoolList);

function getFilteredSchools(){
    let filteredSchools = schools;

    //Filter based on school name
    const text = schoolNameFilter.value;
    filteredSchools = schools.filter(function (school){
        const name = school['name'].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });

    // Filter based on school checkboxed
    for (const checkbox of gradeCheckboxes){
        const text = checkbox.value;
        if (checkbox.checked) {
            filteredSchools = filteredSchools.filter(function (school){
                const hasRoute = school[text];
                if (hasRoute === "1") {
                    return true;
                } else {
                    return false;
                }
            });
        }
    }
    return filteredSchools;
}

for (const cb of gradeCheckboxes){
    cb.addEventListener('change', ()=>{
        const filteredSchools = getFilteredSchools();
        showSchoolsOnMap(filteredSchools, schoolMap);
        showSchoolsInList(filteredSchools, schoolList);
    });
}


schoolNameFilter.addEventListener('input', () =>{
    const filteredSchools = getFilteredSchools();
    showSchoolsOnMap(filteredSchools, schoolMap);
    showSchoolsInList(filteredSchools, schoolList);
    window.schools = filteredSchools;
});

window.schoolNameFilter = schoolNameFilter;
window.schoolGradeFilters = gradeCheckboxes;
window.schools = schools;
window.schoolMap = schoolMap;
window.schoolList = schoolList;