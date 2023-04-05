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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}
searchCity("Pasadena, Maryland, Usa");
function showTemperature(response) {
  console.log(response);
  const temperature = Math.round(response.data.temperature.current);
  const h1 = document.querySelector("#city");
  const temperatureElement = document.querySelector("#temperature");
  const description = document.querySelector("#temperature-description");
  h1.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${temperature}°F`;
  description.innerHTML = response.data.condition.description;
}
