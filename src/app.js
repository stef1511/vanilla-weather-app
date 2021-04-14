function displayTemperature (response) {
    console.log(response.data);
    let temperature = Math.round (response.data.main.temp);
    let currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = temperature;
}

let apiKey = "02e7aa00c7ab6f28f29780bb9858077e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q
=London&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);