import schools from '../data/schools.js'
import {initMap,makeSchoolFeature} from '../js/map.js'

//Phila outline? do we need that?

const schoolMap = initMap();

// Expose variables to the global scope
window.schools = schools;
window.mapview = schoolMap;
// might add a window.phila = phila; for an outline map
window.makeSchoolFeature = makeSchoolFeature;