//import data
import schools from '../data/schools.js';
import { initializeSchoolsMap, showSchoolsOnMap } from './schools-map.js';

let gradesMap = {
    "9":["1010", "1020", "1030"],
    "10":["1010", "1020", "1030"],
    "11":["1010", "1020", "1030", "1040"],
}

let checkedArr = [];
let currentSearch;

let schoolsMap = initializeSchoolsMap();
showSchoolsOnMap(schools, schoolsMap);

let gradeCheckboxes = document.querySelectorAll( '.grade-checkbox');
let schoolNameInput = document.querySelector('#school-name-input');



for (const cb of gradeCheckboxes){
    cb.addEventListener('change', (evt)=> {
        const checkbox = evt.target;
        const grade = checkbox.value;
        const isChecked = checkbox.checked;
        if (isChecked){
            console.log(grade);
            checkedArr.push(grade);
            console.log('the boxes that are checked are:',checkedArr);
            /*
        const filteredSchools = schools.filter(function(school){
            const grades = school['routes_ids'];
            const hasGrades = grades.includes(grades);
            return hasGrades;
        });
        showSchoolsOnMap(filteredSchools, schoolsMap);*/
    } else {
        checkedArr = checkedArr.filter(g => g !== grade);
        console.log('the boxes that are checked are:',checkedArr);
    }
    updateMap();
    });
}


//event listener and then updates map
schoolNameInput.addEventListener('input', () => {
    currentSearch = schoolNameInput.value;
    console.log('the text box contains: ' +  currentSearch);
    updateMap();
});


//inside updateMap, apply checked grades filter and apply text filter
function updateMap (){
    const textFilter = schools.filter(function(school){
        if (!currentSearch){
            return true;
        }
        const name = school['name'].toLowerCase();
        const hasText = name.includes(currentSearch);
        return hasText;
    });
    console.log('text filter returns',textFilter.length,'results');
    

    let finalFilter = textFilter.filter(function(school){
        if (checkedArr.length == 0) {
            return true;
        } else if (
            school["Grade K"] == 1 && checkedArr.includes("0") || 
            school["Grade 1"] == 1 && checkedArr.includes("1") || 
            school["Grade 2"] == 1 && checkedArr.includes("2") || 
            school["Grade 3"] == 1 && checkedArr.includes("3") || 
            school["Grade 4"] == 1 && checkedArr.includes("4") || 
            school["Grade 5"] == 1 && checkedArr.includes("5") || 
            school["Grade 6"] == 1 && checkedArr.includes("6") || 
            school["Grade 7"] == 1 && checkedArr.includes("7") || 
            school["Grade 8"] == 1 && checkedArr.includes("8") || 
            school["Grade 9"] == 1 && checkedArr.includes("9") || 
            school["Grade 10"] == 1 && checkedArr.includes("10") || 
            school["Grade 11"] == 1 && checkedArr.includes("11") || 
            school["Grade 12"] == 1 && checkedArr.includes("12")
            ){
            return true;
        } 
    });
    //console.log(gradeFilter);
    //gradeFilter = gradeFilter.map(s => s["sdp_id"]);
    console.log('combo filter returns',finalFilter.length, 'results');
    /*getting school IDs of checked grades
    let gradeFilter = [];
    for (const grade of checkedArr){
        gradeFilter.push(...gradesMap[grade])
    }
    gradeFilter = [... new Set(gradeFilter)]*/

    //gettting intersection of text and checked grades
    /*const finalArray = textFilter.filter(school => {
        return gradeFilter.includes(school["sdp_id"]);
    });*/

    //console.log(finalArray);
    //for each checked grade, include schools that are in filtered schools
    showSchoolsOnMap(finalFilter, schoolsMap);
}

//make data ?global
window.schools = schools;
window.schoolsMap = schoolsMap;

