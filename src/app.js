const QuakeItem = require('./views/quake-item.js')
const QuakeData = require('./models/quake-data.js')
const MapWrapper = require('./models/map-wrapper.js')

document.addEventListener('DOMContentLoaded', () => {
  let startDate = new Date();  // for url search
  // console.log(startDate);
  let endDate = startDate; // for url search

  // Starting URL is selecting todays earthquakes
  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2018-04-19&endtime=2018-04-20`;
  // then we pull the default data
  const quakeData = new QuakeData(url);

  // create a google map to plot all events
  const mapContainer = document.getElementById('main-map');
  const centerNone = {lat: 0, lng: 0}; // start map at
  const mainMap = new MapWrapper(mapContainer, centerNone, 1);

  // Filter buttons to allow a different selection of EarthQuakes
  const magnitudeSelection = document.getElementById('magnitude-select')
  const magnitide = magnitudeSelection.getAttribute('value');


  // Drop down list of quakes, plus list below map of same.
  const quakeSelector = document.getElementById('quake-select');
  const quakeList = document.getElementById('quake-list');
  const quakeItem = new QuakeItem(quakeSelector, quakeList);

  // quakeSelect.addEventListener('click', () => {
  //   const selectedQuake = quakeData.getQuakeByIndex(selectedQuakeIndex);
  //   quakeData.populateList();
  // });
  // console.log(magnitude);

  // Allow drop down menu select to navigate+zoom map to earthquake
  quakeSelector.addEventListener('change', (event) => {
    mainMap.zoom(9);
    const selectedQuakeIndex = event.target.value;
    const selectedQuake = quakeData.getQuakeByIndex(selectedQuakeIndex);
    const coords = { lat: selectedQuake.lat, lng: selectedQuake.lng}
    mainMap.moveToLocation(selectedQuake.lat, selectedQuake.lng);
  });


  // Populate the dropdown list and list below map at start with default data
  quakeData.getData((fetchedData) => {
    quakeItem.renderQuakeDropDown(fetchedData);
    quakeItem.renderQuakeList(fetchedData);
    quakeItem.addInfoMarkers(mainMap, fetchedData);
  });

}); // end DOMContentLoaded
