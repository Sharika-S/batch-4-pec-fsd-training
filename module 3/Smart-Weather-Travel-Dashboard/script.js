// ==========================================
// SMART WEATHER & TRAVEL DASHBOARD
// API: Open-Meteo
// No API key required
// ==========================================


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const dateElement = document.getElementById("date");

const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");

const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");

const travelSuggestion =
    document.getElementById("travelSuggestion");

const errorMessage =
    document.getElementById("errorMessage");


// ==========================================
// GET OR CREATE FORECAST CONTAINER
// ==========================================

let forecastContainer =
    document.getElementById("forecastContainer");


if (!forecastContainer) {

    const forecastSection =
        document.querySelector(".forecast-section");

    if (forecastSection) {

        forecastContainer =
            document.createElement("div");

        forecastContainer.id =
            "forecastContainer";

        forecastContainer.className =
            "forecast-container";

        forecastSection.appendChild(
            forecastContainer
        );

    }

}


// ==========================================
// WEATHER INFORMATION
// ==========================================

function getWeatherInfo(code) {

    switch (code) {

        case 0:
            return {
                description: "Clear Sky",
                icon: "☀️"
            };

        case 1:
            return {
                description: "Mainly Clear",
                icon: "🌤️"
            };

        case 2:
            return {
                description: "Partly Cloudy",
                icon: "⛅"
            };

        case 3:
            return {
                description: "Overcast",
                icon: "☁️"
            };

        case 45:
        case 48:
            return {
                description: "Foggy",
                icon: "🌫️"
            };

        case 51:
        case 53:
        case 55:
            return {
                description: "Drizzle",
                icon: "🌦️"
            };

        case 61:
        case 63:
        case 65:
            return {
                description: "Rain",
                icon: "🌧️"
            };

        case 66:
        case 67:
            return {
                description: "Freezing Rain",
                icon: "🌧️"
            };

        case 71:
        case 73:
        case 75:
            return {
                description: "Snow",
                icon: "❄️"
            };

        case 77:
            return {
                description: "Snow Grains",
                icon: "🌨️"
            };

        case 80:
        case 81:
        case 82:
            return {
                description: "Rain Showers",
                icon: "🌦️"
            };

        case 85:
        case 86:
            return {
                description: "Snow Showers",
                icon: "🌨️"
            };

        case 95:
            return {
                description: "Thunderstorm",
                icon: "⛈️"
            };

        case 96:
        case 99:
            return {
                description: "Thunderstorm with Hail",
                icon: "⛈️"
            };

        default:
            return {
                description: "Unknown Weather",
                icon: "🌤️"
            };
    }

}


// ==========================================
// SEARCH BUTTON
// ==========================================

searchBtn.addEventListener("click", function () {

    const city =
        cityInput.value.trim();


    if (city === "") {

        errorMessage.textContent =
            "Please enter a city name.";

        return;

    }


    getWeather(city);

});


// ==========================================
// ENTER KEY
// ==========================================

cityInput.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {

            searchBtn.click();

        }

    }
);


// ==========================================
// GET CITY COORDINATES
// ==========================================

async function getCityCoordinates(city) {

    const url =
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "Unable to connect to weather service."
        );

    }


    const data =
        await response.json();


    if (
        !data.results ||
        data.results.length === 0
    ) {

        throw new Error(
            "City not found. Please enter a valid city name."
        );

    }


    return data.results[0];

}


// ==========================================
// GET WEATHER
// ==========================================

async function getWeather(city) {

    try {

        errorMessage.textContent = "";


        if (travelSuggestion) {

            travelSuggestion.textContent =
                "Loading travel recommendation...";

        }


        if (forecastContainer) {

            forecastContainer.innerHTML =
                "<p>Loading 5-day forecast...</p>";

        }


        // Get location
        const location =
            await getCityCoordinates(city);


        const latitude =
            location.latitude;

        const longitude =
            location.longitude;


        // Open-Meteo API
        const weatherURL =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${latitude}` +
            `&longitude=${longitude}` +
            `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure` +
            `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
            `&temperature_unit=celsius` +
            `&wind_speed_unit=kmh` +
            `&timezone=auto` +
            `&forecast_days=5`;


        const response =
            await fetch(weatherURL);


        if (!response.ok) {

            throw new Error(
                "Unable to get weather information."
            );

        }


        const data =
            await response.json();


        // Display current weather
        displayWeather(
            location,
            data
        );


        // Display forecast
        displayForecast(data);


    } catch (error) {

        console.error(error);


        errorMessage.textContent =
            error.message;


        if (travelSuggestion) {

            travelSuggestion.textContent =
                "Travel suggestion is unavailable.";

        }


        if (forecastContainer) {

            forecastContainer.innerHTML = "";

        }

    }

}


// ==========================================
// DISPLAY CURRENT WEATHER
// ==========================================

function displayWeather(location, data) {

    const current =
        data.current;


    const weatherInfo =
        getWeatherInfo(
            current.weather_code
        );


    // City
    cityName.textContent =
        `${location.name}, ${location.country_code}`;


    // Date
    dateElement.textContent =
        new Date().toDateString();


    // Temperature
    temperature.textContent =
        `${Math.round(current.temperature_2m)}°C`;


    // Description
    weatherDescription.textContent =
        weatherInfo.description;


    // Dynamic weather icon
    const iconContainer =
        document.querySelector(".weather-icon");


    if (iconContainer) {

        iconContainer.innerHTML = `
            <div class="dynamic-weather-icon">
                ${weatherInfo.icon}
            </div>
        `;

    }


    // Humidity
    humidity.textContent =
        `${current.relative_humidity_2m}%`;


    // Wind
    windSpeed.textContent =
        `${Math.round(current.wind_speed_10m)} km/h`;


    // Feels like
    feelsLike.textContent =
        `${Math.round(current.apparent_temperature)}°C`;


    // Pressure
    pressure.textContent =
        `${Math.round(current.surface_pressure)} hPa`;


    // Travel suggestion
    generateTravelSuggestion(
        current.weather_code,
        current.temperature_2m,
        current.wind_speed_10m
    );

}


// ==========================================
// DISPLAY 5-DAY FORECAST
// ==========================================

function displayForecast(data) {

    if (!forecastContainer) {

        console.error(
            "Forecast container not found."
        );

        return;

    }


    forecastContainer.innerHTML = "";


    const daily =
        data.daily;


    for (
        let i = 0;
        i < daily.time.length;
        i++
    ) {

        const date =
            new Date(daily.time[i]);


        const weatherInfo =
            getWeatherInfo(
                daily.weather_code[i]
            );


        const maxTemperature =
            Math.round(
                daily.temperature_2m_max[i]
            );


        const minTemperature =
            Math.round(
                daily.temperature_2m_min[i]
            );


        const rainProbability =
            daily.precipitation_probability_max[i];


        const card =
            document.createElement("div");


        card.className =
            "forecast-card";


        card.innerHTML = `

            <h3>
                ${date.toLocaleDateString(
                    "en-IN",
                    {
                        weekday: "short"
                    }
                )}
            </h3>

            <div class="forecast-icon">
                ${weatherInfo.icon}
            </div>

            <p>
                <strong>
                    ${weatherInfo.description}
                </strong>
            </p>

            <p>
                🌡️ ${maxTemperature}°C /
                ${minTemperature}°C
            </p>

            <p>
                🌧️ Rain: ${rainProbability}%
            </p>

        `;


        forecastContainer.appendChild(card);

    }

}


// ==========================================
// TRAVEL SUGGESTIONS
// ==========================================

function generateTravelSuggestion(
    weatherCode,
    temperatureValue,
    wind
) {

    let suggestion;


    // Thunderstorm
    if (
        weatherCode === 95 ||
        weatherCode === 96 ||
        weatherCode === 99
    ) {

        suggestion =
            "⛈️ Thunderstorms are expected. Avoid outdoor travel and adventure activities. Indoor attractions are recommended.";

    }


    // Rain
    else if (
        (weatherCode >= 51 &&
            weatherCode <= 67) ||
        (weatherCode >= 80 &&
            weatherCode <= 82)
    ) {

        suggestion =
            "🌧️ Rain is expected. Carry an umbrella and waterproof footwear. Museums, cafés, shopping and indoor attractions are good choices.";

    }


    // Snow
    else if (
        weatherCode >= 71 &&
        weatherCode <= 86
    ) {

        suggestion =
            "❄️ Snowy conditions are expected. Carry warm clothes and suitable footwear. Check road conditions before travelling.";

    }


    // Very hot
    else if (
        temperatureValue >= 35
    ) {

        suggestion =
            "🥵 Very hot weather. Avoid outdoor activities during afternoon hours. Stay hydrated and plan sightseeing during morning or evening.";

    }


    // Cold
    else if (
        temperatureValue <= 15
    ) {

        suggestion =
            "🥶 Cold weather. Carry warm clothing and plan a mixture of indoor and outdoor activities.";

    }


    // Strong wind
    else if (
        wind >= 30
    ) {

        suggestion =
            "💨 Strong winds are expected. Avoid boating and other wind-sensitive outdoor activities.";

    }


    // Excellent weather
    else if (
        weatherCode === 0 &&
        temperatureValue >= 20 &&
        temperatureValue <= 32
    ) {

        suggestion =
            "🌞 Excellent weather for travelling! Perfect for sightseeing, photography and outdoor activities.";

    }


    // Cloudy
    else if (
        weatherCode === 1 ||
        weatherCode === 2 ||
        weatherCode === 3
    ) {

        suggestion =
            "☁️ Good weather for travelling. Sightseeing and outdoor activities should be comfortable.";

    }


    // Default
    else {

        suggestion =
            "🌤️ The weather looks reasonable for travel. Check the forecast before planning outdoor activities.";

    }


    if (travelSuggestion) {

        travelSuggestion.textContent =
            suggestion;

    }

}


// ==========================================
// LOAD CHENNAI BY DEFAULT
// ==========================================

getWeather("Chennai");