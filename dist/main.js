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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const cityInput = document.getElementById('city-input');\nconst searchBtn = document.getElementById('search-btn');\nconst img = document.getElementById('img');\nconst city = document.getElementById('city');\nconst description = document.getElementById('description');\nconst temp = document.getElementById('temp');\nconst humidity = document.getElementById('humidity');\nconst changeTempBtn = document.getElementById('change-temp');\nconst weatherDiv = document.getElementById('weather-data');\nconst errorMsg = document.getElementById('error-msg');\nlet tempHolder = 0;\n\nconst displayWeatherData = (data) => {\n  if (data.cod === '200') {\n    errorMsg.classList = 'd-none';\n    img.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;\n    img.style = 'height: 5rem; width: 5rem';\n    city.innerHTML = data.city.name;\n    description.innerHTML = data.list[0].weather[0].description;\n    tempHolder = data.list[0].main.temp;\n    temp.innerHTML = `Temperature: ${data.list[0].main.temp} Celsius`;\n    humidity.innerHTML = `Humidity: ${data.list[0].main.humidity}%`;\n    changeTempBtn.innerHTML = 'Change temperature to Fahrenheit';\n    weatherDiv.classList = '';\n  } else {\n    errorMsg.classList = 'text-danger font-weight-bold ml-3';\n  }\n  cityInput.value = '';\n};\n\nconst getWeatherData = async (cityValue) => {\n  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=52119e88a31d7d889fe0c2dc770ee44b&units=metric&q=${cityValue}`);\n  const weatherJSON = await response.json();\n  await displayWeatherData(weatherJSON);\n};\n\nconst convertTemp = () => {\n  if (changeTempBtn.innerHTML.includes('Fahrenheit')) {\n    tempHolder = (tempHolder * (9 / 5)) + 32;\n    temp.innerHTML = `Temperature: ${tempHolder.toFixed(2)} Fahrenheit`;\n    changeTempBtn.innerHTML = 'Change temperature to Celsius';\n  } else {\n    tempHolder = (tempHolder - 32) * (5 / 9);\n    temp.innerHTML = `Temperature: ${tempHolder.toFixed(2)} Celsius`;\n    changeTempBtn.innerHTML = 'Change temperature to Fahrenheit';\n  }\n};\n\nsearchBtn.addEventListener('click', () => {\n  getWeatherData(cityInput.value);\n});\n\nchangeTempBtn.addEventListener('click', () => {\n  convertTemp();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });