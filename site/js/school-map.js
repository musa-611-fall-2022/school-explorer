function initializeSchoolMap () {
    let base = L.map ('school-map').setView([40, -75.16], 11);

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
}).addTo(base);

    return base;
}

// Function: make school features
function makeSchoolFeature(school) {
    return {
        "type": "Feature",
        "id": school["sdp_id"],
        "properties": {
            "school_name": school["name"],
            "school_level": school["School Level"],
            "management_organization": school["Management Organization"],
            "address": school["Street Address"],
        },
        "geometry": school["geom"],
    };
}

//function: get school on map
function showSchoolsOnMap(schoolsToShow, schoolMap) {

    const schoolFeatureCollection = {
        "type": "FeatureCollection",
        "features": schoolsToShow.map(makeSchoolFeature),
    };

    if (schoolMap.schoolLayers !== undefined) {
        schoolMap.removeLayer(schoolMap.schoolLayers);
    }


    schoolMap.schoolLayers = L.geoJSON(schoolFeatureCollection, {
    pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
    style: {
        radius: 4,
        color: "#7FFFD4",
        fillOpacity: 0.5,
        stroke: true,
        weight: 0.7,
     },
    })
    .bindTooltip(Layer => Layer.feature.properties['school_name'])
    .addTo(schoolMap);
}

export{
    makeSchoolFeature,
    showSchoolsOnMap,
    initializeSchoolMap,
};

window.showSchoolsOnMap = showSchoolsOnMap;
window.makeSchoolFeature = makeSchoolFeature;