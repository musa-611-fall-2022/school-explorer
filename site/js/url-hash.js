import { schoolsShownOnMap } from "./main.js";
import schools from "../data/schools.js";
import {
  showCatchments,
  highlightSchoolsOnMap,
  showSchoolsCompare,
} from "./school-compare.js";

//-----------------------------------------------//
// FUNCTION TO SAVE CURRENT STATE INTO AN URL
//-----------------------------------------------//

// This function takes schoolsToCompare, which is an arr of names of highlighted schools
function saveStateToUrl(schoolsToCompare) {

  // Turn the arr of school names into school id's:
  // First, get the full info of the highlighted schools
  const schoolsToHighlight = schoolsShownOnMap.filter(school =>
    schoolsToCompare.includes(school["name"]));

  // Get the ids of these schools to highlight
  const highlightIds = [];
  for(let school of schoolsToHighlight) {
    highlightIds.push(school["sdp_id"]);
  }

  const highlightIdArr = highlightIds.join(",");

  // Generate an URL
  window.location.hash = highlightIdArr;
  console.log(window.location.toString());
}

//-----------------------------------------------//
// FUNCTION TO LOAD THE CURRENT STATE
//-----------------------------------------------//

// This function takes in a hash url and shows only the selected schools
function loadState() {

  // Get current hash
  let urlHash = window.location.hash.substring(1, window.location.hash.length);
  if(urlHash !== undefined && urlHash !== "") {
    // Get array of ID's we're interested in
    let idArr = urlHash.split(",");
    // Get array of schools objects
    let schoolsSelected = schools.filter(school => idArr.includes(school["sdp_id"]));
    // Get array of school names
    let schoolsSelectedNameArr = [];
    for(let school of schoolsSelected) {
      schoolsSelectedNameArr.push(school["name"]);
    }

    // Step 1: Show catchment area
    showCatchments(schoolsSelectedNameArr);
    // Step 2: Highlight selected schools on the map
    highlightSchoolsOnMap(schoolsSelectedNameArr);
    // Step 3: Show compare
    showSchoolsCompare(schoolsSelectedNameArr);

  }
}

//-----------------------------------------------//
// FUNCTION TO COPY NEWLY CREATED URL
//-----------------------------------------------//

window.onload = loadState;

export { saveStateToUrl };