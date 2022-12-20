/*
 * @Author: miaomiao612 dddoctorr612@gmail.com
 * @Date: 2022-12-20 10:23:00
 * @LastEditors: miaomiao612 dddoctorr612@gmail.com
 * @LastEditTime: 2022-12-20 11:08:45
 * @FilePath: \school-explorer\site\js\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import schools from '../data/schools.js';
import { initializeSchoolMap, showSchoolsOnMap } from './schools-map.js';
import { showSchoolsInList } from './schools-list.js';

let schoolMap = initializeSchoolMap();
showSchoolsOnMap(schools, schoolMap);

let schoolList = document.querySelector('#school-list');

showSchoolsInList(schools, schoolList);

let schoolNameFilter = document.querySelector('#school-name-input');
let schoolGradeFilters = document.querySelectorAll('.Grade-checkbox');
function getFilteredSchools(){
    let filteredSchools = schools;

    //Filter through school name
    const text = schoolNameFilter.value;
    filteredSchools = schools.filter(function (school) {
        const name = school['name'].toLowerCase ();
        const hasText = name.includes(text);
        return hasText;
    });

    //Filter through grade
    for (const checkbox of schoolGradeFilters) {
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

for (const cb of schoolGradeFilters){
    cb.addEventListener('change', () => {
        const filteredSchools = getFilteredSchools();
        showSchoolsOnMap(filteredSchools, schoolMap);
        showSchoolsInList(filteredSchools, schoolList);
    });
}

schoolNameFilter.addEventListener('input', () => {
    const filteredSchools = getFilteredSchools();
    showSchoolsOnMap(filteredSchools, schoolMap);
    showSchoolsInList(filteredSchools, schoolList);
    window.schools = filteredSchools;
});

window.schoolMap = schoolMap;
window.schoolGradeFilters = schoolGradeFilters;
window.schoolNameFilter = schoolNameFilter;
window.schoolList = schoolList;

