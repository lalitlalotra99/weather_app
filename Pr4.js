 const apiKey = "1d66e46a7306ee61ba1694fcb35e5f42"; // ✅ your API key

    // 🔹 Weather by City Name
    async function getWeather() {
      const city = document.getElementById("cityInput").value.trim();
      const resultDiv = document.getElementById("result");
      const errorDiv = document.getElementById("error");

      resultDiv.innerHTML = "";
      errorDiv.innerHTML = "";

      if (city === "") {
        errorDiv.innerText = "⚠️ Please enter a city name";
        return;
      }

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        displayWeather(data);
      } catch (error) {
        errorDiv.innerText = "❌ Invalid city name. Try again!";
      }
    }

    // 🔹 Weather by Current Location
    function getLocationWeather() {
      const resultDiv = document.getElementById("result");
      const errorDiv = document.getElementById("error");

      resultDiv.innerHTML = "";
      errorDiv.innerHTML = "";

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
            );

            if (!response.ok) throw new Error("Location not found");

            const data = await response.json();
            displayWeather(data);
          } catch (error) {
            errorDiv.innerText = "❌ Unable to fetch weather for your location!";
          }
        }, () => {
          errorDiv.innerText = "⚠️ Location access denied!";
        });
      } else {
        errorDiv.innerText = "❌ Geolocation is not supported by your browser.";
      }
    }

    // 🔹 Common Function to Show Weather
    function displayWeather(data) {
      const resultDiv = document.getElementById("result");
      const temp = data.main.temp;
      const weather = data.weather[0].description;
      resultDiv.innerHTML = `
        🌍 City: <b>${data.name}</b><br>
        🌡 Temperature: <b>${temp}°C</b><br>
        ☁ Weather: <b>${weather}</b>
      `;
    }

