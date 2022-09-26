function initializeSchoolMap() {
    // initializing map object using L (Leaflet) library
    let schoolMap = L.map('school-map').setView([39.95244193418098, -75.16433792450688], 11);

    // adding basemap to map (taken from Leaflet intro example)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
    }).addTo(schoolMap);
}

// function to turn school element into a geoJSON-like object
function makeSchoolFeature(school) {
    return {
        "type": "Feature",
        "sdp_id": school['sdp_id'], // geoJSONs have id fields which are good to fill if you have an existing id field to work with
        "properties": {
            "name": school['name'],
            "Zip Code": school['Zip Code'],
            "sdp_id": school['sdp_id'],
        },
        "geometry": school['geom'], // or school.geom (they are the same thing, using [] just matches JSON use aesthetically)
    };
}

// function to put schools on map
function showSchoolsOnMap(schoolsToShow, schoolMap) {
    // create feature collection using makeSchoolFeature
    let schoolFeatureCollection = {
        "type": "FeatureCollection",
        "features": schoolsToShow.map(makeSchoolFeature),
    };

    // add schools to map and style
    L.geoJSON(schoolFeatureCollection, {
        pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
        style: {
            stroke: null,
            fillOpacity: 0.9,
            radius: 3,
        },
    }).addTo(schoolMap);
}

export {
    initializeSchoolMap,
    showSchoolsOnMap,
};