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
    let text = schoolNameInput.value.toLowerCase();
    let show = true;
    for (const checkbox of schoolCheckboxes) {
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

function listSchools(schoolsToShow, schoolList){
    schoolList.innerHTML = '';
    for (let school of schoolsToShow) {
        const html = `<li class="school-list-item">${school['name']}</li>`;
        const li = htmlToElement(html);
        schoolList.append(li);
    }
}

export {
    listSchoolCheckBoxes,
    listSchools,
    shouldShowSchool,
    getFilteredSchools,

};