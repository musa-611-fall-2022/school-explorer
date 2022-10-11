import schools from "../data/schools.js";
import { mapInitialize, showSchoolsOnMap, showSchoolsInList } from './myfunction.js';

//Initialize School Map
let schoolmap = mapInitialize();


//Show Schools on Map
showSchoolsOnMap(schools, schoolmap);

//Filter Schools + add List
let schoolNameInput = document.querySelector('#school-name-filter');
let gradeCheckboxes = document.querySelectorAll('.grade-checkbox');
let schoolList = document.querySelector('#school-list');

showSchoolsInList(schools, schoolList);

function getFilteredSchools(){
    let filteredSchools = schools;

    //Filter based on school name
    const text = schoolNameInput.value;
    filteredSchools = schools.filter(function (school){
        const name = school['name'].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });

    // Filter based on route checkboxed
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
        showSchoolsOnMap(filteredSchools, schoolmap);
        showSchoolsInList(filteredSchools, schoolList);
    });
}

schoolNameInput.addEventListener('input', () =>{
    const filteredSchools = getFilteredSchools();
    showSchoolsOnMap(filteredSchools, schoolmap);
    showSchoolsInList(filteredSchools, schoolList);
});

window.schoolNameFilter = schoolNameInput;
window.schoolGradeFilters = gradeCheckboxes;
window.schools = schools;
window.schoolMap = schoolmap;
window.schoolList = schoolList;