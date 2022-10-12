import { htmlToElement } from './template-tools.js';

function listSchools(schoolsToShow, whereToList){
    whereToList.innerHTML = '';
    for (let school of schoolsToShow) {
        const html = `<li class="school-list-item" value="${school["sdp_id"]}">${school['name']} <ul class="school-list-detail"><li class="grade">Grades Served: ${school["Current Grade Span Served"]}</li></ul></li>`;
        const li = htmlToElement(html);
        whereToList.append(li);   
    }
}

export {
    listSchools,
};