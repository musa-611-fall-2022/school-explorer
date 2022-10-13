import schools from '../data/schools.js';
import { initializeSchoolMap, showSchoolsOnMap } from './schools-map.js';
import { showSchoolsInList } from './schools-list.js';


let schoolMap = initializeSchoolMap();
showSchoolsOnMap(schools, schoolMap);

let schoolList = document.querySelector('#school-list');
showSchoolsInList(schools, schoolList);


let schoolGradeFilters = document.querySelectorAll('.Grade-checkbox');
let schoolNameFilter = document.querySelector('#school-name-input');


function getFilteredSchools(){
 let filteredSchools = schools;

  //Filter based on grade school name
  const text = schoolNameFilter.value;
  filteredSchools = schools.filter(function (school) {
    const name = school['name'].toLowerCase ();
    const hasText = name.includes(text);
    return hasText;
 });

 //Filter based on grade checkboxes
 for (const checkbox of schoolGradeFilters) {
  if (checkbox.checked) {
    filteredSchools = filteredSchools.filter(function (school) {
      const grade = checkbox.value;
      if (school[grade] === "1") {
        return true;
      } else {
        return false;
      }
    });
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

// Expose variables to the global scope
window.schools = schools;
window.schoolMap = schoolMap;
window.schoolGradeFilters = schoolGradeFilters;
window.schoolNameFilter = schoolNameFilter;
window.schoolList = schoolList;

