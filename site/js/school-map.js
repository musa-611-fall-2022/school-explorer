
function initializeSchoolMap() {
    let schoolmap = L.map('school-map').setView([39.953286167172955, -75.19832424115529], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(schoolmap);

    return schoolmap;
}


function makeSchoolFeature(schoolgeo) {
    return {
        "type": "Feature",
        "id": schoolgeo['sdp_id'],
        "properties": {
            "grade_span": schoolgeo['Current Grade Span Served'],
            "school_name": schoolgeo['name'],
            "website": schoolgeo['Website']
        },
        "geometry": schoolgeo['geom'],
    }
}

function showSchoolOnMap(schoolToShow, schoolmap) {
    if (schoolmap.schoolLayers !== undefined) {
        schoolmap.removeLayer(schoolmap.schoolLayers);
    }
    const schoolFeatureCollection = {
        "type": "FeatureCollection",
        "features": schoolToShow.map(makeSchoolFeature),
    };

    schoolmap.schoolLayers = L.geoJSON(schoolFeatureCollection, {
        pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
        style: {
            color: "#FFA500",
            stroke: null,
            fillOpacity: 0.9,
            radius: 3.5,
        },
    })
        .bindTooltip(layer => {
            return layer.feature.properties['school_name'];
        })
        .addTo(schoolmap);
}

export {
    initializeSchoolMap,
    showSchoolOnMap,
};