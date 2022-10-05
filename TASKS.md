- [ x] Create an _index.html_ with a basic HTML page structure
- [ ] Create an empty CSS file for the project
- [ ] Create an empty JavaScrip file for the project
- [ ] Link to the empty CSS file from the bottom of the `head` of your HTML file
- [ ] Link to the empty JavaScript file from the bottom of the `body` of your HTML file
- [ ] Add a level-1 heading (`h1`) to the body with the app title, just so there's something to see on the page

Check the app in the browser.

- [ ] Add a Leaflet map for displaying the list of schools to the page
  * **Tip:** Usually when I'm starting with a new leaflet map, I just Google "leaflet quickstart" and copy a few things from that page. Other times I may use a CDN like 
  * **Recommendation:** Give your map a meaningful ID -- something like `school-map`, and then name the corresponding JavaScript variable something similar, e.g. `schoolMap`.
- [ ] Import the data from _site/data/schools.js_ into your JavaScript file.
- [ ] Create a function called `makeSchoolFeature` to transform one of the school elements into a GeoJSON-like feature. **This function should be made available globally (on the window object)**.
- [ ] Use the function to display all the `schools` data on the map.
- [ ] Create a function to show an array of schools on the map.