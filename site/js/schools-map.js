function initializeSchoolMap () {
    let schoolMap = L.map ('school-map').setView([39.952436849966794, -75.16356820883757], 11);

    const mapboxAccount = 'mapbox';
    const mapboxStyle = 'light-v10';
    const mapboxToken = 'pk.eyJ1IjoibW9yZ2FuZ3IiLCJhIjoiY2w4dzF2bHZsMDJqdDN3czJwOGg0ZXBsbSJ9.tXRhvJAL-t7cJCrCyAEhUw';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
    maxZoom: 19,
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
}).addTo(schoolMap);

    return schoolMap;
}

// Create a function to transform one of the school elements into a GeoJSON-like feature
function makeSchoolFeature(school) {
    return {
      "type": "Feature",
      "id": school['sdp_id'],
      "properties": {
        "Admission Type": school['Admission Type'],
        "Alternate Education Type": school['Alternate Education Type'],
        "Assistant Superintendent": school['Assistant Superintendent'],
        "CTE Status": school['CTE Status'],
        "City": school['City'],
        "City Council District": school['City Council Distric'],
        "Community School Cohort": school['Community School Cohort'],
        "Current Grade Span Served": school['Current Grade Span Served'],
        "FACE Liason Email": school['FACE Liason Email'],
        "FACE Liason Name": school['FACE Liason Name'],
        "FACE Liason Phone Number": school['FACE Liason Phone Number'],
        "Fax Number": school['Fax Number'],
        "Federal Accountability Designation": school['Federal Accountability Designation'],
        "Governance": school['Governance'],
        "Grade 1": school['Grade 1'],
        "Grade 2": school['Grade 2'],
        "Grade 3": school['Grade 3'],
        "Grade 4": school['Grade 4'],
        "Grade 5": school['Grade 5'],
        "Grade 6": school['Grade 6'],
        "Grade 7": school['Grade 7'],
        "Grade 8": school['Grade 8'],
        "Grade 9": school['Grade 9'],
        "Grade 10": school['Grade 10'],
        "Grade 11": school['Grade 11'],
        "Grade 12": school['Grade 12'],
        "Grade k": school['Grade K'],
        "Grade Span at Scale": school['Grade Span at Scale'],
        "Learning Network": school['Learning Network'],
        "Major Intervention": school['Major Intervention'],
        "Major Intervention Year": school['Major Intervention Year'],
        "Management Organization": school['Management Organization'],
        "Multiple Addresses": school['Multiple Addresses'],
        "Phasing-In": school['Phasing-In'],
        "Phasing-Out": school['Phasing-Out'],
        "Phone Number": school ['Phone Number'],
        "School Leader Name": school['School Leader Name'],
        "School Level": school['School Level'],
        "School Reporting Category": school['School Reporting Category'],
        "State": school['State'],
        "Street Address": school['Street Address'],
        "Title I Designation": school['Title I Designation'],
        "Website": school['Website'],
        "Year Opened": school['Year Opened'],
        "Zip Code": school['Zip Code'],
        "abbr_name": school['abbr_name'],
        "name": school['name'],
        "sdp_id": school['sdp_id'],
        "sort_name": school['sort_name'],
    },
      "geometry": school['geom'],
    };
}

//  Use the function to display all the schools data on the map
function showSchoolsOnMap(schoolsToShow, schoolMap) {
    if (schoolMap.schoolLayers !== undefined) {
    schoolMap.removeLayer(schoolMap.schoolLayers);
}

    const schoolFeatureCollection = {
        "type": "FeatureCollection",
        "features": schoolsToShow.map(makeSchoolFeature),
    };

    //  Create a function to show an array of schools on the map.
    schoolMap.schoolLayers = L.geoJSON(schoolFeatureCollection, {
    pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
    style: {
        stroke: null,
        fillOpacity: 0.9,
        radius: 3,
     },
    })
    .bindTooltip(Layer => Layer.feature.properties['name'])
    .addTo(schoolMap);
}

export {
   initializeSchoolMap,
   showSchoolsOnMap,
};