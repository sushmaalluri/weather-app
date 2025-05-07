import React, { useState } from 'react';
import MapComponent from './MapComponent';

const SimpleWeather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleCitySubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=93eb38932aca8da482b4365b119f5099&units=metric`
      );
      const data = await response.json();
      
      if (data.cod === '404') {
        setError('City not found. Please check the spelling and try again.');
        setWeather(null);
      } else if (data.cod !== 200) {
        setError('An error occurred while fetching weather data.');
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError('Failed to fetch weather data. Please try again.');
      setWeather(null);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <form onSubmit={handleCitySubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '60%',
            marginRight: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button 
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Get Weather
        </button>
      </form>

      {error && (
        <div style={{ 
          color: 'red', 
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#ffebee',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

      {weather && !error && (
        <div style={{ 
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginTop: 0 }}>Weather in {weather.name}</h3>
          <p>Temperature: {Math.round(weather.main.temp)}°C</p>
          <p>Weather: {weather.weather[0].main}</p>
          <MapComponent city={city} weather={weather} />
        </div>
      )}
    </div>
  );
};

export default SimpleWeather;