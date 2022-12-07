import schools from '../data/schools.js'
import {initMap,makeSchoolFeature,showSchoolsOnMap} from '../js/map.js'

//Phila outline? do we need that?

const schoolMap = initMap();
showSchoolsOnMap(schools, schoolMap);

// Expose variables to the global scope
window.schools = schools; // was just being used to check the data properties
window.mapview = schoolMap;
// might add a window.phila = phila; for an outline map
window.makeSchoolFeature = makeSchoolFeature;