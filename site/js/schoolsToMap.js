//맵만드는걸 하나의 펑션(initializeSchoolMap)으로 묶어버릴거임//

function initializeSchoolMap() {
    /*
    1) Import map (https://leafletjs.com/examples/quick-start/)
    */
    let schoolMap = L.map('school-map', { zoomSnap: 0.25 }).setView([39.95522712709254, -75.19864425285742], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
    }).addTo(schoolMap);

    return schoolMap;
}

//L.geoJSON(catchments).addTo(schoolMap)

/*
1) geoJSON feature 작업을 해야함
2) schools  >  feature
3) creat function makeSchoolFeature
*/

function makeSchoolFeature(x) {
    return {
        "type": "Feature",
        "id": x['sdp_id'],
        "properties":{
            "name": x['name'],
        },
        "geometry": x['geom'],
    };
}

/*
1)Schools.js 에서 geoJSON 만들고 지도에 넣는것까지 하나의함수로 만듦 : showSchoolsOnMap
*/


function showSchoolsOnMap(x, schoolMap) {


    const stopFeatureColletion = {
        "type": "FeatureCollection",
        "features": x.map(makeSchoolFeature),
    };


    if (schoolMap.schoolLayer !== undefined) {
        schoolMap.removeLayer(schoolMap.schoolLayer);
    }
    /*
    1)맵에 위에서 만든 geoJSON 추가
    2)marker를 다른걸로 바꿀 수 있음 > circleMarker (https://leafletjs.com/reference.html#geojson)
    3)bindTooltip 마커에 정보 띄우기 (x는 pointToLayer에서 만드는 하나의 레이어를 의미함. 즉 하나의 포인트)
    */

    schoolMap.schoolLayer = L.geoJSON(stopFeatureColletion, {
        pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
        style:{
            stroke: null,
            radius: 5,
            fillOpacity: 1,
        },
    })
    .bindTooltip(x => x.feature.properties['name'])
    .addTo(schoolMap);
}



export{
    initializeSchoolMap,
    showSchoolsOnMap,
};

window.showSchoolsOnMap = showSchoolsOnMap;
window.makeSchoolFeature = makeSchoolFeature;