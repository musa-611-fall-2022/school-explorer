import { htmlToElement } from './template-tools.js';

function showschoolInList(schoolToShow, schoolList) {
    schoolList.innerHTML = '';
  
    for (const school of schoolToShow) {
      const html = `
      <li class="list-group-item">${school['name']} </li>
      `;
      const li = htmlToElement(html);
      schoolList.append(li);
    }
  }
  
  export {
    showschoolInList,
  };