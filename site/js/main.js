import schools from '../data/schools.js'
import {initMap,makeSchoolFeature,showSchoolsOnMap} from '../js/map.js'
import { showSchoolsInList } from './school-list.js';

//Phila outline? do we need that?

const schoolMap = initMap();
const orange = "#ff7800"
showSchoolsOnMap(schools, schoolMap, orange);

const schoolCheckboxes = document.querySelectorAll('.school-checkbox');
const schoolNameFilter = document.querySelector('.school-name-filter');
const schoolList = document.querySelector('#school-list');

// these are all the unique school types ['High', 'Middle', 'Elementary-Middle', 'Elementary', 'Middle-High', 'Transition/Overage School', 'Elementary-Middle-High', 'Elementary-High']

function shouldShowSchool(){
    let filteredSchools = schools;
    //filter based on school name
    const text = schoolNameFilter.value;
    filteredSchools = filteredSchools.filter(function (school){
        const name = school['name'].toLowerCase();
        const hasText = name.includes(text);
        return hasText; //this is the true/false filter
    });
    //filter based on school type checkboxes   
    for (const checkbox of schoolCheckboxes){
        if (checkbox.checked){
            if (checkbox.value == "Transition/Overage School"){
                filteredSchools = filteredSchools.filter(
                    school => (school['School Level']!="High" && school['School Level']!="Middle" && school['School Level']!="Elementary"));
            } else {
                filteredSchools = filteredSchools.filter(
                    school => (school['School Level']==checkbox.value)); //this excludes all the transition schools except Transition/Overage
            }
        }
    }
    return filteredSchools;  
};


for (const checkbox of schoolCheckboxes){
    checkbox.addEventListener('change', (evt) => {
        const filteredSchools = shouldShowSchool();
        const black = "#000000";
        showSchoolsOnMap(filteredSchools,schoolMap, black);
        showSchoolsInList(filteredSchools,schoolList);
    });
}



schoolNameFilter.addEventListener('input',() =>{
    const filteredSchools = shouldShowSchool();
    const black = "#000000";
    showSchoolsOnMap(filteredSchools,schoolMap, black);
    showSchoolsInList(filteredSchools,schoolList);
});



// Expose variables to the global scope
window.schools = schools;
window.schoolMap = schoolMap;
// might add a window.phila = phila; for an outline map
window.makeSchoolFeature = makeSchoolFeature;
window.schoolNameFilter = schoolNameFilter;
window.schoolGradeFilters = schoolCheckboxes;
