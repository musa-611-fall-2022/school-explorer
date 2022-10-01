//-----------------------------------------------//
// SETTING THINGS UP, IMPORT WHAT'S IMPORTED
//-----------------------------------------------//

// Import school data
import schools from '../data/schools.js';

// Import functions related to showing the school map
import {
    initializeSchoolMap,
    showSchoolsOnMap,
} from './school-map.js';

// Import useful functions from template-tools
import { htmlToElement } from "./template-tools.js";

// This is an array that starts from "Grade 1" to "Grade 12" and "Grade K"
// It is used to extract certain properties (whether has a certain grade) from schools.js when making a school feature
export const gradeArr = Object.keys(schools[0]).filter(key => {
    if((key.indexOf('Grade') === 0) && (key.length < 9)){
        return true
    } else {
        return false
    }
});

//-----------------------------------------------//
// INITIAL SHOWING OF MAP
//-----------------------------------------------//

// First initialize the base map
let schoolMap = initializeSchoolMap();

// Then add school content:
// This is only the initial showing of the school points
// After any selection, the showing of the schools is done from inside the eventListeners
showSchoolsOnMap(schools, schoolMap)

//-----------------------------------------------//
// MAKING A LIST OF CHECKBOXES OF ALL THE GRADES
//-----------------------------------------------//

// Add a set of checkboxes of different grades
for(const grade of gradeArr) {
    const html = `
    <p class="grade-checkbox-text"><label><input type="checkbox" class="grade-checkbox" value="${grade}">${grade}</label></p>
    `
    const gradeCheckbox = htmlToElement(html);
    document.querySelector("#grade-select-set").append(gradeCheckbox);
}

//-----------------------------------------------//
// CHANGE WHAT'S SHOWING ACCORDING TO EVENT LISTENER
//-----------------------------------------------//

// A function to filter stop everytime the text box gets input or when the checkboxes get checked
function getFilteredSchools() {
    let filteredSchools = schools;

    // First, filter based on grade selection
    for (const checkbox of gradeCheckboxes) {
        if (checkbox.checked) {
            filteredSchools = filteredSchools.filter(school => {
                const grade = checkbox.value;
                if (school[grade] == '0'){ return true} else {return false};
            });
        }
    }

    return filteredSchools;
}

// Get all the grade-related checkboxes
let gradeCheckboxes = document.querySelectorAll(".grade-checkbox");

// On each one of them, add an event listener
for(const checkbox of gradeCheckboxes){
    checkbox.addEventListener('change', ( ) => {
        const filteredSchools = getFilteredSchools();
        showSchoolsOnMap(filteredSchools, schoolMap);
    })
}

window.schools = schools
window.makeSchoolFeature = makeSchoolFeature
window.gradeArr = gradeArr;
