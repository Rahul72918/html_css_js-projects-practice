const APIid = "79575b0bac4c2ec6fda703466ce8b639";
const APIurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const geolocationAPIurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat=";

const search = document.querySelector('#searchBar');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('#weather-icon');
const temp = document.querySelector('.temperature');
const city = document.querySelector('.city');
const humidity = document.querySelector('.percentage');
const wind = document.querySelector('.speed');
const day = document.querySelector('#type');


function getLocationWeather(lat, lon) {
    fetch(geolocationAPIurl + lat + "&lon=" + lon + `&appid=${APIid}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error("Error fetching weather for location:", error));
}


function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getLocationWeather(lat, lon);
        }, (error) => {
            console.error("Error getting location:", error);
            city.innerHTML = "Location access denied";
        });
    } else {
        city.innerHTML = "Geolocation not supported by browser";
    }
}


function displayWeather(data) {
    console.log(data);
    temp.innerHTML = Math.round(data.main.temp) + '°C';
    city.innerHTML = data.name;
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + "km/h";

    switch (data.weather[0].main) {
        case "Clouds":
            weatherIcon.src = "images/clouds.png";
            break;
        case "Clear":
            weatherIcon.src = "images/clear.png";
            break;
        case "Drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
        case "Rain":
            weatherIcon.src = "images/rain.png";
            break;
        case "Snow":
            weatherIcon.src = "images/snow.png";
            break;
        case "Mist":
            weatherIcon.src = "images/mist.png";
            break;
        case "Haze":
            weatherIcon.src = "images/haze.png";
            break;
        default:
            weatherIcon.src = "images/default.png";
    }

    day.innerHTML = data.weather[0].main;
}


function checkWeather(cityName) {
    fetch(APIurl + cityName + `&appid=${APIid}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    weatherIcon.src = "images/not-found-location.webp";
                    temp.innerHTML = 'City not found';
                    city.innerHTML = "Please check the spellings";
                    humidity.innerHTML = 0;
                    wind.innerHTML = 0;
                }
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}


search.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkWeather(search.value);
    }
});
searchBtn.addEventListener("click", () => {
    checkWeather(search.value);
});


getCurrentLocation();
