import schools from '../data/schools.js';
import { initializeSchoolMap, showSchoolsOnMap } from './schools-map.js';
import { listSchools } from './schools-list.js';
import { htmlToElement } from './template-tools.js';


//Initial Variables
let schoolMap = initializeSchoolMap(); //Add map to page, reference with School Map
let schoolNameFilter = document.querySelector('#school-name-filter'); //Add reference variable for the text input
const grades = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]; //For listSchoolCheckboxes function

//Initial functions
showSchoolsOnMap(schools, schoolMap); //Load school locations on map
listSchools(schools, "school-list"); //Load school names into console2 array
listSchoolCheckBoxes(grades, "checkboxList"); //Add checkboxes to page

//Adding reference variable for checkboxes and school list after they are added to the document
let schoolGradeFilters = document.querySelectorAll('.school-checkbox');
let schoolList = document.querySelectorAll('.school-list-item');

//Add event listeners to each checkbox grade filter
for (let cb of schoolGradeFilters) {
    cb.addEventListener('change', () => {
        const filteredSchools = getFilteredSchools();
        listSchools(filteredSchools, "school-list");
        showSchoolsOnMap(filteredSchools, schoolMap);
        schoolList = document.getElementById('school-list');
    });
}

//Add event listeners to school name text boxfilter
schoolNameFilter.addEventListener('input', () => {
    const filteredSchools = getFilteredSchools();
    listSchools(filteredSchools, "school-list");
    showSchoolsOnMap(filteredSchools, schoolMap);
    schoolList = document.getElementById('school-list');
});

//Clearing input on load
document.addEventListener("DOMContentLoadeds", function() {
    document.getElementById("school-name-filter").value= "";
  });

function listSchoolCheckBoxes(schoolsToList, locationID) {
    const list = document.getElementById(locationID);
    for (let names of schoolsToList) {
        const html = `<label class="checkbox-label"><input type="checkbox" class="school-checkbox" value = "${names}">${names}</label>`;
        const li = htmlToElement(html);
        list.append(li);
    }
}

function shouldShowSchool(name) {
    let text = schoolNameFilter.value.toLowerCase();
    let show = true;
    for (const checkbox of schoolGradeFilters) {
        if (checkbox.checked) {
            const grades = name[`Grade ${checkbox.value}`];
            if (grades != 1) {
                show = false;
            }
        }
    }
    if (!name['name'].toLowerCase().includes(text)) {
        show = false;
    }
    return show;
}

function getFilteredSchools() {
    let filteredSchools = schools;
    filteredSchools = schools.filter(x => shouldShowSchool(x));
    return filteredSchools;
}

//Global variables
window.schools = schools;
window.schoolNameFilter = schoolNameFilter;
window.schoolGradeFilters = schoolGradeFilters;
window.schoolList = schoolList;
