import schools from '../data/schools.js';
import { showSchoolsOnMap, initializeSchoolMap } from './school-map.js';
import { showSchoolsInList } from './school-list.js';


export let schoolsShownOnMap = schools;


let schoolMap = initializeSchoolMap();

showSchoolsOnMap(schools, schoolMap);


window.schoolMap=schoolMap;


let schoolList = document.querySelector('#school-list');


showSchoolsInList(schools, schoolList);

let schoolGradeFilters = document.querySelectorAll(".Grade-checkbox");

let schoolNameFilter = document.querySelector("#school-name-input");

function getFilteredSchools(){
    let filteredSchools = schools;

    //Filter by name
    const inputtext = schoolNameFilter.value;
    filteredSchools = schools.filter(school =>school["name"].toLowerCase().includes(inputtext));
    //Filter by grade
    for (const checkbox of schoolGradeFilters) {
        if (checkbox.checked) {
            filteredSchools = filteredSchools.filter(school =>
                school[checkbox.value] == '1',
            );
    }
}

return filteredSchools;
}

for (const cb of schoolGradeFilters){
    cb.addEventListener('change', () => {
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
window.schoolGradeFilters = schoolGradeFilters;
window.schoolNameFilter = schoolNameFilter;
window.schoolList = schoolList;

