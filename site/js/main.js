import schools from '../data/schools.js';

import { initSchoolMap, showSchoolsOnMap } from './mapfunctions.js';

let schoolMap = initSchoolMap();
showSchoolsOnMap(schools, schoolMap);

// Expose variable to the global scope








window.schoolMap = schoolMap;
window.schools = schools;
