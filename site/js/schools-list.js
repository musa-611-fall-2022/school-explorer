import { htmlToElement} from './template-tools.js';

function showSchoolsInList(schoolsToShow, schoolList){
    for (const school of schoolsToShow){
        const html = `
         <li class = "school-list-item">${school['school_name']}</li>
        `;
        const li = htmlToElement(html);
        schoolList.append(li);
    }
}

export {
    showSchoolsInList
};