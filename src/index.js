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

const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', () => {
  const searchInput = document.getElementById('search');
  const searchValue = searchInput.value;
  fetchWeatherData(searchValue);
});

async function fetchWeatherData(location = 'london', unitGroup = 'uk') {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=PT7JZF8VMTU9ZYHQWDWUQX3QS`;
    const response = await fetch(url, { mode: 'cors' });
    const weatherData = await response.json();
    const processedWeatherData = processWeatherData(weatherData);
    console.log(processedWeatherData);
    console.log(weatherData);
  } catch (error) {
    console.error(error);
  }
}

function processWeatherData(weatherData) {
  const resolvedAddress = weatherData.resolvedAddress;
  const temperature = weatherData.currentConditions.temp;
  const time = weatherData.currentConditions.datetime;
  const humidity = weatherData.currentConditions.humidity;
  const icon = weatherData.currentConditions.icon;
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
