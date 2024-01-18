        // importing necessary dependencies //
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';



          // state variables for city, weather data, and error //
const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  const cities = [
    'Modesto',
    'Boston',
    'Dallas',
    'New York',
    'Brazil',
    'Sydney',
    'Los Angeles',
    'Phnom Penh',
    'London',
    'Tokyo',
    'Osaka',
    'Columbia',
  ];

      // function to handle form submission and fetch weather data //
  const handleFormSubmit = async (event) => {
    event.preventDefault();


      // make API request to OpenWeatherMap && updating weather data state and clear error. prevents the default form behavior //
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setError('Error fetching weather data. Please try again.');
    }
  };

      // setting the initial city to the first city in the cities array //
  useEffect(() => {
    setCity(cities[0]);
  }, []); 


    // JSX structure for the component includes a form with drop down menu for cities, display weather, submit button and error message //
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
          <p>Temperature: {Math.round(weatherData.main.temp)}°F</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
};

export default App;
