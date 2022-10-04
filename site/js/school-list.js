import { htmlToElement } from './htmlelement.js';

function showSchoolsInList(schoolsToShow, schoolList) {
    schoolList.innerHTML = '';

    for (const school of schoolsToShow) {
        const html = `
            <li class="school-list-item">${school['name']}</li>
        `;
        const li = htmlToElement(html);
        // li.addEventListener('click', () => { // ATTEMPT AT STRETCH 1 TASK
        //     schoolHighlight(li.innerText);  // ATTEMPT AT STRETCH 1 TASK
        //     }); // ATTEMPT AT STRETCH 1 TASK
        schoolList.append(li); // ATTEMPT AT STRETCH 1 TASK
    }
}

// function schoolHighlight(name) { // ATTEMPT AT STRETCH 1 TASK
//     console.log(name); // ATTEMPT AT STRETCH 1 TASK
// } // ATTEMPT AT STRETCH 1 TASK

export {
    showSchoolsInList,
    // schoolHighlight, // ATTEMPT AT STRETCH 1 TASK
};


