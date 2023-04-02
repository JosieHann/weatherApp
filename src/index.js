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
  let apiKey = "38c802d775c3604b60d030d4f2e1e50c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
searchCity("Pasadena,MD,USA");

function showTemperature(response) {
  const temperature = Math.round(response.data.main.temp);
  const h1 = document.querySelector("#city");
  const temperatureElement = document.querySelector("#temperature");
  const description = document.querySelector("#temperature-description");

  h1.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${temperature}°F`;
  description.innerHTML = response.data.weather[0].description;
}
