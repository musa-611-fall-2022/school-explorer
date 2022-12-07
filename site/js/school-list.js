import { htmlToElement } from './template-tools.js';

function showSchoolInList(schoolsToShow, schoolList) {
    schoolList.innerHTML = '';
    for (const school of schoolsToShow) {
        const html = `
            <li class="school-list-item">${school['name']}</li>
        `;
        const li = htmlToElement(html);
        schoolList.append(li);
    }
}

export {
    showSchoolInList,
};