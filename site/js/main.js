let schoolMap = L.map('school-map', [39.16,-75.2], 10); //L. usually refers to the leaflet library. You can also type Leaflet.map. This function binds a map to a container. We are creating a school-map. This is lat lon, the third arguement is the zoom. Which is a lens of 10 for this case. 

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
}).addTo(schoolMap);