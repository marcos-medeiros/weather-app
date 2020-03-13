const tempSwitch = document.getElementById('temp-switch');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const cityName = document.getElementById('city-name');
const todayMax = document.getElementById('today-max');
const todayMin = document.getElementById('today-min');
const todayFeelsLike = document.getElementById('today-feels-like');
const todayHumidity = document.getElementById('today-humidity');
const errorMsg = document.getElementById('error-msg');
const wrapper = document.getElementById('wrapper');
const initialMsg = document.getElementById('initial-message');

let tempFormat = '°C';

const currentDate = new Date();
const today = currentDate.getDay();

const temperatures = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
};

const highlights = {
  todayMax: 0,
  todayMin: 0,
  todayFeelsLike: 0,
  todayHumidity: 0,
};

const weatherIcons = {
  0: '',
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
};

const weatherDescriptions = {
  0: '',
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
};

const capitalizeFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const translateDay = (dayIndex) => {
  const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  if (dayIndex <= 6) {
    return days[dayIndex];
  }
  return days[dayIndex - 7];
};

const setWeatherData = (data) => {
  if (data.cod === '200') {
    errorMsg.classList = 'd-none';

    highlights.todayMax = data.list[0].main.temp_max.toFixed(1);
    highlights.todayMin = data.list[0].main.temp_min.toFixed(1);
    highlights.todayFeelsLike = data.list[0].main.feels_like.toFixed(1);
    highlights.todayHumidity = data.list[0].main.humidity;

    for (let i = 0; i <= 6; i++) {
      temperatures[i] = data.list[i].main.temp.toFixed(1);
    }

    if (tempFormat === '°F') {
      Object.keys(temperatures).forEach((key) => {
        temperatures[key] = ((temperatures[key] * (9 / 5)) + 32).toFixed(1);
      });

      highlights.todayMax = ((highlights.todayMax * (9 / 5)) + 32).toFixed(1);
      highlights.todayMin = ((highlights.todayMin * (9 / 5)) + 32).toFixed(1);
      highlights.todayFeelsLike = ((highlights.todayFeelsLike * (9 / 5)) + 32).toFixed(1);
    }

    for (let i = 0; i <= 6; i++) {
      weatherIcons[i] = `http://openweathermap.org/img/wn/${data.list[`${i}`].weather[0].icon}.png`;
    }

    for (let i = 0; i <= 6; i++) {
      weatherDescriptions[i] = capitalizeFirst(data.list[i].weather[0].description);
    }

    cityName.innerHTML = `${data.city.name} today`;

    wrapper.classList.remove('d-none');
  } else {
    errorMsg.classList = 'text-danger font-weight-bold mx-auto';
  }
  initialMsg.classList.add('d-none');
  searchInput.value = '';
};

const renderWeatherData = () => {
  for (let i = 0; i <= 6; i++) {
    const dayImg = document.getElementById(`day-${i}-img`);
    const weekDay = document.getElementById(`day-${i}`);
    const dayDescription = document.getElementById(`day-${i}-description`);
    const dayTemp = document.getElementById(`day-${i}-temp`);

    dayImg.src = weatherIcons[i];
    dayDescription.innerHTML = weatherDescriptions[i];
    dayTemp.innerHTML = `${temperatures[`${i}`]} ${tempFormat}`;
    weekDay.innerHTML = translateDay(`${today + i}`);
  }

  todayMax.innerHTML = `${highlights.todayMax} ${tempFormat}`;
  todayMin.innerHTML = `${highlights.todayMin} ${tempFormat}`;
  todayFeelsLike.innerHTML = `${highlights.todayFeelsLike} ${tempFormat}`;
  todayHumidity.innerHTML = `${highlights.todayHumidity}%`;
};

const getWeatherData = async (cityValue) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=52119e88a31d7d889fe0c2dc770ee44b&units=metric&q=${cityValue}`);
  const weatherJSON = await response.json();
  await setWeatherData(weatherJSON);
  await renderWeatherData();
};

searchBtn.addEventListener('click', () => {
  getWeatherData(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getWeatherData(searchInput.value);
  }
});


tempSwitch.addEventListener('click', () => {
  if (tempFormat === '°C') {
    Object.keys(temperatures).forEach((key) => {
      temperatures[key] = ((temperatures[key] * (9 / 5)) + 32).toFixed(1);
    });

    highlights.todayMax = ((highlights.todayMax * (9 / 5)) + 32).toFixed(1);
    highlights.todayMin = ((highlights.todayMin * (9 / 5)) + 32).toFixed(1);
    highlights.todayFeelsLike = ((highlights.todayFeelsLike * (9 / 5)) + 32).toFixed(1);

    tempFormat = '°F';
  } else {
    Object.keys(temperatures).forEach((key) => {
      temperatures[key] = ((temperatures[key] - 32) * (5 / 9)).toFixed(1);
    });

    highlights.todayMax = ((highlights.todayMax - 32) * (5 / 9)).toFixed(1);
    highlights.todayMin = ((highlights.todayMin - 32) * (5 / 9)).toFixed(1);
    highlights.todayFeelsLike = ((highlights.todayFeelsLike - 32) * (5 / 9)).toFixed(1);

    tempFormat = '°C';
  }
  renderWeatherData();
});