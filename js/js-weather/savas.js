const apiKey = "8968623caa601a355818c519228e880b";
const form = document.getElementById("form");
const buttonCity = document.getElementById("buttonCity");
const inputCity = document.getElementById("inputCity");
const weatherDiv = document.getElementById("weather");
const iconDiv = document.getElementById("icon");
const temperatureDiv = document.getElementById("temprature");
const descriptionDiv = document.getElementById("description");
const detailsDiv = document.getElementById("details");

buttonCity.addEventListener("click", (e) => {
  e.preventDefault();

  const cityValue = inputCity.value;
  GetCity(cityValue);
});

async function GetCity(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const icon = data.weather[0].icon;
    const details = [
      `Feels Like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidirt}%`,
      `Speed: ${data.wind.speed} m/s`,
    ];

    iconDiv.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    temperatureDiv.textContent = `${temperature}`;

    let detailsNew = details.map((detail) => `<div>${detail}</div>`);

    descriptionDiv.textContent = '';

    detailsDiv.innerHTML = detailsNew;
  } catch (error) {
    iconDiv.innerHTML = '';
    temperatureDiv.textContent = '';
    descriptionDiv.textContent = 'Please enter a valid location';
    detailsDiv.innerHTML = '';
  }
}
