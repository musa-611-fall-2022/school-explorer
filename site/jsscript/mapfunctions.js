

function initSchoolMap(){
    const southWest = L.latLng(39.88, -75.27),
    northEast = L.latLng(40.2, -74.98),
    bounds = L.latLngBounds(southWest, northEast);

    let schoolMap = L.map('school-map', { maxBounds: bounds, maxZoom: 19, minZoom: 10.5 }).setView([39.95, -75.16], 11);

    const mapboxAccount = 'mapbox';
    const mapboxStyle = 'satellite-v9';
    const mapboxToken = 'pk.eyJ1IjoiY2h1ZW1idWNrZXQiLCJhIjoiY2w5dTl6M3V1MG0xejN1bGVqbzQyZTZjbiJ9.VfiDkqAOIvCv1KdQdrgnSQ';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
        maxZoom: 19,
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
}).addTo(schoolMap);
    return schoolMap;
}

function makeSchoolFeature(school){
    return {
        "type": "Feature",
        "id": school['sdp_id'],
        "properties": {
          "school_name": school['name'],
          "admission_type": school['Admission Type'],
          "year_open": school['Year Opened'],
        },
        "geometry": school['geom'],
      };
}

function showSchoolsOnMap(SchoolsToShow, schoolMap) {
  if (schoolMap.schoolLayers !== undefined) {
    schoolMap.removeLayer(schoolMap.schoolLayers);
  }
    const schoolFeatureCollection = {
      "type": "FeatureCollection",
      "features": SchoolsToShow.map(makeSchoolFeature),
    };
    schoolMap.schoolLayers = L.geoJSON(schoolFeatureCollection, {
      pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
      style: function(Feature) {
        switch (Feature.properties['admission_type']) {
            case "Neighborhood":   return { color: "orange" };
            case "Citywide":   return { color: "blue" };
            case "Citywide With Criteria":   return { color: "#1ca0d9" };
            case "Special Admit":   return { color: "green" };
            case "Alternative":   return { color: "yellow" };
        }

      },
      },
    )
    .bindTooltip(layer => layer.feature.properties['school_name'])
    .addTo(schoolMap);
  }



export {
    initSchoolMap,
    showSchoolsOnMap,
};