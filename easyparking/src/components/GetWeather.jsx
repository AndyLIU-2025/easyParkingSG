// GetWeather.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from './LocationContext'

function GetWeather() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const { currentPos } = useLocation();
  const lat = currentPos.lat.toFixed(6);
  const lon = currentPos.lng.toFixed(6);

  useEffect(() => {
    if (!lat || !lon) return;

    async function fetchWeather() {
      try {
        const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
            params: {
                key: import.meta.env.VITE_WEATHER_API_KEY,  // Access the Vite-specific environment variable                 
                q: `${lat},${lon}`,
                aqi: 'no',
            },
          });
        setWeather(response.data);
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error(err);
      }
    }

    fetchWeather();
  }, [lat, lon]);

  if (error) return <div>{error}</div>;
  if (!weather) return <div>Loading...</div>;

  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <p>Temperature: {weather.current.temp_c}°C</p>
      <p>Feels like: {weather.current.feelslike_c}°C</p>
      <p>Humidity: {weather.current.humidity}%</p>
      <p>Wind speed: {weather.current.wind_kph} km/h</p>
    </div>
  );
}

export default GetWeather;
