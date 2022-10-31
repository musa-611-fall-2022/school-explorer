import schools from '../data/schools.js';

import { initSchoolMap, showSchoolsOnMap } from './mapfunctions.js';
import { showSchoolsInList } from './schoolList.js';

import { gradefun } from './schoollevels.js';

let schoolMap = initSchoolMap();
showSchoolsOnMap(schools, schoolMap);

schools.map(gradefun);

let schoolList = document.querySelector('#school-list');
showSchoolsInList(schools, schoolList);




// Expose variable to the global scope

//grab selectors
let schoolGradeFilters = document.querySelectorAll('.grade-checkbox');
let schoolNameFilter = document.querySelector('#school-name-filter');
let admitCheckboxes = document.querySelectorAll('.admit-type-cb');

function selectOnlyThis(id) {
    if (document.getElementById(id).checked == true){
        for (let i = 1; i <= 5; i++)
      {
          document.getElementById(i).checked = false;
      }
      document.getElementById(id).checked = true;
    }

    if (document.getElementById(id).checked == false) {
        for (let i = 1; i <= 5; i++)
      {
          document.getElementById(i).checked = false;
      }
    }
}


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
  for (const checkbox of schoolGradeFilters) {
    if (checkbox.checked) {
      filteredSchools = filteredSchools.filter(function (school) {
        const grade = checkbox.value;
        const hasGrade = school[`Grade ${grade}`] === "1";
        return hasGrade;
      });
    }
  }

  for (const checkbox of admitCheckboxes) {
    if (checkbox.checked) {
      filteredSchools = filteredSchools.filter(function (school) {
        const admitType = checkbox.value;
        const isAdmitType = school[`Admission Type`] === admitType;
        return isAdmitType;
      });
    }
  }

  return filteredSchools;
}



for (const cb of schoolGradeFilters) {
  cb.addEventListener('change', () => {
    const filteredSchools = shouldShowSchool();
    showSchoolsOnMap(filteredSchools, schoolMap);
    schoolList.innerHTML = '';
    showSchoolsInList(filteredSchools, schoolList);
  });
}



for (const cb of admitCheckboxes) {
    cb.addEventListener('change', () => {
      const filteredSchools = shouldShowSchool();
      showSchoolsOnMap(filteredSchools, schoolMap);
      schoolList.innerHTML = '';
      showSchoolsInList(filteredSchools, schoolList);
    });
  }


schoolNameFilter.addEventListener('input', () => {
    const filteredSchools = shouldShowSchool();
    showSchoolsOnMap(filteredSchools, schoolMap);
    schoolList.innerHTML = '';
    showSchoolsInList(filteredSchools, schoolList);
});





window.schoolMap = schoolMap;
window.schools = schools;
window.schoolGradeFilters = schoolGradeFilters;
window.schoolNameFilter = schoolNameFilter;
window.schoolList = schoolList;
window.selectOnlyThis = selectOnlyThis;
