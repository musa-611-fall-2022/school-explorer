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
    

    function hasAllGrades (s){
        return checkedArr.every(g => {
            if (g == "0" && s["Grade K"] == 1 ||
                g == "1" && s["Grade 1"] == 1 ||
                g == "2" && s["Grade 2"] == 1 ||
                g == "3" && s["Grade 3"] == 1 ||
                g == "4" && s["Grade 4"] == 1 ||
                g == "5" && s["Grade 5"] == 1 ||
                g == "6" && s["Grade 6"] == 1 ||
                g == "7" && s["Grade 7"] == 1 ||
                g == "8" && s["Grade 8"] == 1 ||
                g == "9" && s["Grade 9"] == 1 ||
                g == "10" && s["Grade 10"] == 1 ||
                g == "11" && s["Grade 11"] == 1 ||
                g == "12" && s["Grade 12"] == 1){
                return true;
                }
            else {
                return false;
            }
        })
    }

    let finalFilter = textFilter.filter(function(school){
        if (checkedArr.length == 0) {
            return true;
        }
        return hasAllGrades(school);
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

