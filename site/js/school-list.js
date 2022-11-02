import { htmlToElement } from './template-tools.js';

function showSchoolsInList(schoolsToShow, schoolList) {
    schoolList.innerHTML = '';

  for (const school of schoolsToShow) {
    const html = `
      <li class="school-list-item">${school['sort_name']} (Grades: ${school['Current Grade Span Served']})</li>
    `;
    const li = htmlToElement(html);
    schoolList.append(li);
  }
}

export {
  showSchoolsInList,
};