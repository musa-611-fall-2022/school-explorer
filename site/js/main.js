import schools from "../data/schools.js";
import { showSchoolsOnMap } from './school-map.js';
import { showSchoolsInList } from './school-list.js';

let schoolMap = L.map('school-map').setView([40.0055537, -75.120751], 11.5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
}).addTo(schoolMap);

showSchoolsOnMap(schools, schoolMap);

let schoolList = document.querySelector('#school-list');
showSchoolsInList(schools, schoolList);

let schoolGradeFilters = document.querySelectorAll(".grade-checkbox");

let schoolNameFilter = document.querySelector("#school-name-input");

function shouldShowSchools (){
    let filteredSchools = schools;

    // Filter schools by name

    const text = schoolNameFilter.value;
    filteredSchools = filteredSchools.filter(function (school) {
        const name = school['name'];
          const hasText = name.includes(text);
          return hasText;
    });

    // Filter schools by grade

    for (const checkbox of schoolGradeFilters) {
        if (checkbox.checked) {
            filteredSchools = filteredSchools.filter(function (school) {
                if (school[checkbox.value] == '1') {
                    return true;
                } else {
                    return false;
                }
            });
        }

      }

    return filteredSchools;

}

for (const cb of schoolGradeFilters) {
  cb.addEventListener('change', () => {
      const filteredSchools = shouldShowSchools();
      showSchoolsOnMap(filteredSchools, schoolMap);
      showSchoolsInList(filteredSchools, schoolList);
  });
}

schoolNameFilter.addEventListener('input', () => {
  const filteredSchools = shouldShowSchools();
  showSchoolsOnMap(filteredSchools, schoolMap);
  showSchoolsInList(filteredSchools, schoolList);
});


window.schools = schools;
window.schoolList = schoolList;
window.shouldShowSchools = shouldShowSchools;

