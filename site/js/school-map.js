function initializeSchoolMap() {
    // initializing map object using L (Leaflet) library
    let schoolMap = L.map('school-map').setView([39.95244193418098, -75.16433792450688], 11);

    const mapboxAccount = 'mapbox';
    const mapboxStyle = 'light-v10';
    const mapboxToken = 'pk.eyJ1IjoiaGVucnlmZWluc3RlaW4iLCJhIjoiY2w4dzIyYXc0MDN2dTNwcnE3ZnMzOXh5OCJ9.Xj0CS62yWWvKB-v_uYz9sQ';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
    maxZoom: 19,
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    }).addTo(schoolMap);

    return schoolMap;
}

// function to turn school element into a geoJSON-like object
function makeSchoolFeature(school) {
    return {
        "type": "Feature",
        "sdp_id": school['sdp_id'], // geoJSONs have id fields which are good to fill if you have an existing id field to work with
        "properties": {
            "name": school['name'],
            "sdp_id": school['sdp_id'],
        },
        "geometry": school['geom'], // or school.geom (they are the same thing, using [] just matches JSON use aesthetically)
    };
}

// function to put schools on map
function showSchoolsOnMap(schoolsToShow, schoolMap) {
    if (schoolMap.schoolLayer !== undefined) {
        schoolMap.removeLayer(schoolMap.schoolLayer);
    }
    // create feature collection using makeSchoolFeature
    const schoolFeatureCollection = {
        "type": "FeatureCollection",
        "features": schoolsToShow.map(makeSchoolFeature),
    };
    window.schoolFeatureCollection = schoolFeatureCollection;
    // add schools to map and style
    schoolMap.schoolLayer = L.geoJSON(schoolFeatureCollection, {
        pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
        style: {
            stroke: null,
            fillOpacity: 0.9,
            radius: 3,
        },
    })
    .bindTooltip(layer => layer.feature.properties['name'])
    .addTo(schoolMap);
}

export {
    initializeSchoolMap,
    showSchoolsOnMap,
};