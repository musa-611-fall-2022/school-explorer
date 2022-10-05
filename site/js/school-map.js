

function makeSchoolFeature(school) {
  return {
    "type": "Feature",
    "id": school['sdp_id'],
    "properties": {
        "school_name": school["name"],
        "school_level": school["School Level"],
        "management_organization": school["Management Organization"],
        "address": school["Street Address"],
    },
    "geometry": school["geom"],
  };
}

function showSchoolsOnMap(schoolsToShow, schoolMap) {
    if (schoolMap.schoolLayers !== undefined) {
        schoolMap.removeLayer(schoolMap.schoolLayers);
    }
    const schoolFeatureCollection = {
        "type": "FeatureCollection",
        "features": schoolsToShow.map(makeSchoolFeature),
    };
    schoolMap.schoolLayers = L.geoJSON(schoolFeatureCollection, {
        pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
        style: {
          stroke: null,
          fillOpacity: 0.9,
          radius: 3,
        },
    }).bindTooltip(layer => layer.feature.properties['school_name'])
      .addTo(schoolMap);
}

export {
  showSchoolsOnMap,
};

window.showSchoolsOnMap = showSchoolsOnMap;
window.makeSchoolFeature = makeSchoolFeature;