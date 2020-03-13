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

eval("const tempSwitch = document.getElementById('temp-switch');\nconst searchInput = document.getElementById('search-input');\nconst searchBtn = document.getElementById('search-button');\nconst cityName = document.getElementById('city-name');\nconst todayMax = document.getElementById('today-max');\nconst todayMin = document.getElementById('today-min');\nconst todayFeelsLike = document.getElementById('today-feels-like');\nconst todayHumidity = document.getElementById('today-humidity');\nconst errorMsg = document.getElementById('error-msg');\nconst weatherToday = document.getElementById('weather-info');\nconst wrapper = document.getElementById('wrapper');\nconst initialMsg = document.getElementById('initial-message');\n\nlet tempFormat = '°C';\n\nlet currentDate = new Date();\nlet today = currentDate.getDay();\n\nlet temperatures = {\n  0: 0,\n  1: 0,\n  2: 0,\n  3: 0,\n  4: 0,\n  5: 0,\n  6: 0,\n};\n\nlet highlights = {\n  todayMax: 0,\n  todayMin: 0,\n  todayFeelsLike: 0,\n  todayHumidity: 0,\n}\n\nlet weatherIcons = {\n  0: '',\n  1: '',\n  2: '',\n  3: '',\n  4: '',\n  5: '',\n  6: '',\n};\n\nlet weatherDescriptions = {\n  0: '',\n  1: '',\n  2: '',\n  3: '',\n  4: '',\n  5: '',\n  6: '',\n};\n\nconst capitalizeFirst = (string) => {\n  return string.charAt(0).toUpperCase() + string.slice(1);\n};\n\nconst setWeatherData = (data) => {\n  if (data.cod === '200') {\n\n    errorMsg.classList = 'd-none';\n\n    highlights['todayMax'] = data.list[0].main.temp_max.toFixed(1);\n    highlights['todayMin'] = data.list[0].main.temp_min.toFixed(1);\n    highlights['todayFeelsLike'] = data.list[0].main.feels_like.toFixed(1);\n    highlights['todayHumidity'] = data.list[0].main.humidity;\n\n    for (let i = 0; i <= 6; i++) {\n      temperatures[i] = data.list[i].main.temp.toFixed(1);\n    };\n\n    if (tempFormat === '°F') {\n      Object.keys(temperatures).forEach((key) => {\n        temperatures[key] = ((temperatures[key] * (9 / 5)) + 32).toFixed(1);\n      });\n\n      highlights['todayMax'] = ((highlights['todayMax'] * (9 / 5)) + 32).toFixed(1);\n      highlights['todayMin'] = ((highlights['todayMin'] * (9 / 5)) + 32).toFixed(1);\n      highlights['todayFeelsLike'] = ((highlights['todayFeelsLike'] * (9 / 5)) + 32).toFixed(1);\n\n    }\n\n    for (let i = 0; i <= 6; i++) {\n      weatherIcons[i] = `http://openweathermap.org/img/wn/${data.list[`${i}`].weather[0].icon}.png`;\n    };\n\n    for (let i = 0; i <= 6; i++) {\n      weatherDescriptions[i] = capitalizeFirst(data.list[i].weather[0].description);\n    };\n\n    cityName.innerHTML = data.city.name + ' today';\n\n    wrapper.classList.remove('d-none');\n\n  } else {\n\n    errorMsg.classList = 'text-danger font-weight-bold mx-auto';\n  }\n  initialMsg.classList.add(\"d-none\");\n  searchInput.value = '';\n};\n\nconst renderWeatherData = () => {\n\n  for (let i = 0; i <= 6; i++) {\n    let dayImg = document.getElementById(`day-${i}-img`);\n    let weekDay = document.getElementById(`day-${i}`);\n    let dayDescription = document.getElementById(`day-${i}-description`);\n    let dayTemp = document.getElementById(`day-${i}-temp`);\n\n    dayImg.src = weatherIcons[i];\n    dayDescription.innerHTML = weatherDescriptions[i];\n    dayTemp.innerHTML = `${temperatures[`${i}`]} ${tempFormat}`;\n    weekDay.innerHTML = translateDay(`${today + i}`);\n  }\n\n  todayMax.innerHTML = `${highlights['todayMax']} ${tempFormat}`;\n  todayMin.innerHTML = `${highlights['todayMin']} ${tempFormat}`;\n  todayFeelsLike.innerHTML = `${highlights['todayFeelsLike']} ${tempFormat}`;\n  todayHumidity.innerHTML = `${highlights['todayHumidity']}%`;\n\n};\n\nconst getWeatherData = async (cityValue) => {\n  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=52119e88a31d7d889fe0c2dc770ee44b&units=metric&q=${cityValue}`);\n  const weatherJSON = await response.json();\n  await setWeatherData(weatherJSON);\n  await renderWeatherData();\n};\n\nsearchBtn.addEventListener('click', () => {\n  getWeatherData(searchInput.value);\n});\n\nsearchInput.addEventListener('keypress', (e) => {\n  if (e.key === 'Enter') {\n    getWeatherData(searchInput.value);\n  }\n});\n\nconst translateDay = (dayIndex) => {\n  const days = {\n    0: 'Sunday',\n    1: 'Monday',\n    2: 'Tuesday',\n    3: 'Wednesday',\n    4: 'Thursday',\n    5: 'Friday',\n    6: 'Saturday',\n  };\n  if (dayIndex <= 6) {\n    return days[dayIndex];\n  } else {\n    return days[dayIndex - 7];\n  };\n};\n\n\ntempSwitch.addEventListener('click', () => {\n\n  if (tempFormat === '°C') {\n    Object.keys(temperatures).forEach((key) => {\n      temperatures[key] = ((temperatures[key] * (9 / 5)) + 32).toFixed(1);\n    });\n\n    highlights['todayMax'] = ((highlights['todayMax'] * (9 / 5)) + 32).toFixed(1);\n    highlights['todayMin'] = ((highlights['todayMin'] * (9 / 5)) + 32).toFixed(1);\n    highlights['todayFeelsLike'] = ((highlights['todayFeelsLike'] * (9 / 5)) + 32).toFixed(1);\n\n    tempFormat = '°F';\n\n  } else {\n\n    Object.keys(temperatures).forEach((key) => {\n      temperatures[key] = ((temperatures[key] - 32) * (5 / 9)).toFixed(1);\n    });\n\n    highlights['todayMax'] = ((highlights['todayMax'] - 32) * (5 / 9)).toFixed(1);\n    highlights['todayMin'] = ((highlights['todayMin'] - 32) * (5 / 9)).toFixed(1);\n    highlights['todayFeelsLike'] = ((highlights['todayFeelsLike'] - 32) * (5 / 9)).toFixed(1);\n\n    tempFormat = '°C';\n  }\n  renderWeatherData();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });