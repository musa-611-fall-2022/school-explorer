import { htmlToElement } from "./template-tools.js";


function showSchoolsInList(schoolsToShow, schoolList) {
    schoolList.innerHTML = "";

    for(const school of schoolsToShow) {

        const html = `
            <li class="school-list-item" role="option" title="${school['name']}" value=0>
                <div>${school['name']}</div>
            </li>
        `;
        const li = htmlToElement(html);
        schoolList.append(li);
    }
}

export {
    showSchoolsInList,
};