const API_KEY = "7e75caf90525cfec824355a26aeabe3b";

const searchForm = document.querySelector("#weatherform");
const cityInput = document.querySelector("#city-input");
const infoDisplay = document.querySelector("#info-display");
const cityList = document.querySelector("#city-list");
const eventLog = document.querySelector("#event-log");

let visitedCities = [];

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = cityInput.value;


    eventLog.innerHTML = "";

  
    const p1 = document.createElement("p");
    p1.innerHTML = "<span style='color: #58a6ff'>1. Script Started (Sync)</span>";
    eventLog.appendChild(p1);

    try {
   
        const p2 = document.createElement("p");
        p2.innerHTML = "<span style='color: #ffa657'>2. Fetching Data... (Async)</span>";
        eventLog.appendChild(p2);

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();

        if (data.cod === 200) {
            const temp = (data.main.temp - 273.15).toFixed(1);
               infoDisplay.innerHTML = `
                <div class="data-row"><strong>City:</strong> ${data.name}</div>
                <div class="data-row"><strong>Temp:</strong> ${temp}°C</div>
                <div class="data-row"><strong>Weather:</strong> ${data.weather[0].main}</div>
                <div class="data-row"><strong>Humidity:</strong> ${data.main.humidity}%</div>
                <div class="data-row"><strong>Wind:</strong> ${data.wind.speed} m/s</div>
            `;

        
            if (!visitedCities.includes(data.name)) {
                visitedCities.push(data.name);
                
          
                const tag = document.createElement("div");
                tag.className = "history-item";
                tag.textContent = data.name;
                cityList.appendChild(tag);
                
          
                localStorage.setItem("visitedCities", JSON.stringify(visitedCities));
            }
        } else {
            infoDisplay.innerHTML = "<p style='color:red'>City not found!</p>";
        }

        const p3 = document.createElement("p");
        p3.innerHTML = "<span style='color: #ffa657'>3. Data Received (Microtask)</span>";
        eventLog.appendChild(p3);

    } catch (error) {
        console.log("Error:", error);
    }

    setTimeout(() => {
        const p4 = document.createElement("p");
        p4.innerHTML = "<span style='color: #ffa657'>4. Timer Finished (Macrotask)</span>";
        eventLog.appendChild(p4);
    }, 0);


    const p5 = document.createElement("p");
    p5.innerHTML = "<span style='color: #58a6ff'>5. Script Ended (Sync)</span>";
    eventLog.appendChild(p5);
});