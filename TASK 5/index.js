const apiKey = '0726eba93ed18d04f6fd783ed1ba1ddb';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

function displayWeather(data) {
    document.getElementById('location-name').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('weather-description').innerText = data.weather[0].description;
    document.getElementById('temperature').innerText = (data.main.temp - 273.15).toFixed(1); // Kelvin to Celsius
    document.getElementById('humidity').innerText = data.main.humidity;
    document.getElementById('wind-speed').innerText = data.wind.speed;

    document.getElementById('weather-display').style.display = 'block';
}

function getWeatherByLocation() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetch(`${apiUrl}?q=${location}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    alert('Location not found. Please try again.');
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter a location.');
    }
}

function getWeatherByCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(error => console.error('Error:', error));
        }, () => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}
