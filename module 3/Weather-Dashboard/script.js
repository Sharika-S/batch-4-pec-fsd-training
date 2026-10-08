// ==========================================
// WEATHER DASHBOARD
// Open-Meteo API - No API Key Required
// ==========================================


// Get weather when Search button is clicked
async function getWeather() {

    const cityInput = document.getElementById("cityInput");
    const errorMessage = document.getElementById("errorMessage");

    const city = cityInput.value.trim();


    // Check empty input
    if (city === "") {

        errorMessage.textContent = "Please enter a city name.";
        errorMessage.style.display = "block";

        return;
    }


    try {

        // Hide previous error
        errorMessage.style.display = "none";


        // ==========================================
        // STEP 1: Find city coordinates
        // ==========================================

        const locationURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;


        const locationResponse = await fetch(locationURL);


        if (!locationResponse.ok) {
            throw new Error("Unable to find city.");
        }


        const locationData = await locationResponse.json();


        // Check if city exists
        if (!locationData.results || locationData.results.length === 0) {

            throw new Error("City not found");
        }


        // Get location information
        const location = locationData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        const cityName = location.name;

        const country = location.country;


        // ==========================================
        // STEP 2: Get Weather
        // ==========================================

        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;


        const weatherResponse = await fetch(weatherURL);


        if (!weatherResponse.ok) {
            throw new Error("Unable to get weather data.");
        }


        const weatherData = await weatherResponse.json();


        const currentWeather = weatherData.current;


        // ==========================================
        // STEP 3: Display City
        // ==========================================

        document.getElementById("cityName").textContent =
            `${cityName}, ${country}`;


        // ==========================================
        // STEP 4: Display Temperature
        // ==========================================

        document.getElementById("temperature").textContent =
            `${Math.round(currentWeather.temperature_2m)} °C`;


        // ==========================================
        // STEP 5: Weather Description
        // ==========================================

        const weatherInfo =
            getWeatherDescription(currentWeather.weather_code);


        document.getElementById("description").textContent =
            weatherInfo.description;


        // ==========================================
        // STEP 6: Weather Icon
        // ==========================================

        document.getElementById("weatherIcon").textContent =
            weatherInfo.icon;


        // ==========================================
        // STEP 7: Humidity
        // ==========================================

        document.getElementById("humidity").textContent =
            `${currentWeather.relative_humidity_2m}%`;


        // ==========================================
        // STEP 8: Wind Speed
        // ==========================================

        document.getElementById("wind").textContent =
            `${currentWeather.wind_speed_10m} km/h`;


        // ==========================================
        // STEP 9: Feels Like
        // ==========================================

        document.getElementById("feelsLike").textContent =
            `${Math.round(currentWeather.apparent_temperature)} °C`;


    } catch (error) {

        console.error("Weather Error:", error);


        // Show error message
        errorMessage.textContent =
            "City not found. Please enter a valid city name.";

        errorMessage.style.display = "block";


        // Reset weather information
        document.getElementById("cityName").textContent =
            "City";

        document.getElementById("temperature").textContent =
            "-- °C";

        document.getElementById("description").textContent =
            "Weather condition";

        document.getElementById("humidity").textContent =
            "--%";

        document.getElementById("wind").textContent =
            "-- km/h";

        document.getElementById("feelsLike").textContent =
            "-- °C";

        document.getElementById("weatherIcon").textContent =
            "🌤️";
    }
}


// ==========================================
// WEATHER CODE FUNCTION
// ==========================================

function getWeatherDescription(code) {

    if (code === 0) {

        return {
            description: "Clear sky",
            icon: "☀️"
        };

    }

    if (code === 1 || code === 2) {

        return {
            description: "Partly cloudy",
            icon: "🌤️"
        };

    }

    if (code === 3) {

        return {
            description: "Overcast",
            icon: "☁️"
        };

    }

    if (code === 45 || code === 48) {

        return {
            description: "Foggy",
            icon: "🌫️"
        };

    }

    if (
        code === 51 ||
        code === 53 ||
        code === 55
    ) {

        return {
            description: "Drizzle",
            icon: "🌦️"
        };

    }

    if (
        code === 61 ||
        code === 63 ||
        code === 65
    ) {

        return {
            description: "Rain",
            icon: "🌧️"
        };

    }

    if (
        code === 71 ||
        code === 73 ||
        code === 75
    ) {

        return {
            description: "Snow",
            icon: "❄️"
        };

    }

    if (
        code === 80 ||
        code === 81 ||
        code === 82
    ) {

        return {
            description: "Rain showers",
            icon: "🌦️"
        };

    }

    if (
        code === 95 ||
        code === 96 ||
        code === 99
    ) {

        return {
            description: "Thunderstorm",
            icon: "⛈️"
        };

    }


    return {
        description: "Unknown weather",
        icon: "🌤️"
    };
}