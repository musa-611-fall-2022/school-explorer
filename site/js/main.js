import schools from '../data/schools.js';
import { initializeschoolMap, showschoolOnMap } from './school-map.js';
import { showschoolInList } from './school-list.js';

let schoolMap = initializeschoolMap();
showschoolOnMap(schools, schoolMap);

let schoolList = document.querySelector('#school-list');
showschoolInList(schools, schoolList);

let gradeCheckboxes = document.querySelectorAll('.grade-checkbox');
let schoolNameInput = document.querySelector('#school-name-input');

function getFilteredschool() {
    let filteredschool = schools;

    // Filter based on school name
    const text = schoolNameInput.value;
    filteredschool = filteredschool.filter(function (school) {
      const name = school['name'].toLowerCase();
      const hasText = name.includes(text);
      return hasText;
    });
      // Filter based on school grade checkboxes
  for (const checkbox of gradeCheckboxes) {
    if (checkbox.checked) {
      filteredschool = filteredschool.filter(function (school) {
        const grade = checkbox.value;
        if (school[grade] === "1") {
            return true;
            } else {
            return false;
            }
      });
    }
  }

  return filteredschool;
}



for (const cb of gradeCheckboxes) {
    cb.addEventListener('change', () => {
      const filteredschool = getFilteredschool();
      showschoolOnMap(filteredschool, schoolMap);
      showschoolInList(filteredschool, schoolList);
    });
  }

  // eslint-disable-next-line no-undef
  schoolNameInput.addEventListener('input', () => {
    const filteredSchools = getFilteredschool();
    showschoolOnMap(filteredSchools, schoolMap);
    showschoolInList(filteredSchools, schoolList);
});

window.school = schools;
window.schoolMap = schoolMap;
window.schoolGradeFilters = gradeCheckboxes;
window.schoolNameFilter = schoolNameInput;
window.schoolList = schoolList;