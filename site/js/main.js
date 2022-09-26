// import schools data
import schools from '../data/schools.js';
// import map module
import { initializeSchoolMap, showSchoolsOnMap } from "./school-map.js";

// expose school object to the global scope
window.schools = schools;

let schoolMap = initializeSchoolMap();
showSchoolsOnMap(schools, schoolMap);