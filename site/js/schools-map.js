//import schools from '../data/schools.js';
import catchments from '../data/catchments.js';

const mapboxAccount = 'mapbox';
const mapboxStyle = 'light-v10';
const mapboxToken = 'pk.eyJ1IjoiY29udHJhaWwtZW50aHVzaWFzdCIsImEiOiJjbDlsbTRteXEwMWh0M3VwZjBqc2JrbWZ4In0.MCAs44cMD-2XioBijyx_Iw';


function initializeSchoolsMap () {
    //initial zoom and center
    let schoolsMap = L.map('schools-map').setView([39.95764876954889, -75.1629638671875], 13);

    //add basemap
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
        maxZoom: 19,
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    }).addTo(schoolsMap);

    //including catchments polygon and restyling
    L.geoJSON(catchments, {
        style: { fill: null, weight:0.5, color: '#000' },
    })
    .addTo(schoolsMap);

    return schoolsMap;

}

//function that converts .js into GeoJSON format - need to set properties
function makeSchoolsFeature(schools){
    return{
        'type': 'Feature',
        'properties': {
            'name':schools['name'],
            'School Level':schools['School Level'],
            'City Council District':schools['City Council District'],
            'Street Address':schools['Street Address'],
            'City':schools['City'],
            'State':schools['State'],
            'Zip Code':schools['Zip Code'],
            'Phone Number':schools['Phone Number'],
            'Fax Number':schools['Fax Number'],
            'Website':schools['Website'],
            'Grade K':schools['Grade K'],
            'Grade 1':schools['Grade 1'],
            'Grade 2':schools['Grade 2'],
            'Grade 3':schools['Grade 3'],
            'Grade 4':schools['Grade 4'],
            'Grade 5':schools['Grade 5'],
            'Grade 6':schools['Grade 6'],
            'Grade 7':schools['Grade 7'],
            'Grade 8':schools['Grade 8'],
            'Grade 9':schools['Grade 9'],
            'Grade 10':schools['Grade 10'],
            'Grade 11':schools['Grade 11'],
            'Grade 12':schools['Grade 12'],
        },
        'geometry': schools['geom'],
    };
}

function showSchoolsOnMap (schoolsToShow, schoolsMap) {
    if (schoolsMap.schoolsLayers !== undefined) {
        schoolsMap.removeLayer(schoolsMap.schoolsLayers);
      }

    /*creates a new Feature Collection from those converted GeoJSON objects.
    Use "const" b/c no intent to change later on.*/
    const schoolsFeatureCollection ={
        "type":"FeatureCollection",
        "features":schoolsToShow.map(makeSchoolsFeature),
    };

    //add feature collection to map
    schoolsMap.schoolsLayers = L.geoJSON(schoolsFeatureCollection, {
        pointToLayer: (geoJSONPoint, latlng) => L.circleMarker(latlng),
        style: {
            stroke: null,
            fillOpacity: 0.8,
            radius: 5,
        },
    })
    .bindTooltip(layer => layer.feature.properties['name'])
    .addTo(schoolsMap);
}

export{
    initializeSchoolsMap,
    showSchoolsOnMap,
};
