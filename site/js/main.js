
/*
1) data 추출하기 : map, filter, reduce
2) map : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
3) function 만들고 map 하기 
*/


/*
1) ../ go one folder up 
2) import <name> from <address> : name 은 아무거나 상관없음
*/

import schools from '../data/schools.js';
import {initializeSchoolMap, showSchoolsOnMap} from './schoolsToMap.js';

let schoolMap = initializeSchoolMap();
showSchoolsOnMap(schools, schoolMap);


/*
1) 체크박스 쿼리하기 (All > 여러 체크박스가 있기 때문에, text box는 하나만 있어서 단수로 씀.)
2) 검색기 'change' 는 엔터 눌르면 작동
3) 검색기 'input' 은 한글자씩 추가됨
*/

let gradeCheckboxes = document.querySelectorAll('.grade-checkbox');
let schoolNameInput = document.querySelector('#school-name-input');

for (const cb of gradeCheckboxes) {
    cb.addEventListener('change', (evt) => {
        console.log('you clikced on a checkbox');
        console.log(evt.target);
    });
}


schoolNameInput.addEventListener('input', () =>{
    const text = schoolNameInput.value.toLowerCase();
    const filteredSchools = schools.filter(function (school) {
        const name = school["name"].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
    });
    showSchoolsOnMap(filteredSchools, schoolMap);
})

/*
1) windnow : expose variables to the global scope (export to outside this main.js module)
*/
window.schools = schools;
window.schoolMap = schoolMap;
window.gradeCheckboxes = gradeCheckboxes;