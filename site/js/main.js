import schools from '../data/schools.js';
import {initializeSchoolMap, showSchoolsOnMap} from './school-map.js';
import { showSchoolsInList} from './schools-list.js';

let schoolMap = initializeSchoolMap();
showSchoolsOnMap(schools, schoolMap);

let schoolList = document.querySelector('#school-list');
showSchoolsInList(schools, schoolList);
let typeCheckboxes = document.querySelectorAll('.school-checkbox');
let schoolNameInput = document.querySelector('#school-name-input')

function getFilteredSchools() {
  const text = schoolNameInput.value;
  let filteredSchools = schools.filter(function(school){
    const name = school['school_name'].toLowerCase();
    const hasText = name.includes(text);
    return hasText;
  });

  for (const checkbox of typeCheckboxes) {
    if (checkbox.checked){
      filteredSchools = filteredSchools.filter(function(school){
        const type = checkbox.value;
        const hasType = type['school_type'].includes(school);
        return hasType;
      });
    }
  }
  return filteredSchools;
}

for (const cb of typeCheckboxes) {
  cb.addEventListener('change', (evt) => {
    const checkbox = evt.target;
    const t = checkbox.value;
    const isChecked = checkbox.checked;
    if (isChecked){
      const filteredSchools = schools.filter(function(school){
        const types = school['school_type'];
        const hasType = types.includes(t);
        return hasType;
      });
      showSchoolsOnMap(filteredSchools, schoolMap);
      showSchoolsInList(filteredSchools, schoolMap);
    } else {
      showSchoolsOnMap(schools, schoolMap);
    }
    console.log('you clicked on a checkbox');
    console.log(evt.target);
  });
}

schoolNameInput.addEventListener('input', () => {
  const filteredSchools = getFilteredSchools();
  showSchoolsOnMap(filteredSchools, schoolMap);
});


window.schools = schools;
window.schoolMap=schoolMap;
window.typeCheckboxes = typeCheckboxes;