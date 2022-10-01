import { htmlToElement } from "./template-tools.js";

function showSchoolsInList(schoolsToShow, schoolList) {
    schoolList.innerHTML = "";

    for(const school of schoolsToShow) {
        const html = `
            <li role="option">${school['name']}</li>
        `;
        const li = htmlToElement(html);
        schoolList.append(li);
    }
}

export {
    showSchoolsInList,
};