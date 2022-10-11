import { htmlToElement } from './template-tools.js';

function showSchoolsInList(schoolstoShow, schoolList) {
    for(const school of schoolstoShow){
        const html = `
        <li class ="school-list-item">${school['name']} ${school['gradelevel']} </li>
        `;
        const li = htmlToElement(html);
        schoolList.append(li);
    }
}

export{
    showSchoolsInList,
};