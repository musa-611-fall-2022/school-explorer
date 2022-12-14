import schools from '../data/schools.js'
import {initMap,makeSchoolFeature,showSchoolsOnMap} from '../js/map.js'

//Phila outline? do we need that?

const schoolMap = initMap();
const orange = "#ff7800"
showSchoolsOnMap(schools, schoolMap, orange);

const schoolCheckboxes = document.querySelectorAll('.school-checkbox');

// these are all the unique school types ['High', 'Middle', 'Elementary-Middle', 'Elementary', 'Middle-High', 'Transition/Overage School', 'Elementary-Middle-High', 'Elementary-High']

for (const checkbox of schoolCheckboxes){
    checkbox.addEventListener('change', (evt) => {
        if (evt.target.checked){
            console.log('you clicked on the checkbox ' + checkbox.value);
            const filteredSchools = schools.filter(
                    school => (school['School Level']==checkbox.value) //this excludes all the transition schools except Transition/Overage
            );
            const black = "#000000";
            showSchoolsOnMap(filteredSchools,schoolMap, black);
            console.log(evt.target);
        } else {
            console.log('you unclicked the checkbox ' + checkbox.value)
        }
        
    })
};

// Expose variables to the global scope
window.schools = schools; // was just being used to check the data properties
window.mapview = schoolMap;
// might add a window.phila = phila; for an outline map
window.makeSchoolFeature = makeSchoolFeature;