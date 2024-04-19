import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseUrl = process.env.REACT_APP_API_URL;
  const location = "Göteborg"; // TODO: Should be dynamic and based on input from user

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/forecast.json?key=${apiKey}&q=${location}&days=10&aqi=no&alerts=no`
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiKey]);

  // Temporary test-----------

  let currentTemperature = null;
  let currentCondition = null;

  if (data && data.current) {
    currentTemperature = data.current.temp_c;
    currentCondition = data.current.condition.text;
  }

  return (
    <div>
      {data ? (
        <div>
          <h2>Current Weather</h2>
          <p>Temperature: {currentTemperature} °C</p>
          <p>Condition: {currentCondition}</p>
        </div>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
}

export default App;
