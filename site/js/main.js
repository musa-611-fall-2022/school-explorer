import schools from '../data/schools.js';
import { initializeSchoolMap, showSchoolOnMap } from './schools-map.js';
import { showSchoolsInList } from './school-list.js';


let schoolMap = initializeSchoolMap();
showSchoolOnMap(schools, schoolMap);

let schoolList = document.querySelector('#school-list');
showSchoolsInList(schools, schoolList);


let schoolGradeFilters = document.querySelectorAll('.Grade-Checkbox');
let schoolNameFilter = document.querySelector('#school-name-input');


function getFilteredSchools() {
    let filteredSchools = schools;
    const text = schoolNameFilter.value;
    filteredSchools = schools.filter(function (school) {
        const name = school['sort_name'].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });

    for(const checkbox of schoolGradeFilters) {
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

for (const cb of schoolGradeFilters) {
    cb.addEventListener('change', () => {
        const filteredSchools = getFilteredSchools();
        showSchoolOnMap(filteredSchools, schoolMap);
    });
}


schoolNameFilter.addEventListener('input', () => {
    const filteredSchools = getFilteredSchools();
    showSchoolOnMap(filteredSchools, schoolMap);
    showSchoolsInList(filteredSchools, schoolList);
})




// Expose variables to global scope
window.schools = schools;
window.schoolMap = schoolMap;
//window.schoolLayers = schoolLayers;
window.schoolGradeFilters = schoolGradeFilters;
window.schoolNameFilter = schoolNameFilter;
window.schoolList = schoolList;