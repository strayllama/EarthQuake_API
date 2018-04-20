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

eval("const QuakeView = __webpack_require__(/*! ./views/quake-view.js */ \"./src/views/quake-view.js\")\nconst QuakeData = __webpack_require__(/*! ./models/quake-data.js */ \"./src/models/quake-data.js\")\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2018-04-18&endtime=2018-04-20`;\n\n  const quakeSelect = document.getElementById('quake-select');\n  const quakeContainer = document.getElementById('quake-container');\n\n  const quakeView = new QuakeView(quakeSelect, quakeContainer);\n  const quakeData = new QuakeData(url);\n\n  quakeSelect.addEventListener('change', (event) => {\n    const selectedQuakeIndex = event.target.value;\n    const selectedQuake = quakeData.getQuakeByIndex(selectedQuakeIndex);\n    quakeView.renderDetail(selectedQuake);\n  });\n\n  quakeData.getData((data) => {\n    quakeView.renderSelect(data)\n  });\n\n\n}); // end DOMContentLoaded\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers/request.js":
/*!********************************!*\
  !*** ./src/helpers/request.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Request = function(url) {\n this.url = url;\n};\n\nRequest.prototype.get = function(onComplete) {\n const request = new XMLHttpRequest();\n request.open('GET', this.url);\n request.addEventListener('load', function() {\n  if(this.status !== 200) {\n   return;\n }\n\n const responseBody = JSON.parse(this.responseText);\n  onComplete(responseBody);\n });\n request.send();\n};\n\nmodule.exports = Request;\n\n\n//# sourceURL=webpack:///./src/helpers/request.js?");

/***/ }),

/***/ "./src/models/quake-data.js":
/*!**********************************!*\
  !*** ./src/models/quake-data.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Request = __webpack_require__(/*! ../helpers/request.js */ \"./src/helpers/request.js\");\n\nconst QuakeData = function(url) {\n  this.url = url;\n  this.fullData = [];\n  this.myData = [];\n}\n\nQuakeData.prototype.unixToDate = function (unixTime) {\n  return date = new Date(unixTime * 1000);\n};\n\nQuakeData.prototype.getData = function (onComplete) {\n  const request = new Request(this.url);\n  request.get((data) => {\n    console.log(data);\n    data.features.forEach((feature) => {\n      this.fullData.push(feature);\n    });\n    this.myData = this.fullData.map((feature) => {\n\n      return {\n        title: feature.properties.title,\n        date: this.unixToDate(feature.properties.time),\n        latlong: feature.geometry.coordinates\n\n      }\n    });\n    onComplete(this.myData);\n  });\n};\n\n\nmodule.exports = QuakeData;\n\n\n//# sourceURL=webpack:///./src/models/quake-data.js?");

/***/ }),

/***/ "./src/views/quake-view.js":
/*!*********************************!*\
  !*** ./src/views/quake-view.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const QuakeView = function (selectElement, quakeContainer) {\n  this.selectElement = selectElement;\n  this.quakeContainer = quakeContainer;\n};\n\nQuakeView.prototype.renderSelect = function (quakeData) {\n  console.log(quakeData);\n  // quakeData.forEach((quake, index) => {\n  //   const QuakeOption = document.createElement('option');\n  //   quakeOption.textContent = quake.name;\n  //   quakeOption.value = index;\n  //   this.selectElement.appendChild(quakeOption);\n  // });\n};\n\n\nQuakeView.prototype.renderDetail = function (quake) {\n  const quakeTitle = document.createElement('p');\n  quakeTitle.textContent = quake.title;\n  this.quakeContainer.appendChild(quakeTitle);\n};\n\n\n\nmodule.exports = QuakeView;\n\n\n//# sourceURL=webpack:///./src/views/quake-view.js?");

/***/ })

/******/ });