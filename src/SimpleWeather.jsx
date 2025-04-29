import React, { useState } from 'react';

const SimpleWeather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleCitySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=93eb38932aca8da482b4365b119f5099&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCitySubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>

      {weather && (
        <div>
          <h3>Weather in {weather.name}</h3>
          <p>Temperature: {Math.round(weather.main.temp)}°C</p>
          <p>Weather: {weather.weather[0].main}</p>
        </div>
      )}
    </div>
  );
};

export default SimpleWeather;