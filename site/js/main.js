

//1) data 추출하기 : map, filter, reduce
//2) map : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
//3) function 만들고 map 하기

//1) ../ go one folder up
//2) import <name> from <address> : name 은 아무거나 상관없음


import schools from '../data/schools.js';
import { initializeSchoolMap, showSchoolsOnMap } from './schoolsToMap.js';
import { showSchoolsInList } from './schoolList.js';


let schoolMap = initializeSchoolMap();
showSchoolsOnMap(schools, schoolMap);


//1) 체크박스 쿼리하기 (All > 여러 체크박스가 있기 때문에, text box는 하나만 있어서 단수로 씀.)
//2) 검색기 'change' 는 엔터 눌르면 작동
//3) 검색기 'input' 은 한글자씩 추가됨

let schoolGradeFilters = document.querySelectorAll('.grade-checkbox');
let schoolNameFilter = document.querySelector('#school-name-input');

let schoolList = document.querySelector('#school-list');
showSchoolsInList(schools, schoolList);


function getfilteredSchools() {

    let filteredSchools = schools;

    // school search box
    const text = schoolNameFilter.value;
    filteredSchools = filteredSchools.filter(function (school) {
        const name = school["name"].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });

    // school check box
    for (const checkbox of schoolGradeFilters){
        if (checkbox.checked){
            filteredSchools = filteredSchools.filter(function (school){
                    if (school[checkbox.value] === "1") {
                        return true;
                    } else {
                        return false;
                    }
                });
            }

        }

    return filteredSchools;
}

//브라우저에서 클릭하면, getfilteredschool 함수로 들어감

for (const cb of schoolGradeFilters) {
    cb.addEventListener('change', () =>{
    const filteredSchools = getfilteredSchools();
    showSchoolsOnMap(filteredSchools, schoolMap);
    showSchoolsInList(filteredSchools, schoolList);
});}

schoolNameFilter.addEventListener('input', () =>{
    const filteredSchools = getfilteredSchools();
    showSchoolsOnMap(filteredSchools, schoolMap);
    showSchoolsInList(filteredSchools, schoolList);
});



//1) windnow : expose variables to the global scope (export to outside this main.js module)

window.schools = schools;
window.schoolList = schoolList;
window.schoolMap = schoolMap;
window.schoolNameFilter = schoolNameFilter;
window.schoolGradeFilters = schoolGradeFilters;