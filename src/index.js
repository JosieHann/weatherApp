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
function formatday(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
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
  getForecast(response.data.coordinates);
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

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2c133oabdb09a4tc70345f314f78b4fb";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatday(forecastDay.time)}</div>

        <img
          src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png" alt="Clear"
          id="icons"
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">
            ${Math.round(forecastDay.temperature.maximum)}° </span>
          <span class="weather-forecast-temperature-min">
          ${Math.round(forecastDay.temperature.minimum)}° </span>
        </div>
      </div>
      `;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
