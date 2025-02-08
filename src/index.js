import './style.css';

async function fetchWeatherData(location = 'london', unitGroup = 'uk') {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=PT7JZF8VMTU9ZYHQWDWUQX3QS`;
  const response = await fetch(url, { mode: 'cors' });
  const weatherData = await response.json();
  console.log(weatherData);
}

fetchWeatherData();
