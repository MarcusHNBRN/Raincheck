import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import fetchWeatherData from "./api/WeatherApi";
import Forecast from "./components/Forecast";
import "./App.css";

function Card() {
  const [data, setData] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseUrl = process.env.REACT_APP_API_URL;
  const [location, setLocation] = useState("");
  const [showForecast, setShowForecast] = useState(false);

  const handleSearch = (query) => {
    setLocation(query);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (location !== "") {
        const jsonData = await fetchWeatherData(apiKey, baseUrl, location);
        setData(jsonData);
      }
    };

    fetchData();
  }, [apiKey, baseUrl, location]);

  const toggleForecast = () => {
    setShowForecast(!showForecast);
  };

  return (
    <div className="card">
      <SearchBar onSearch={handleSearch} />
      <div
        className={`card-container ${data && data.current ? "slide-down" : ""}`}
      >
        {data && data.current ? (
          <Forecast
            location={location}
            data={data}
            toggleForecast={toggleForecast}
            showForecast={showForecast}
          />
        ) : (
          <p className="search-text">Search for a location</p>
        )}
      </div>
    </div>
  );
}

export default Card;
