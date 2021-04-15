function displayTemperature (response) {
    console.log(response.data);
    let cityName = document.querySelector("#city");
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
     icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
}

let apiKey = "02e7aa00c7ab6f28f29780bb9858077e";
let city = "Palm Springs"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q
=${city}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);


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