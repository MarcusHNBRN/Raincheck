import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseUrl = process.env.REACT_APP_API_URL;
  const [location, setLocation] = useState(""); // fixed: Should be dynamic and based on input from user

  const handleSearch = (query) => {
    setLocation(query);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location !== "") {
          const response = await fetch(
            `${baseUrl}/forecast.json?key=${apiKey}&q=${location}&days=10&aqi=no&alerts=no`
          );
          const jsonData = await response.json();
          setData(jsonData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiKey, baseUrl, location]);

  // Temporary test-----------

  let currentTemperature = null;
  let currentCondition = null;

  if (data && data.current) {
    currentTemperature = data.current.temp_c;
    currentCondition = data.current.condition.text;
  }

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <div
        className={`info-container ${data && data.current ? "slide-down" : ""}`}
      >
        {data && data.current ? (
          <>
            <h2>{location}</h2>
            <img src={data.current.condition.icon} alt="Weather Icon" />
            <p>Temperature: {data.current.temp_c} °C</p>
            <p>Condition: {data.current.condition.text}</p>
          </>
        ) : (
          <p>Search for a location to find the weather.</p>
        )}
      </div>
    </div>
  );
}

export default App;
