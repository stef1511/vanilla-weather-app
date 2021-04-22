
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

function displayForecast () {
    let forecastElement = document.querySelector("#forecast");
   
    let days = ["Fri", "Sat", "Sun", "Mon"];
      let forecastHTML = `<div class="row">`;
    days.forEach(function(day){
        

    forecastHTML = forecastHTML + `
            <div class="col-2">
                <span class= "forecast-day">
                ${day}
                </span>
              <img src="https://openweathermap.org/img/wn/01d@2x.png" 
              alt="icon"
              width="48">
             <span class ="forecast-max">
                 15° 
                 </span> 
                 <span class ="forecast-min">
                   12°
                 </span>
        </div>`;

    });
       
        forecastHTML = forecastHTML + `</div>`;
        forecastElement.innerHTML = forecastHTML;

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
  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = `${response.data.main.pressure} mb`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

displayForecast();

function displayFahrenheit(event) {
    event.preventDefault();
    let fahrenheitTemp = Math.round((celsiusTemp * 9)/5 + 32);
   // remove active class from celsius link and make fahrenheit active link
    celsius.classList.remove("active");
    fahrenheit.classList.add("active");

    let temperatureDisplay = document.querySelector("#current-temperature");
    temperatureDisplay.innerHTML = fahrenheitTemp;
}

let celsiusTemp = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit)

function displayCelsius (event) {
    event.preventDefault();
    // make celsius active class and fahrenheit link non-active
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
   let temperatureDisplay = document.querySelector("#current-temperature");
   temperatureDisplay.innerHTML= Math.round(celsiusTemp);
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);