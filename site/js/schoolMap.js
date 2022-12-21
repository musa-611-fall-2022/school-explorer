function mapInitialize(){
    let schoolMap = L.map ('school-map').setView([39.952436849966794, -75.16356820883757], 11);

    const mapboxAccount = 'mapbox';
    const mapboxStyle = 'light-v10';
    const mapboxToken = 'pk.eyJ1IjoieWVzZW5pYW8iLCJhIjoiY2tlZjAyM3p5MDNnMjJycW85bmpjenFkOCJ9.TDYe7XRNP8CnAto0kLA5zA';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
    maxZoom: 19,
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
}).addTo(schoolMap);

    return schoolMap;
}

function makeSchoolFeature(school){
    return {
        "type":"Feature",
        "id": school['spd_id'],
        "properies":{
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
        pointToLayer:  (geoJsonPoint, latlng) => L.circleMarker(latlng),
        style:{
            stroke:null,
            fillOpacity:1,
            radius:3,
            color: "#f5a720",
        },
    }).bindTooltip(layer => layer.feature.properties['school_name'])
    .addTo(schoolmap);
    }

export{
    makeSchoolFeature,
    showSchoolsOnMap,
    mapInitialize,
};