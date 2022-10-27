import schools from '../data/schools.js';
import { initializeSchoolMap, showSchoolOnMap } from './schools-map.js';
import { showSchoolsInList } from './school-list.js';


let schoolMap = initializeSchoolMap();
showSchoolOnMap(schools, schoolMap);

let schoolList = document.querySelector('#school-list');
showSchoolsInList(schools, schoolList);


let gradecheckboxes = document.querySelectorAll('.Grade-Checkbox');
let schoolNameInput = document.querySelector('#school-name-input')

function getFilteredSchools() {
    let filteredSchools = schools;

    const text = schoolNameInput.value;
    filteredSchools = schools.filter(function (school) {
        const name = school['sort_name'].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });

    for(const checkbox of gradecheckboxes) {
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

for (const cb of gradecheckboxes) {
    cb.addEventListener('change', () => {
        const filteredSchools = getFilteredSchools();
        showSchoolOnMap(filteredSchools, schoolMap);
    });
}


schoolNameInput.addEventListener('input', () => {

    const filteredSchools = getFilteredSchools();
    showSchoolOnMap(filteredSchools, schoolMap);
})




// Expose variables to global scope
window.schools = schools;
window.schoolMap = schoolMap;
//window.schoolLayers = schoolLayers;
window.gradecheckboxes = gradecheckboxes;
window.schoolNameInput = schoolNameInput;
window.schoolList = schoolList;