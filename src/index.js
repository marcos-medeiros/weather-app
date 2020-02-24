const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const img = document.getElementById('img');
const city = document.getElementById('city');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const changeTempBtn = document.getElementById('change-temp');
const weatherDiv = document.getElementById('weather-data');
const errorMsg = document.getElementById('error-msg');
let tempHolder = 0;

const displayWeatherData = (data) => {
  if (data.cod === '200') {
    errorMsg.classList = 'd-none';
    img.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
    img.style = 'height: 5rem; width: 5rem';
    city.innerHTML = data.city.name;
    description.innerHTML = data.list[0].weather[0].description;
    tempHolder = data.list[0].main.temp;
    temp.innerHTML = `Temperature: ${data.list[0].main.temp} Celsius`;
    humidity.innerHTML = `Humidity: ${data.list[0].main.humidity}%`;
    changeTempBtn.innerHTML = 'Change temperature to Fahrenheit';
    weatherDiv.classList = '';
  } else {
    errorMsg.classList = 'text-danger font-weight-bold ml-3';
  }
  cityInput.value = '';
};

const getWeatherData = async (cityValue) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=52119e88a31d7d889fe0c2dc770ee44b&units=metric&q=${cityValue}`);
  const weatherJSON = await response.json();
  await displayWeatherData(weatherJSON);
};

const convertTemp = () => {
  if (changeTempBtn.innerHTML.includes('Fahrenheit')) {
    tempHolder = (tempHolder * (9 / 5)) + 32;
    temp.innerHTML = `Temperature: ${tempHolder.toFixed(2)} Fahrenheit`;
    changeTempBtn.innerHTML = 'Change temperature to Celsius';
  } else {
    tempHolder = (tempHolder - 32) * (5 / 9);
    temp.innerHTML = `Temperature: ${tempHolder.toFixed(2)} Celsius`;
    changeTempBtn.innerHTML = 'Change temperature to Fahrenheit';
  }
};

searchBtn.addEventListener('click', () => {
  getWeatherData(cityInput.value);
});

changeTempBtn.addEventListener('click', () => {
  convertTemp();
});