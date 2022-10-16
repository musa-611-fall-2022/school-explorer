import schools from '../data/schools.js';
import { initializeSchoolMap, showSchoolsOnMap } from './school-map.js';
import { showSchoolsInList } from './schools-list.js';

let schoolMap = initializeSchoolMap();
showSchoolsOnMap(schools, schoolMap);

let schoolList = document.querySelector('#school-list');
showSchoolsInList(schools, schoolList);

let typeCheckboxes = document.querySelectorAll('.school-checkbox');
let schoolNameInput = document.querySelector('#school-name-filter');

function getFilteredSchools() {
  let filteredSchools = schools;

  //Filter based on school name
  const text = schoolNameInput.value;
  filteredSchools = schools.filter(function (school) {
    const name = school['name'].toLowerCase();
    const hasText = name.includes(text);
    return hasText;
  });

  //Filter based on school type checkboxes
  for (const checkbox of typeCheckboxes) {
    if (checkbox.checked) {
      filteredSchools = filteredSchools.filter(function(school) {
        const type = checkbox.value;
        const hasType = school['School Level'].includes(type);
        return hasType;
      });
    }
  }
 
  return filteredSchools;
}

for (const cb of typeCheckboxes) {
  cb.addEventListener('change', () => {
    const filteredSchools = getFilteredSchools();
    showSchoolsOnMap(filteredSchools, schoolMap);
    showSchoolsInList(filteredSchools, schoolList);
  });
}

schoolNameInput.addEventListener('input', () => {
  const filteredSchools = getFilteredSchools();
  showSchoolsOnMap(filteredSchools, schoolMap);
  showSchoolsInList(filteredSchools, schoolList);
});


window.schools = schools;
window.schoolList = schoolList;
window.schoolMap = schoolMap;
window.typeCheckboxes = typeCheckboxes;