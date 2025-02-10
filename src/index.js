import './style.css';

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

fetchWeatherData('afghanistan');
