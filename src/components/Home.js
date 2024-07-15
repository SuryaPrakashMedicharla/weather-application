import React, { useState } from "react";
import axios from "axios";
import Weather from "./Weather";
import Loader from "./Spinner";
import "./Home.css";

const Home = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "15ca787f2d191cf1f09525804a2ce85d";

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching the weather data", error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather();
    }
  };

  return (
    <div className="app">
      <div className="weather-container">
        <h1 className="weather-txt">Weather in your city</h1>
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Enter city name"
            className="weather-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="weather-button">Search</button>
          {loading && <Loader />}
        </form>
      </div>
      {!loading && weatherData && <Weather data={weatherData} />}
    </div>
  );
};

export default Home;
