function fetchWeather() {
    let city = document.getElementById("city-input").value;
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    const apiKey = "2f031eeb14994b4ba7c82513252602";
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("temperature").innerText = `🌡 ${data.current.temp_c}°C`;
            document.getElementById("humidity").innerText = `💧 Humidity: ${data.current.humidity}%`;

            
            let localTime = data.location.localtime;
            let dateObj = new Date(localTime.replace(" ", "T"));
            let hours = dateObj.getHours();
            let minutes = dateObj.getMinutes();
            let ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            let formattedTime = `${hours}:${minutes} ${ampm}`;

            document.getElementById("date-time").innerText = `📅 ${data.location.localtime.split(" ")[0]} 🕒 ${formattedTime}`;
            
            let weatherIcon = document.getElementById("weather-icon");
            weatherIcon.src = data.current.condition.icon;
            weatherIcon.style.display = "block"; 
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("City not found! Please enter a valid city.");
        });
}

