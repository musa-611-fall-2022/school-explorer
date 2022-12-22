import schools from '../data/schools.js'
import {initMap,makeSchoolFeature,showSchoolsOnMap} from '../js/map.js'

//Phila outline? do we need that?

const schoolMap = initMap();
const orange = "#ff7800"
showSchoolsOnMap(schools, schoolMap, orange);

const schoolCheckboxes = document.querySelectorAll('.school-checkbox');
const schoolNameFilter = document.querySelector('.school-name-filter');
const schoolList = document.getElementById('#school-list');

// these are all the unique school types ['High', 'Middle', 'Elementary-Middle', 'Elementary', 'Middle-High', 'Transition/Overage School', 'Elementary-Middle-High', 'Elementary-High']

function getFilteredSchools(){
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
        const filteredSchools = getFilteredSchools();
        const black = "#000000";
        showSchoolsOnMap(filteredSchools,schoolMap, black);
    });
}



schoolNameFilter.addEventListener('input',() =>{
    const filteredSchools = getFilteredSchools();
    const black = "#000000";
    showSchoolsOnMap(filteredSchools,schoolMap, black);
});



// Expose variables to the global scope
window.schools = schools; // was just being used to check the data properties
window.mapview = schoolMap;
// might add a window.phila = phila; for an outline map
window.makeSchoolFeature = makeSchoolFeature;

//checkbox.addEventListener('change', (evt) => {
//    if (evt.target.checked){ //evt.target is same as checkbox
//        console.log('you clicked on the checkbox ' + checkbox.value);
//        if (checkbox.value == "Transition/Overage School"){
//            const filteredSchools = schools.filter(
//                school => (school['School Level']!="High" && school['School Level']!="Middle" && school['School Level']!="Elementary")
//            );
//            const black = "#000000";
//            showSchoolsOnMap(filteredSchools,schoolMap, black);
//        } else {
//            const filteredSchools = schools.filter(
//                    school => (school['School Level']==checkbox.value) //this excludes all the transition schools except Transition/Overage
//            );
//            const black = "#000000";
//            showSchoolsOnMap(filteredSchools,schoolMap, black);
//        }
//        console.log(evt.target);
//    } else {
//        showSchoolsOnMap(schools,schoolMap, orange);
//        console.log('you unclicked the checkbox ' + checkbox.value)
//    })