import schools from '../data/schools.js'
import { initializeSchoolMap, showSchoolsOnMap, showSchoolNames,} from './schools-map.js'
import { htmlToElement } from './template-tools.js'
import { listSchoolCheckBoxes, shouldShowSchool, getFilteredSchools } from './schools-list.js'

//Initial Variables
let schoolMap = initializeSchoolMap(); //Add map to page, reference with School Map
let schoolNameInput = document.querySelector('#school-name-filter'); //Add reference variable for the text input
const grades = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]; //For listSchoolCheckboxes function

//Initial functions
showSchoolsOnMap(schools, schoolMap); //Load school locations on map
showSchoolNames(schools, "console2"); //Load school names into console2 array
listSchoolCheckBoxes(grades, "checkboxList"); //Add checkboxes to page

//Adding reference variable for checkboxes after they are added to the document
let schoolCheckboxes = document.querySelectorAll('.school-checkbox');

//Add event listeners to school name text boxfilter
schoolNameInput.addEventListener('input', () => {
    const filteredSchools = getFilteredSchools();
    showSchoolNames(filteredSchools, "console2");
    showSchoolsOnMap(filteredSchools, schoolMap);
})

//Add event listeners to each checkbox grade filter
for (let cb of schoolCheckboxes) {
    cb.addEventListener('change', () => {
        const filteredSchools = getFilteredSchools();
        showSchoolNames(filteredSchools, "console2");
        showSchoolsOnMap(filteredSchools, schoolMap);
    })
};

//Clearing input on load
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("school-name-filter").value= "";
  });

//Global variables
window.schools = schools;
window.route;
window.schoolNameInput = schoolNameInput;
window.schoolCheckboxes = schoolCheckboxes;

