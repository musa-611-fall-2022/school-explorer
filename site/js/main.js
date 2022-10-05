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


// Filter schools by name

function filterByName(schoolsList) {
      let filteredSchools = schoolsList;
      const text = schoolNameFilter.value;
      filteredSchools = filteredSchools.filter(function shouldShowSchool(school) {
          const name = school['name'];
          console.log(name)
          const hasText = name.includes(text);
          console.log(hasText)
          return hasText;
      });
      console.log(filteredSchools)
      return filteredSchools;
}

// Filter schools by grade

function filterByGrade(schoolsList) {
      let filteredSchools = schoolsList;
      for (const checkbox of schoolGradeFilters) {
            if (checkbox.checked) {
                  filteredSchools = filteredSchools.filter(function shouldShowSchool(school) {
                        let gradeName = "Grade " + checkbox.value.toString();
                        console.log(school[gradeName])
                        if (school[gradeName] == '1') {
                              return true;
                        }
                  });

                  console.log(checkbox.value)
                  console.log(filteredSchools)
            }

      }
      return filteredSchools;
}

for (const cb of schoolGradeFilters) {
  cb.addEventListener('change', () => {
      const filteredSchools = filterByGrade(filterByName(schools));
      showSchoolsOnMap(filteredSchools, schoolMap);
      showSchoolsInList(filteredSchools, schoolList);
  });
}

schoolNameFilter.addEventListener('input', () => {
  const filteredSchools = filterByGrade(filterByName(schools));
  showSchoolsOnMap(filteredSchools, schoolMap);
  showSchoolsInList(filteredSchools, schoolList);
});


window.schools = schools;
window.schoolList = schoolList;
window.schoolNameFilter = schoolNameFilter;
window.schoolGradeFilters = schoolGradeFilters;
