import { htmlToElement } from './template-tools.js';

function showSchoolsInList(schoolsToShow, schoolList){
    schoolList.innerHTML = '';
    for (const schools of schoolsToShow){
        const html = `<li class = "school-list-item">${schools['name']}</li>`;
        const li = htmlToElement(html);
        schoolList.append(li);
    }
}

export {
    showSchoolsInList,
};