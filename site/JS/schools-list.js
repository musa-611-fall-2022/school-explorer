import { htmlToElement } from './template-tools.js'

/*function listSchoolCheckBoxes(schoolsToShow, checkboxList){
    element = document.getElementById
    element.innerHTML = '';
    for (let school of schoolsToShow) {
        const html = `<label><input type="checkbox" class="school-checkbox" value = ${school['name']}>${school['name']}</label>`;
        const li = htmlToElement(html);
        checkboxList.append(li);
    }
}*/

function listSchoolCheckBoxes(schoolsToList, locationID) {
    const list = document.getElementById(locationID);
    for (let names of schoolsToList) {
        const html = `<label class="checkbox-label"><input type="checkbox" class="school-checkbox" value = "${names}">${names}</label>`;
        const li = htmlToElement(html);
        list.append(li);
    }
}

function shouldShowSchool(name) {
    let text = schoolNameFilter.value.toLowerCase();
    let show = true;
    for (const checkbox of schoolGradeFilters) {
        if (checkbox.checked) {
            const grades = name[`Grade ${checkbox.value}`];
            if (grades != 1) {
                show = false;
            }
        }
     }
    if (!name['name'].toLowerCase().includes(text)) {  
        show = false;
    } 
    return show;
} 

function getFilteredSchools() {
    let filteredSchools = schools;
    filteredSchools = schools.filter(x => shouldShowSchool(x));
    return filteredSchools;
}

function listSchools(schoolsToShow, whereToList){
    const list = document.getElementById(whereToList);
    list.innerHTML = '';
    for (let school of schoolsToShow) {
        const html = `<li class="school-list-item">${school['name']} <ul class="school-list-detail"><li class="grade">Grades Served: ${school["Current Grade Span Served"]}</li></ul></li>`;
        const li = htmlToElement(html);        
        list.append(li);
    }
}


export {
    listSchoolCheckBoxes,
    listSchools,
    shouldShowSchool,
    getFilteredSchools,

};