//import data
import schools from '../data/schools.js';
import { initializeSchoolsMap, showSchoolsOnMap } from './schools-map.js';

let schoolsMap = initializeSchoolsMap();
/*showSchoolsOnMap(schools, schoolsMap);*/

//make data ?global
window.schools = schools;
window.schoolsMap = schoolsMap;

