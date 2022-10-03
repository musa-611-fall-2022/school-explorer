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
        const html = `<label class="checkbox-label"><br><input type="checkbox" class="school-checkbox" value = "${names['name']}">${names['name']}</label>`;
        const li = htmlToElement(html);
        list.append(li);
    }
}

function shouldShowSchool(name) {
    let text = schoolNameInput.value.toLowerCase();
    let show = false;
    if (name.toLowerCase().includes(text)) {  
        show = true;
    } else {
        for (const checkbox of schoolCheckboxes) {
            if (checkbox.checked) {
                const thisName = checkbox.value.toLowerCase();
                if (name.toLowerCase().includes(thisName)) {
                    show = true;
                }
            }
         } 
    };
    return show;
} 

function getFilteredSchools() {
    let filteredSchools = schools;
    filteredSchools = schools.filter(x => shouldShowSchool(x['name']));
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