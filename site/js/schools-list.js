import { htmlToElement } from './template-tools.js';

function showSchoolsInList(schoolsToShow, schoolList) {
    console.log(schoolList);
    schoolList.innerHTML = '';

    const schoolFeatureCollectionList = {
        "features": schoolsToShowList.map(makeSchoolFeatureList),
    };


    for (const school of schoolsToShowList) {
        const html = `
            <li class="school-list-item">${school['name']}</li>
        `;
        const li = htmlToElement(html);
        schoolList.appendChild(li);
    }
}

export {
    showSchoolsInList,
};