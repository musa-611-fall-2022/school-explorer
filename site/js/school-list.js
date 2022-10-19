import { htmlToElement } from "./template-tools.js";

function showSchoolsInList(schoolsToShow, schoolList) {
    schoolList.innerHTML = ``;

    for (const school of schoolsToShow) {
        const html = `
            <li class="school-list-item">${school['name']} (serves grades ${school['Current Grade Span Served']})</li>
        `;
        const li = htmlToElement(html);
        schoolList.append(li);
    }
}

export {
    showSchoolsInList,
};