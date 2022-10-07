import { htmlToElement } from './template-tools.js';

function showSchoolsInList(schoolsToShow, schoolList) {
    console.log(schoolList);
    schoolList.innerHTML = '';

    for (const school of schoolsToShow) {
        const html = `
            <li class="school-list-item">${school['name']}</li>
        `;
        const li = htmlToElement(html);
        schoolList.appendChild(li);
    }
}

export {
    showSchoolsInList,
}