import { htmlToElement } from './template-tools.js';

function getGrades(school){
    let grades = [];
    if (school['Grade K'] == "1"){
        grades.push(0);
    }
    if (school['Grade 1'] == "1"){
        grades.push(1);
    }
    if (school['Grade 2'] == "1"){
        grades.push(2);
    }
    if (school['Grade 3'] == "1"){
        grades.push(3);
    }
    if (school['Grade 4'] == "1"){
        grades.push(4);
    }
    if (school['Grade 5'] == "1"){
        grades.push(5);
    }
    if (school['Grade 6'] == "1"){
        grades.push(6);
    }
    if (school['Grade 7'] == "1"){
        grades.push(7);
    }
    if (school['Grade 8'] == "1"){
        grades.push(8);
    }
    if (school['Grade 9'] == "1"){
        grades.push(9);
    }
    if (school['Grade 10'] == "1"){
        grades.push(10);
    }
    if (school['Grade 11'] == "1"){
        grades.push(11);
    }
    if (school['Grade 12'] == "1"){
        grades.push(12);
    }
    return grades;
}

function showSchoolsInList(schoolsToShow, schoolList){
    schoolList.innerHTML = '';
    for (const school of schoolsToShow){
        let grades = getGrades(school);
        let gradesRange = `${grades[0]}-${grades[grades.length-1]}`;
        const html=`
            <li class="school-list-item">${school['name']}, Grades: ${gradesRange}, Admission: ${school['Admission Type']} </li>
        `;
        const li = htmlToElement(html);
        schoolList.append(li);
    }
}


export {
    showSchoolsInList,
};