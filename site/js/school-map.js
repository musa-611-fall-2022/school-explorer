import philamap from '../data/catchments.js';

function initializeschoolMap() {
    let schoolMap = L.map ('school-map').setView([39.952436849966794, -75.16356820883757], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(schoolMap);

    const phil = L.geoJSON(philamap, {
      style: { fill: null, color: '#000' },
    }).addTo(schoolMap);

    schoolMap.fitBounds(phil.getBounds());

    return schoolMap;
  }

  function makeschoolFeature(school) {
    return {
      "type": "Feature",
      "id": school['sdp_id'],
      "properties": {
        "name": school['name'],
        "school_level": school['School Level'],
        "admission_type": school['Admission Type'],
        "governance": school['Governance'],
        "organization": school['Management Organization'],
        "category": school['School Reporting Category'],
  
      },
      "geometry": school['geom'],
    };
  }

  function showschoolOnMap(schoolToShow, schoolMap) {
    if (schoolMap.schoolLayers !== undefined) {
      schoolMap.removeLayer(schoolMap.schoolLayers);
    }

    const schoolFeatureCollection = {
      "type": "FeatureCollection",
      "features": schoolToShow.map(makeschoolFeature),
    };

    schoolMap.schoolLayers = L.geoJSON(schoolFeatureCollection, {
      pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
      style: {
        stroke: null,
        fillOpacity: 0.9,
        radius: 3,
      },
    })
    .bindTooltip(layer => layer.feature.properties['school_name'])
    .addTo(schoolMap);
  }

  export {
    initializeschoolMap,
    showschoolOnMap,
  };
