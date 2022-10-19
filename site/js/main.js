/*
 * @Author: miaomiao612 dddoctorr612@gmail.com
 * @Date: 2022-10-15 22:51:33
 * @LastEditors: miaomiao612 dddoctorr612@gmail.com
 * @LastEditTime: 2022-10-20 00:03:07
 * @FilePath: \school-explorer\site\js\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import schools from '../data/schools.js';
import { basemap,showSchoolsOnMap } from './schools-map.js';
import { ShowShoolsList } from './schools-list.js';

let schoolMap = basemap();
showSchoolsOnMap(schools, schoolMap);


let schoolList = document.querySelector("#school-list");
ShowShoolsList(schools, schoolList)


//Add a checkbox for each grade K-12 to the page.
//Add a text box to filter schools that contain a given string. The text box should have an id of `school-name-filter`.
let schoolGradeFilters = document.querySelectorAll('.Grade-checkbox');
let schoolNameFilter = document.querySelector('#school-name-input');

function FilterSchools(){
    let filteredSchools = schools;

     //Filter by name
    const text = schoolNameFilter.value;
    filteredSchools = schools.filter(function (school) {
    const name = school['name'].toLowerCase ();
    const hasText = name.includes(text);
    return hasText;
    });

    //Filter by grade
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

for (const checkbox of schoolGradeFilters){
    checkbox.addEventListener('change', () => {
    const filteredSchools = FilterSchools();
    showSchoolsOnMap(filteredSchools, schoolMap);
    ShowShoolsList(filteredSchools, schoolList);
    });
}

schoolNameFilter.addEventListener('input', () => {
    const filteredSchools = FilterSchools();
    showSchoolsOnMap(filteredSchools, schoolMap);
    ShowShoolsList(filteredSchools, schoolList);
});


window.schools = schools;
window.schoolMap = schoolMap;
window.schoolGradeFilters = schoolGradeFilters;
window.schoolNameFilter = schoolNameFilter;
window.schoolList = schoolList;
