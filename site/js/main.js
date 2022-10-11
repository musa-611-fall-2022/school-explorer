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

//grab selectors
let gradeCheckboxes = document.querySelectorAll('.grade-checkbox');
let schoolNameFilter = document.querySelector('#school-name-filter');
let admitCheckboxes = document.querySelectorAll('.admit-type-cb');

function selectOnlyThis(id) {
    for (var i = 1;i <= 5; i++)
    {
        document.getElementById(i).checked = false;
    }
    document.getElementById(id).checked = true;
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
  for (const checkbox of gradeCheckboxes) {
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



for (const cb of gradeCheckboxes) {
  cb.addEventListener('change', () => {
    const filteredSchools = shouldShowSchool();
    showSchoolsOnMap(filteredSchools, schoolMap);
    schoollist.innerHTML = '';
    showSchoolsInList(filteredSchools, schoollist);
  });
}

for (const cb of gradeCheckboxes) {
    cb.addEventListener('change', () => {
      const filteredSchools = shouldShowSchool();
      showSchoolsOnMap(filteredSchools, schoolMap);
      schoollist.innerHTML = '';
      showSchoolsInList(filteredSchools, schoollist);
    });
  }

for (const cb of admitCheckboxes) {
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
window.selectOnlyThis = selectOnlyThis;