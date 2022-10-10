import { htmlToElement } from './template-tools.js';

function makeSchoolFeatureList(school) {
    return{
        'type': 'Feature',
        'id': school["sdp_id"],
        'properties':{
            "school_name": school["name"],
            "Email": school["FACE Liason Email"],
            "Phone Number": school["FACE Liasion Phone Number"],
            "Admission type": school["Admission Type"],
            "Grades Served": school["Current Grade Span Served"],
        },
    };
}

function showSchoolsInList(schoolsToShowList, schoolList) {
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
        console.log("Hi Jingyi I put console.log before appendList")
        schoolList.append(li);
    }
}

export {
    showSchoolsInList,
};