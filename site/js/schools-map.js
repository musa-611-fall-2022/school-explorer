import schools from '../data/schools.js';
import catchments from '../data/catchments.js';

function initializeSchoolsMap () {
    //initial zoom and center
    let schoolsMap = L.map('schools-map').setView([39.95764876954889, -75.1629638671875], 12);

    //add basemap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
    }).addTo(schoolsMap);

    //including catchments polygon and restyling
    L.geoJSON(catchments, {
        style: { fill: null, color: '#000' },
    })
    .addTo(schoolsMap);

    return schoolsMap;

}

    //function that converts .js into GeoJSON format - need to set properties
function makeSchoolsFeature(schools){
    return{
        'type': 'Feature',
        /*'properties': {
            'routes_ids':schools['routes_ids'],
            'schools_id':schools['schools_id'],
            'schools_name':schools['schools_name'],
            'wheelchair_boarding':schools['wheelchar_boarding'],
        },*/
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
    /*.bindTooltip(layer => layer.feature.properties['stop_name'])*/
    .addTo(schoolsMap);
}

export{
    initializeSchoolsMap,
    showSchoolsOnMap,
};
