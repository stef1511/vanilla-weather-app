
let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day} ${hour}:${minutes}`;


function search (city) {
   let apiKey = "02e7aa00c7ab6f28f29780bb9858077e";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q
=${city}&appid=${apiKey}&units=metric`;
   console.log(apiUrl);
   axios.get(apiUrl).then(displayTemperature);

}

function handleSubmit (event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Palm Springs");

function formatDay (timestamp) {
  let date = new Date (timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  return days[day];

}
function displayForecast (response) { 
    let forecast= response.data.daily;
    let forecastElement = document.querySelector("#forecast");
  
      let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index) {
        if (index < 5) {
    forecastHTML = forecastHTML + `
            <div class="col-2">
                <span class= "forecast-day">
                ${formatDay}${forecastDay.dt};
                </span>
              <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
              alt="icon"
              width="48">
             <span class ="forecast-max">
                ${Math.round(forecastDay.temp.max)}°;
                 </span> 
                 <span class ="forecast-min">
                ${Math.round(forecastDay.temp.min)}°;
                 </span>
        </div>`; 
      }

    });
  
    
        forecastHTML = forecastHTML + `</div>`;
        forecastElement.innerHTML = forecastHTML;
  
}


function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "02e7aa00c7ab6f28f29780bb9858077e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}
    &lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  console.log(response.data);
  celsiusTemp = response.data.main.temp;
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = response.data.name;
  let skyCondition = document.querySelector("#description");
  skyCondition.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
getForecast(response.data.coord);
}
