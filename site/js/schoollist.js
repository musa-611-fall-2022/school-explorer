import { htmlToElement } from './template-tools.js';

function showSchoolsInList(schoolstoShow, schoollist) {
    for(const school of schoolstoShow){
        const html = `
        <li class ="school-list-item">${school['name']} ${school['gradelevel']} </li>
        `;
        const li = htmlToElement(html);
        schoollist.append(li);
    }
}

export{
    showSchoolsInList,
};