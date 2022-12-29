function initializeSchoolMap() {
    let schoolMap = L.map('school-map').setView([39.96,-75.2], 10);
 
     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
         maxZoom: 19,
         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
     }).addTo(schoolMap); 
 
     return schoolMap;
 }
 
 
 // To transform one of the school elements into a GeoJSON-like feature
 function makeSchoolFeature(school){
     return {
         "type": "Feature",
         "id": school['sdp_id'],
         "properties": {
             "school_name": school['name'],
             "admission_type": school['Admission Type'],
             "school_level": school['School Level'],
             "zip_code": school['Zip Code'],
         },
         "geometry": school['geom'],
     };
 
 }
 
 function showSchoolOnMap(schoolToShow, schoolMap) {
    if (schoolMap.schoolLayers !== undefined) {
        schoolMap.removeLayer(schoolMap.schoolLayers);
    }
    
     const schoolFeatureCollection = {
     "type": "FeatureCollection",
     "features": schoolToShow.map(makeSchoolFeature),
 };
 
 schoolMap.schoolLayers = L.geoJSON(schoolFeatureCollection,{
     pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
     style: {
         stroke: null,
         fillOpacity: 0.9,
         radius: 3,
     }
 }) 
 .bindTooltip(layer => {
    return layer.feature.properties['school_name'];
 })
 .addTo(schoolMap);
 }

 export {
    initializeSchoolMap,
    showSchoolOnMap,
 };