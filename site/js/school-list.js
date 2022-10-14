import { htmlToElement } from "./template-tools.js";
import { gradeArr } from './main.js';

function showSchoolsInList(schoolsToShow, schoolList) {
    schoolList.innerHTML = "";

    for(const school of schoolsToShow) {
        let thisGradeArr = [];
        for(let grade of gradeArr) {
            if(school[grade] === "1") {
                thisGradeArr.push(grade.substring(6));
            }
        }
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