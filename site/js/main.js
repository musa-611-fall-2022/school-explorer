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

//Filter by grade
function filterByGrade(schoolsList) {
    let filteredSchools = schoolsList;
    for (const checkbox of schoolGradeFilters) {
        if (checkbox.checked) {
            filteredSchools = filteredSchools.filter(school =>
                school[checkbox.value] == '1',
            );
        }
    }
    return filteredSchools;
}

//Filter by name
function filterByName(schoolsList) {
    let filteredSchools = schoolsList;
    const inputText = schoolNameFilter.value.toLowerCase();
    filteredSchools = filteredSchools.filter(school =>
       school["name"].toLowerCase().includes(inputText));
    return filteredSchools;
}



for(const checkbox of schoolGradeFilters){
    checkbox.addEventListener('change', ( ) => {
        schoolsShownOnMap = filterByGrade(filterByName(schools));
        showSchoolsOnMap(schoolsShownOnMap, schoolMap);
        showSchoolsInList(schoolsShownOnMap, schoolList);
    });
}

schoolNameFilter.addEventListener('input', ( ) => {
    schoolsShownOnMap = filterByGrade(filterByName(schools));
    showSchoolsOnMap(schoolsShownOnMap, schoolMap);
    showSchoolsInList(schoolsShownOnMap, schoolList);
});


window.schools = schools;
window.schoolGradeFilters = schoolGradeFilters;
window.schoolNameFilter = schoolNameFilter;
window.schoolList = schoolList;

