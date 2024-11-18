const apiKey = "238f8af77c50703da1b18e7fa13a0022";

document.getElementById("weather-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = document.getElementById("city-input").value.trim();
    const weatherInfo = document.getElementById("weather-info");
    const errorMessage = document.getElementById("error-message");

    weatherInfo.classList.add("hidden");
    errorMessage.classList.add("hidden");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
        document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        weatherInfo.classList.remove("hidden");
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
    }
});
