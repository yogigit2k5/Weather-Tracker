const API_KEY = "7e75caf90525cfec824355a26aeabe3b";

const searchForm = document.querySelector("#weatherform");
const cityInput = document.querySelector("#city-input");
const displayArea = document.querySelector(".info");
const cityList = document.querySelector("#city-list");

// Load history from local storage
let visitedCities = JSON.parse(localStorage.getItem("visitedCities")) || [];

// Function to refresh the history list on screen
function showHistory() {
    cityList.innerHTML = "";
    visitedCities.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        cityList.appendChild(li);
    });
}

// Main function to get weather
async function getWeatherData(cityName) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            // Success: Update the UI
            displayArea.innerHTML = `
                <p><strong>City:</strong> ${data.name}</p>
                <p><strong>Temp:</strong> ${(data.main.temp - 273.15).toFixed(1)}°C</p>
                <p><strong>Condition:</strong> ${data.weather[0].main}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            `;

            // Save to history if not already there
            if (!visitedCities.includes(data.name)) {
                visitedCities.push(data.name);
                localStorage.setItem("visitedCities", JSON.stringify(visitedCities));
                showHistory();
            }
        } else {
            displayArea.innerHTML = `<p style="color:red">Error: ${data.message}</p>`;
        }
    } catch (err) {
        console.log("Fetch Error:", err);
    }
}

// Listen for form submission
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = cityInput.value;
    getWeatherData(city);
});

// Run this when page loads
showHistory();