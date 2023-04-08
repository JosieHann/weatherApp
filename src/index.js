function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;

  searchCity(cityInput.value);
}
let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", search);

function searchCity(city) {
  let apiKey = "2c133oabdb09a4tc70345f314f78b4fb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial&metric`;
  axios.get(apiUrl).then(showTemperature);
}
searchCity("Pasadena,Maryland,Usa");
function showTemperature(response) {
  console.log(response);
  const temperature = Math.round(response.data.temperature.current);
  const h1 = document.querySelector("#city");
  const windSpeed = response.data.wind.speed;
  const windUnit = "mph";
  const windElement = document.querySelector("#wind");
  const humidityElement = document.querySelector("#humidity");
  const temperatureElement = document.querySelector("#temperature");
  const description = document.querySelector("#description");
  const icon = response.data.condition.icon;
  const displayIcon = document.querySelector("#icon");
  displayIcon.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`
  );

  h1.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${temperature}°F`;
  windElement.innerHTML = `Wind: ${windSpeed} ${windUnit}`;
  description.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  fahrenheitTemperature = response.data.temperature.current;
}
let fahrenheitTemperature = null;

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);
