import stops from '../data/stops.js';
import { initializeStopMap, showStopsOnMap } from './stops-maps.js';
import { showStopsInList } from './stop-list.js';


let stopMap = initializeStopMap();
showStopsOnMap(stops, stopMap);

let stopList = document.querySelector('#stop-List');
showStopsInList(stops, stopList);

let routeCheckboxes = document.querySelectorAll('.route-checkbox');
let stopNameInput = document.querySelector('#stop-name-input');


//filter based on route name
function getFilteredStops() {
    let filteredStops = stops;

    const text = stopNameInput.value;
    filteredStops = stops.filter(function (stop) {
        const name = stop['stop_name'].toLowerCase();
        const hasText = name.includes(text);
        return hasText;

    });
    

    // Filter based on route checkboxes
    for (const checkbox of routeCheckboxes) {
        if (checkbox.checked) {
            filteredStops = filteredStops.filter(function (stop) {
                const route = checkbox.value;
                const hasRoute = stop['routes_ids'].includes(route);
                return hasRoute;
            })
        }
    }

    return filteredStops;
    
}

for (const cb of routeCheckboxes) {
    cb.addEventListener('change', () => {
        const filteredStops = getFilteredStops();
        showStopsOnMap(filteredStops, stopMap);
        showStopsInList(filteredStops, stopMap);



    });
}



stopNameInput.addEventListener('input', () => {
    const filteredStops = getFilteredStops();
    showStopsOnMap(filteredStops, stopMap);
});


window.stops = stops;
window.stopMap = stopMap;
window.routeCheckboxes = routeCheckboxes;
