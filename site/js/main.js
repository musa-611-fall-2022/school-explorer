//import data
import schools from '../data/schools.js';
import { initializeSchoolsMap, showSchoolsOnMap } from './schools-map.js';


let checkedArr = [];
let schoolNameFilter;

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
            console.log('the boxes that are checked are:', checkedArr);
            window.schoolGradeFilters = checkedArr;
            /*
        const filteredSchools = schools.filter(function(school){
            const grades = school['routes_ids'];
            const hasGrades = grades.includes(grades);
            return hasGrades;
        });
        showSchoolsOnMap(filteredSchools, schoolsMap);*/
    } else {
        checkedArr = checkedArr.filter(g => g !== grade);
        console.log('the boxes that are checked are:', checkedArr);
    }
    updateMap();
    });
}   


//event listener and then updates map
schoolNameInput.addEventListener('input', () => {
    schoolNameFilter = schoolNameInput.value;
    console.log('the text box contains: ' +  schoolNameFilter);
    updateMap();
});

function makeSchoolList(array) {
    const list = document.getElementById('school-list')
    window.schoolList = list;
    list.innerHTML = "";

     for(var i = 0; i < array.length; i++) {
         // Create the list item:
         const school = array[i];

         var item = document.createElement('li');
 
         // Set its contents:
         item.appendChild(document.createTextNode(school["name"]));
         item.appendChild(document.createElement("br"));
         item.appendChild(document.createTextNode("Grade Span Served: " + school["Current Grade Span Served"]));
         // Add it to the list:
         list.appendChild(item);
     }
}


//inside updateMap, apply checked grades filter and apply text filter
function updateMap (){
    const textFilter = schools.filter(function(school){
        if (!schoolNameFilter){
            return true;
        }
        const name = school['name'].toLowerCase();
        const hasText = name.includes(schoolNameFilter);
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

    console.log('combo filter returns',finalFilter.length, 'results');
    //for each checked grade, include schools that are in filtered schools
    showSchoolsOnMap(finalFilter, schoolsMap);
    makeSchoolList (finalFilter);
}


window.schoolNameFilter = schoolNameFilter;
window.schoolGradeFilters = checkedArr;
window.schools = schools;
window.schoolMap = schoolsMap;


