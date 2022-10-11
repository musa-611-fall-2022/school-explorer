import { htmlToElement } from './template-tools.js';
//my functions
function mapInitialize() {
    let schoolmap = L.map('school-map').setView([40, -75.15], 11);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(schoolmap);
    return schoolmap;
}
function makeSchoolFeature(school) {
    return {
        "type": "Feature",
        "id": school['spd_id'],
        "properties":{
            "school_name": school['name'],
            'Grade k' : school['Grade k'],
            'Grade 1' : school['Grade 1'],
            'Grade 2' : school['Grade 2'],
            'Grade 3' : school['Grade 3'],
            'Grade 4' : school['Grade 4'],
            'Grade 5' : school['Grade 5'],
            'Grade 6' : school['Grade 6'],
            'Grade 7' : school['Grade 7'],
            'Grade 8' : school['Grade 8'],
            'Grade 9' : school['Grade 9'],
            'Grade 10' : school['Grade 10'],
            'Grade 11' : school['Grade 11'],
            'Grade 12' : school['Grade 12'],
            "school_id": school['spd_id'],
            "Admission Type": school['Admission Type'],
        },
        "geometry": school['geom'],
    };
}
function showSchoolsOnMap(schools, schoolmap){
    if (schoolmap.schoolLayers !== undefined){
    schoolmap.removeLayer(schoolmap.schoolLayers);
    }
    const schoolFeatureCollection = {
        "type": "FeatureCollection",
        "features": schools.map(makeSchoolFeature),
    };

    schoolmap.schoolLayers = L.geoJSON(schoolFeatureCollection, {
        pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
        style:{
            stroke:null,
            fillOpacity:1,
            radius:3,
            color: "#3C69A0",
        },
    }).bindTooltip(layer => layer.feature.properties['school_name'])
    .addTo(schoolmap);
}
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
function showSchoolsInList(schoolsToShow, schoolList) {
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
    makeSchoolFeature,
    showSchoolsInList,
    showSchoolsOnMap,
    getGrades,
    mapInitialize,
};