//-----------------------------------------------//
// SETTING THINGS UP, IMPORT WHAT'S IMPORTED
//-----------------------------------------------//

// Import school data
import schools from '../data/schools.js';

// Import functions related to showing the school map
import { showSchoolsOnMap } from './school-map.js';

import { showSchoolsInList } from './school-list.js';

// Import useful functions from template-tools
import { htmlToElement } from "./template-tools.js";

// This is an array that starts from "Grade 1" to "Grade 12" and "Grade K"
// It is used to extract certain properties (whether has a certain grade) from schools.js when making a school feature
export const gradeArr = Object.keys(schools[0]).filter(key => {
    if((key.indexOf('Grade') === 0) && (key.length < 9)){
        return true;
    } else {
        return false;
    }
});

//-----------------------------------------------//
// INITIAL SHOWING OF MAP
//-----------------------------------------------//

// First initialize the base map
let schoolMap = document.querySelector("#school-map");
let baseMap = L.map(schoolMap).setView([39.95, -75.15], 11.5);
// For other map tile styles, see this website:https://leaflet-extras.github.io/leaflet-providers/preview/

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '© OpenStreetMap',
}).addTo(baseMap);

window.schoolMap = baseMap;

// Then add school content:
// This is only the initial showing of the school points
// After any selection, the showing of the schools is done from inside the eventListeners
showSchoolsOnMap(schools, baseMap);

//-----------------------------------------------//
// MAKING A LIST OF CHECKBOXES OF ALL THE GRADES
//-----------------------------------------------//

// Add a set of checkboxes of different grades
for(const grade of gradeArr) {
    const html = `
    <p class="grade-checkbox-text"><label><input type="checkbox" class="grade-checkbox" value="${grade}">${grade}</label></p>
    `;
    const gradeCheckbox = htmlToElement(html);
    document.querySelector("#grade-select-set").append(gradeCheckbox);
}

//-----------------------------------------------//
// MAKING A LIST OF SCHOOLS
//-----------------------------------------------//

let schoolList = document.querySelector('#school-list');
showSchoolsInList(schools, schoolList);

//-----------------------------------------------//
// CHANGE WHAT'S SHOWING ACCORDING TO EVENT LISTENER
//-----------------------------------------------//

// Get all the grade-related checkboxes
let schoolGradeFilters = document.querySelectorAll(".grade-checkbox");

// Get what's inputted in the Filter By Name input box
let schoolNameFilter = document.querySelector("#school-name-input");

// Filter schools by name
function filterByName(schoolsList) {
    let filteredSchools = schoolsList;
    const inputText = schoolNameFilter.value.toLowerCase();
    filteredSchools = filteredSchools.filter(school =>
       school["name"].toLowerCase().includes(inputText));
    return filteredSchools;
}

// Filter schools by grade
function filterByGrade(schoolsList) {
    let filteredSchools = schoolsList;
    for (const checkbox of schoolGradeFilters) {
        if (checkbox.checked) {
            filteredSchools = filteredSchools.filter(school =>
                school[checkbox.value] == '1',
            );
        }
    }
    return filteredSchools;
}


// On each one of them, add an event listener
for(const checkbox of schoolGradeFilters){
    checkbox.addEventListener('change', ( ) => {
        const filteredSchools = filterByGrade(filterByName(schools));
        showSchoolsOnMap(filteredSchools, baseMap);
        showSchoolsInList(filteredSchools, schoolList);
    });
}

// Add event listener to the input box
schoolNameFilter.addEventListener('input', ( ) => {
    const filteredSchools = filterByGrade(filterByName(schools));
    showSchoolsOnMap(filteredSchools, baseMap);
    showSchoolsInList(filteredSchools, schoolList);
});

window.schools = schools;
window.gradeArr = gradeArr;
window.schoolList = schoolList;
window.schoolNameFilter = schoolNameFilter;
window.schoolGradeFilters = schoolGradeFilters;
