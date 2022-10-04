import { htmlToElement } from './template-tools.js';

function listSchools(schoolsToShow, whereToList){
    const list = document.getElementById(whereToList);
    list.innerHTML = '';
    for (let school of schoolsToShow) {
        const html = `<li class="school-list-item">${school['name']} <ul class="school-list-detail"><li class="grade">Grades Served: ${school["Current Grade Span Served"]}</li></ul></li>`;
        const li = htmlToElement(html);
        list.append(li);
    }
}

export {
    listSchools,
};