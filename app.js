const API_KEY = "baf69e063b0112f961456952c7b4a934";

const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');
const cityNameElem = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  weatherResult.classList.add('hide');
  errorMessage.classList.add('hide');
  errorMessage.textContent = '';
  
  try {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error("City not found");
    }

    const data = await res.json();

    cityNameElem.textContent = `${data.name}, ${data.sys.country}`;
    weatherDescription.textContent = capitalizeFirstLetter(data.weather[0].description);
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    temperature.textContent = Math.round(data.main.temp);
    humidity.textContent = data.main.humidity;

    setAnimatedBackground(data.weather[0].main);
    weatherResult.classList.remove('hide');
  } catch (err) {
    errorMessage.textContent = err.message === "City not found" ? 
      "City not found. Please try another one." : "Something went wrong. Please try again.";
    errorMessage.classList.remove('hide');
  }
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function setAnimatedBackground(weatherMain) {
  const body = document.body;
  const weatherClass = weatherMain.toLowerCase();

  body.className = ''; 

  const validClasses = ['clear', 'rain', 'clouds', 'snow', 'thunderstorm', 'drizzle', 'mist', 'fog', 'haze'];
  if (validClasses.includes(weatherClass)) {
    body.classList.add(weatherClass);
  } else {
    body.classList.add('default');
  }
}
