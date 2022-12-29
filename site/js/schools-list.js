import{htmlToElement} from './template-tools.js';

function showSchoolsInList(schoolsToShow, schoollist) {
    schoollist.innerHTML = '';

    for (const school of schoolsToShow){
        const html = `
        <li class="school-list-item">${school['name']}</li>   
        `;
        const li = htmlToElement(html);
        schoollist.append(li);
    }
}

export{
    showSchoolsInList,
};