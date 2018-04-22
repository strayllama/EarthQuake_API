/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const QuakeItem = __webpack_require__(/*! ./views/quake-item.js */ \"./src/views/quake-item.js\")\nconst QuakeData = __webpack_require__(/*! ./models/quake-data.js */ \"./src/models/quake-data.js\")\nconst MapWrapper = __webpack_require__(/*! ./models/map-wrapper.js */ \"./src/models/map-wrapper.js\")\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  let startDate = new Date();  // for url search\n  // console.log(startDate);\n  let endDate = startDate; // for url search\n\n  // Starting URL is selecting todays earthquakes\n  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2018-04-19&endtime=2018-04-20`;\n  // then we pull the default data\n  const quakeData = new QuakeData(url);\n\n  // create a google map to plot all events\n  const mapContainer = document.getElementById('main-map');\n  const centerNone = {lat: 0, lng: 0}; // start map at\n  const mainMap = new MapWrapper(mapContainer, centerNone, 1);\n\n  // Filter buttons to allow a different selection of EarthQuakes\n  const magnitudeSelection = document.getElementById('magnitude-select')\n  const magnitide = magnitudeSelection.getAttribute('value');\n\n\n  // Drop down list of quakes, plus list below map of same.\n  const quakeSelector = document.getElementById('quake-select');\n  const quakeList = document.getElementById('quake-list');\n  const quakeItem = new QuakeItem(quakeSelector, quakeList);\n\n  // quakeSelect.addEventListener('click', () => {\n  //   const selectedQuake = quakeData.getQuakeByIndex(selectedQuakeIndex);\n  //   quakeData.populateList();\n  // });\n  // console.log(magnitude);\n\n  // Allow drop down menu select to navigate+zoom map to earthquake\n  quakeSelector.addEventListener('change', (event) => {\n    mainMap.zoom(9);\n    const selectedQuakeIndex = event.target.value;\n    const selectedQuake = quakeData.getQuakeByIndex(selectedQuakeIndex);\n    const coords = { lat: selectedQuake.lat, lng: selectedQuake.lng}\n    mainMap.moveToLocation(selectedQuake.lat, selectedQuake.lng);\n  });\n\n\n  // Populate the dropdown list and list below map at start with default data\n  quakeData.getData((fetchedData) => {\n    quakeItem.renderQuakeDropDown(fetchedData);\n    quakeItem.renderQuakeList(fetchedData);\n    quakeItem.addInfoMarkers(mainMap, fetchedData);\n  });\n\n}); // end DOMContentLoaded\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers/request.js":
/*!********************************!*\
  !*** ./src/helpers/request.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Request = function(url) {\n this.url = url;\n};\n\nRequest.prototype.get = function(onComplete) {\n const request = new XMLHttpRequest();\n request.open('GET', this.url);\n request.addEventListener('load', function() {\n  if(this.status !== 200) {\n   return;\n }\n\n const responseBody = JSON.parse(this.responseText);\n  onComplete(responseBody);\n });\n request.send();\n};\n\nmodule.exports = Request;\n\n\n//# sourceURL=webpack:///./src/helpers/request.js?");

/***/ }),

/***/ "./src/models/map-wrapper.js":
/*!***********************************!*\
  !*** ./src/models/map-wrapper.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const MapWrapper = function(container, centerStart, zoom) {\n  this.googleMap = new google.maps.Map(container, {\n    center: centerStart,\n    zoom: zoom,\n    mapTypeControl: false,\n    mapTypeId: 'hybrid',\n    // mapTypeId: 'satellite',\n    streetViewControl: false\n  });\n  this.markers = [];\n}; // end MapWrapper constructor\n\n\nMapWrapper.prototype.zoom = function (zoom) {\n   this.googleMap.zoom = zoom;\n }\n\nMapWrapper.prototype.moveToLocation = function (lat, lng) {\n  const newCenter = new google.maps.LatLng(lat, lng);\n  this.googleMap.panTo(newCenter);\n}\n\n// MapWrapper.prototype.addMarker = function (coords) {\n//   const marker = new google.maps.Marker({\n//     map: this.googleMap,\n//     position: coords\n//   });\n//   this.markers.push(marker);\n// };\n\n\nMapWrapper.prototype.addMarkerWithInfo = function (coords, aContentString) {\n  const marker = new google.maps.Marker({\n    map: this.googleMap,\n    position: coords\n  });\n  const contentString = aContentString;\n  const infowindow = new google.maps.InfoWindow({\n    content: contentString\n  });\n  marker.addListener('click', () => {\n    infowindow.open(this.googleMap, marker);\n  });\n}\n\n\nmodule.exports = MapWrapper;\n\n\n//# sourceURL=webpack:///./src/models/map-wrapper.js?");

/***/ }),

/***/ "./src/models/quake-data.js":
/*!**********************************!*\
  !*** ./src/models/quake-data.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Request = __webpack_require__(/*! ../helpers/request.js */ \"./src/helpers/request.js\");\n\nconst QuakeData = function(url) {\n  this.url = url;\n  this.apiData = [];\n  this.tempData = [];\n  this.data = [];\n};\n\nQuakeData.prototype.unixToDate = function (unixTime) {\n  return date = new Date(unixTime);\n};\n\nQuakeData.prototype.getData = function (onComplete) {\n  const request = new Request(this.url);\n  request.get((data) => {\n  //  console.log(data);  // log raw data to see what options I have to pull info.\n    data.features.forEach((feature) => {\n      this.apiData.push(feature);\n    });\n\n    this.tempData = this.apiData.filter((feature) => {\n      return (feature.properties.mag > 4);\n    });\n\n    this.data = this.tempData.map((quake) => {\n      return {\n          title: quake.properties.title,\n          date: this.unixToDate(quake.properties.time),\n          magnitude: quake.properties.mag,\n          lng: quake.geometry.coordinates[0],\n          lat: quake.geometry.coordinates[1],\n          link: quake.properties.url,\n          place: quake.properties.place,\n          coords: { lat: quake.geometry.coordinates[1], lng: quake.geometry.coordinates[0] },\n          infoString: `Earthquake occured on: ${this.unixToDate(quake.properties.time)} </br>${quake.properties.place}.</br>Magnitude: ${quake.properties.mag}.`\n      }\n    });\n\n    onComplete(this.data);\n  }); // end request.get\n}; // end getData\n\nQuakeData.prototype.getQuakeByIndex = function (index) {\n  return this.data[index];\n};\n\n// QuakeData.prototype.populateQuakes = function () {\n//   this.data\n//   quakeItem.renderQuakeDetails(selectedQuake, quakeList);\n// };\n//\n//\nmodule.exports = QuakeData;\n\n\n//# sourceURL=webpack:///./src/models/quake-data.js?");

/***/ }),

/***/ "./src/views/quake-item.js":
/*!*********************************!*\
  !*** ./src/views/quake-item.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Quake list is passed a quake and container, can then use method to populate list and drop down\nconst QuakeItem = function (selectorElement, quakeListContainer) {\n  this.selectorElement = selectorElement;\n  this.quakeListContainer = quakeListContainer;\n};\n\nQuakeItem.prototype.renderQuakeDropDown = function (quakeData) {\n  console.log(quakeData);  // whats coming back from the fetch and being put in to the page\n  quakeData.forEach((quake, index) => {\n    const quakeOption = document.createElement('option');\n    quakeOption.textContent = quake.title;\n    quakeOption.value = index;\n    this.selectorElement.appendChild(quakeOption);\n  });\n};\n\nQuakeItem.prototype.renderQuakeList = function (quakeData) {\n  quakeData.forEach((quake) => {\n    const quakeTitle = document.createElement('li');\n    quakeTitle.classList.add('bold');\n    quakeTitle.textContent = `${quake.place}, Date: ${quake.date}, Magnitude: ${quake.magnitude}` ;\n\n    const quakeDetails = document.createElement('ul');\n      const quakeDate = document.createElement('li');\n      quakeDate.textContent = quake.date;\n      quakeDetails.appendChild(quakeDate);\n    this.quakeListContainer.appendChild(quakeTitle);\n    this.quakeListContainer.appendChild(quakeDetails);\n  });\n};\n\nQuakeItem.prototype.addInfoMarkers = function (mainMap, quakeData) {\n  quakeData.forEach((quake) => {\n    mainMap.addMarkerWithInfo(quake.coords, quake.infoString);\n  });\n};\n\nmodule.exports = QuakeItem;\n\n\n//# sourceURL=webpack:///./src/views/quake-item.js?");

/***/ })

/******/ });