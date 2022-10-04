import schools from '../data/schools.js';
import { initializeSchoolMap, showSchoolsOnMap} from './schools-map.js';
import { listSchoolCheckBoxes, getFilteredSchools, listSchools} from './schools-list.js';

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

//Add event listeners to school name text boxfilter
schoolNameFilter.addEventListener('input', () => {
    const filteredSchools = getFilteredSchools();
    listSchools(filteredSchools, "school-list");
    showSchoolsOnMap(filteredSchools, schoolMap);
    schoolList = document.getElementById('school-list');
})

//Add event listeners to each checkbox grade filter
for (let cb of schoolGradeFilters) {
    cb.addEventListener('change', () => {
        const filteredSchools = getFilteredSchools();
        listSchools(filteredSchools, "school-list");
        showSchoolsOnMap(filteredSchools, schoolMap);
        schoolList = document.getElementById('school-list');
    })
}

//Clearing input on load
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("school-name-filter").value= "";
  });

//Global variables
window.schools = schools;
window.schoolNameFilter = schoolNameFilter;
window.schoolGradeFilters = schoolGradeFilters;
window.schoolList = schoolList;
