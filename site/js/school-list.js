import { htmlToElement } from './template-tools.js';

function showSchoolsInList(schoolsToShow, schoolList) {
    schoolList.innerHTML = '';

  for (const school of schoolsToShow) {
    const html = `<li class="list-group-item">name:${school['name']}zip code:${school['Zip Code']} (Grades: ${school['Current Grade Span Served']})</li>`;
    const li = htmlToElement(html);
    schoolList.append(li);
  }
}

export {
  showSchoolsInList,
};