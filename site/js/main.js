// import schools data
import schools from '../data/schools.js';
// import map module
import { initializeSchoolMap, showSchoolsOnMap } from "./school-map.js";
// import list module
import { showSchoolsInList } from "./school-list.js";

let schoolMap = initializeSchoolMap();
showSchoolsOnMap(schools, schoolMap);

let schoolList = document.querySelector("#school-list");
showSchoolsInList(schools, schoolList);

// event listener for school search textbox
let schoolNameFilter = document.querySelector('#school-name-filter');
// event listener for grade checkboxes
let schoolGradeFilters = document.querySelectorAll('.grade-checkbox');

function getFilteredSchools() {
    let filteredSchools = schools;

    // check textbox input
    const text = schoolNameFilter.value.toLowerCase(); // get value in textbox; turn to lowercase to avoid inconsistencies
    filteredSchools = schools.filter(function (school) {
      const name = school['name'].toLowerCase(); //turn stop names to lowercase as well
      const hasText = name.includes(text);
      return hasText;
    });

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

// check for new inputs to textbox to filter schools
schoolNameFilter.addEventListener('input', () => {
    let filteredSchools = getFilteredSchools();
    showSchoolsOnMap(filteredSchools, schoolMap);
    showSchoolsInList(filteredSchools, schoolList);
  });

// check for new inputs to grade checkboxes
for (const checkbox of schoolGradeFilters) {
  checkbox.addEventListener('change', () => {
    const filteredSchools = getFilteredSchools();
    showSchoolsOnMap(filteredSchools, schoolMap);
    showSchoolsInList(filteredSchools, schoolList);
  });
}


// expose objects to global scope
window.schools = schools;
window.schoolNameFilter = schoolNameFilter;