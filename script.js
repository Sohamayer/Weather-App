const apiKey = "578164c1d0c7839557267efa9d7305cb";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const bgVideo = document.getElementById("bg-video");
 
// Default background video
bgVideo.src = "videos/default.mp4";

bgVideo.onerror = () => {
  document.body.style.background = "#121212";
};

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod === 200) {
      const weather = data.weather[0].main.toLowerCase();
      const temp = data.main.temp;
      const description = data.weather[0].description;

      weatherResult.innerHTML = `
        <h1>${data.name}</h1><br />
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon" />
        <h3>${description}</h3><br />
        <h3>${temp} °C</h3>
      `;

      updateBackground(weather);
    } else {
      weatherResult.innerHTML = `<p>City not found!</p>`;
      bgVideo.src = "videos/default.mp4";
    }
  } catch (error) {
    console.error(error);
    weatherResult.innerHTML = `<p>Error fetching data</p>`;
    bgVideo.src = "videos/default.mp4";
  }
}

function updateBackground(weather) {
  const weatherMap = {
    clear: "videos/sunny-day.mp4",
    clouds: "videos/cloudy-sky.mp4",
    rain: "videos/rain.mp4",
    snow: "videos/snow.mp4",
    thunderstorm: "videos/thunderstorm.mp4",
    fog: "videos/fog.mp4",
  };

  const videoSrc = weatherMap[weather] || "videos/default.mp4";
  bgVideo.src = videoSrc;
}