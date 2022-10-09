import schools from '../data/schools.js';

import { initSchoolMap, showSchoolsOnMap } from './mapfunctions.js';
import { showSchoolsInList } from './schoollist.js';

import { gradefun } from './schoollevels.js';

let schoolMap = initSchoolMap();
showSchoolsOnMap(schools, schoolMap);

schools.map(gradefun);

let schoollist = document.querySelector('#school-list');
showSchoolsInList(schools, schoollist);




// Expose variable to the global scope

// to copypasta
let gradeCheckboxes = document.querySelectorAll('.grade-checkbox');
let schoolNameFilter = document.querySelector('#school-name-filter');

function shouldShowSchool() {
  let filteredSchools = schools;

  // Filter based on school name
  const text = schoolNameFilter.value;
  filteredSchools = filteredSchools.filter(function (school) {
    const name = school['name'].toLowerCase();
    const hasText = name.includes(text);
    return hasText;
  });

  // Filter based on grade checkboxes
  for (const checkbox of gradeCheckboxes) {
    if (checkbox.checked) {
      filteredSchools = filteredSchools.filter(function (school) {
        const grade = checkbox.value;
        const hasGrade = school[`Grade ${grade}`] === "1";
        return hasGrade;
      });
    }
  }

  return filteredSchools;
}



for (const cb of gradeCheckboxes) {
  cb.addEventListener('change', () => {
    const filteredSchools = shouldShowSchool();
    showSchoolsOnMap(filteredSchools, schoolMap);
    schoollist.innerHTML = '';
    showSchoolsInList(filteredSchools, schoollist);
  });
}

schoolNameFilter.addEventListener('input', () => {
    const filteredSchools = shouldShowSchool();
    showSchoolsOnMap(filteredSchools, schoolMap);
    schoollist.innerHTML = '';
    showSchoolsInList(filteredSchools, schoollist);
});





window.schoolMap = schoolMap;
window.schools = schools;
window.gradeCheckboxes = gradeCheckboxes;
window.schoolNameFilter = schoolNameFilter;
window.schoollist = schoollist;