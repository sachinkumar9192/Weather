async function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const weatherResult = document.getElementById("weatherResult");

  if (!location) {
    weatherResult.innerHTML = "<p>Please enter a location.</p>";
    return;
  }

  try {
    console.log("Searching weather for:", location);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=Enter_your_API`
    );
    const data = await response.json();

    if (data.cod === "404") {
      weatherResult.innerHTML = "<p>Location not found.</p>";
      return;
    }

    const temp = data.main.temp;
    const city = data.name;
    const country = data.sys.country;

    weatherResult.innerHTML = `
      <div class="temp">${temp}°C</div>
      <div class="location">${city}, ${country}</div>
    `;
  } catch (error) {
    weatherResult.innerHTML = "<p>Failed to fetch weather data.</p>";
    console.error(error);
  }
}

