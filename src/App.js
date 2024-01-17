import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  const cities = [
    'Oakland',
    'Modesto',
    'New York',
    'Los Angeles',
    'London',
    'Paris',
    'Tokyo',
  ];

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setError('Error fetching weather data. Please try again.');
    }
  };

  // set initial city on component mount
  useEffect(() => {
    setCity(cities[0]);
  }, []); 

  return (
    <div className="App">
      <h1>Weather Lookup App</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="citySelect">Select City:</label>
        <select
          id="citySelect"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        >
          {cities.map((cityOption) => (
            <option key={cityOption} value={cityOption}>
              {cityOption}
            </option>
          ))}
        </select>
        <button type="submit">Get Weather</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div id="weatherInfo">
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
};

export default App;
