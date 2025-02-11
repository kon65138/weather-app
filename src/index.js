import './style.css';
import clear_day from './imgs/weatherIcons/clear-day.svg';
import clear_night from './imgs/weatherIcons/clear-night.svg';
import cloudy from './imgs/weatherIcons/cloudy.svg';
import fog from './imgs/weatherIcons/fog.svg';
import hail from './imgs/weatherIcons/hail.svg';
import partly_cloudy_day from './imgs/weatherIcons/partly-cloudy-day.svg';
import partly_cloudy_night from './imgs/weatherIcons/partly-cloudy-night.svg';
import rain_snow_showers_day from './imgs/weatherIcons/rain-snow-showers-day.svg';
import rain_snow_showers_night from './imgs/weatherIcons/rain-snow-showers-night.svg';
import rain_snow from './imgs/weatherIcons/rain-snow.svg';
import rain from './imgs/weatherIcons/rain.svg';
import showers_day from './imgs/weatherIcons/showers-day.svg';
import showers_night from './imgs/weatherIcons/showers-night.svg';
import sleet from './imgs/weatherIcons/sleet.svg';
import snow_showers_day from './imgs/weatherIcons/snow-showers-day.svg';
import snow_showers_night from './imgs/weatherIcons/snow-showers-night.svg';
import snow from './imgs/weatherIcons/snow.svg';
import thunder_rain from './imgs/weatherIcons/thunder-rain.svg';
import thunder_showers_day from './imgs/weatherIcons/thunder-showers-day.svg';
import thunder_showers_night from './imgs/weatherIcons/thunder-showers-night.svg';
import thunder from './imgs/weatherIcons/thunder.svg';
import wind from './imgs/weatherIcons/wind.svg';

const iconSvgs = new Map([
  ['clear_day', clear_day],
  ['clear_night', clear_night],
  ['cloudy', cloudy],
  ['fog', fog],
  ['hail', hail],
  ['partly_cloudy_day', partly_cloudy_day],
  ['partly_cloudy_night', partly_cloudy_night],
  ['rain_snow_showers_day', rain_snow_showers_day],
  ['rain_snow_showers_night', rain_snow_showers_night],
  ['rain_snow', rain_snow],
  ['rain', rain],
  ['showers_day', showers_day],
  ['showers_night', showers_night],
  ['sleet', sleet],
  ['snow_showers_day', snow_showers_day],
  ['snow_showers_night', snow_showers_night],
  ['snow', snow],
  ['thunder_rain', thunder_rain],
  ['thunder_showers_day', thunder_showers_day],
  ['thunder_showers_night', thunder_showers_night],
  ['thunder', thunder],
  ['wind', wind],
]);

const searchBtn = document.getElementById('searchBtn');
const loadingDiv = document.querySelector('.loading');
const weatherContentDiv = document.querySelector('.weatherContent');

searchBtn.addEventListener('click', () => {
  const searchInput = document.getElementById('search');
  const searchValue = searchInput.value;
  fetchWeatherData(searchValue).then(() => {
    loadingDiv.style.display = 'none';
  });
  loadingDiv.style.display = 'flex';
  weatherContentDiv.style.display = 'none';
});

async function fetchWeatherData(location = 'london', unitGroup = 'uk') {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=PT7JZF8VMTU9ZYHQWDWUQX3QS`;
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('invalid request (no location found)');
      } else if (response.status === 401) {
        throw new Error('api key unauthorized');
      } else if (response.status === 429) {
        throw new Error('too many requests');
      } else if (response.status === 500) {
        throw new Error('api server error');
      }
    } else {
      const errorSpan = document.querySelector('.error');
      errorSpan.textContent = '';
    }
    const weatherData = await response.json();
    console.log(weatherData);
    const processedWeatherData = processWeatherData(weatherData);
    updateHtml(processedWeatherData);
  } catch (error) {
    const errorSpan = document.querySelector('.error');
    errorSpan.textContent = error;
    console.error(error);
  }
}

function processWeatherData(weatherData) {
  const resolvedAddress = weatherData.resolvedAddress;
  const temperature = weatherData.currentConditions.temp;
  const time = weatherData.currentConditions.datetime;
  const humidity = weatherData.currentConditions.humidity;
  const icon = weatherData.currentConditions.icon.replaceAll('-', '_');
  const conditions = weatherData.currentConditions.conditions;
  const description = weatherData.description;
  const windspeed = weatherData.currentConditions.windspeed;
  const precipitation = weatherData.currentConditions.precipprob;

  return {
    address: resolvedAddress,
    temp: temperature,
    currentTime: time,
    currentHumidity: humidity,
    weatherIcon: icon,
    currentCondition: conditions,
    overallDesciption: description,
    currentWindSpeed: windspeed,
    precipitationProbability: precipitation,
  };
}

function updateHtml(data) {
  const location = document.querySelector('.location');
  const time = document.querySelector('.time');
  const icon = document.getElementById('iconSvg');
  const temperature = document.querySelector('.temp');
  const conditions = document.querySelector('.conditions');
  const humidity = document.querySelector('.humidity .value');
  const windspeed = document.querySelector('.windspeed .value');
  const precipitation = document.querySelector('.precipitation .value');
  const description = document.querySelector('.generalOverview');

  location.textContent = data.address;
  time.textContent = `time of report: ${data.currentTime} (local time)`;
  icon.setAttribute('src', iconSvgs.get(data.weatherIcon));
  temperature.textContent = `${data.temp}°c`;
  conditions.textContent = data.currentCondition;
  humidity.textContent = `${data.currentHumidity}%`;
  windspeed.textContent = `${data.currentWindSpeed}mph`;
  precipitation.textContent = `${data.precipitationProbability}%`;
  description.textContent = data.overallDesciption;

  weatherContentDiv.style.display = 'flex';
}
