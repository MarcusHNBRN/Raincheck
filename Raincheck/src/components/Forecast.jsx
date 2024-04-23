import React, { useState } from "react";
import { StyledButton } from "./FormComponents";

function Forecast({ location, data }) {
  const [showForecast, setShowForecast] = useState(false);

  const toggleForecast = () => {
    setShowForecast(!showForecast);
  };

  let currentTemperature = null;
  let currentCondition = null;

  if (data && data.current) {
    currentTemperature = data.current.temp_c;
    currentCondition = data.current.condition.text;
  }

  const displayDay = (dateString) => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  function startUpper(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  return (
    <div>
      <h2>{startUpper(location)}</h2>
      <img src={data.current.condition.icon} alt="Weather Icon" />
      <p>Temperature: {currentTemperature} °C</p>
      <p>Condition: {currentCondition}</p>
      <StyledButton onClick={toggleForecast}>
        {showForecast ? "Hide 8-Day forecast" : "Show 8-Day forecast"}
      </StyledButton>
      {showForecast && data && data.forecast && (
        <div>
          <hr />
          <h3>8-Day Forecast</h3>
          {data.forecast.forecastday.map((day) => (
            <div key={day.date}>
              <p>{displayDay(day.date)}</p>
              <p>Min: {day.day.mintemp_c} °C</p>
              <p>Max: {day.day.maxtemp_c} °C</p>
              <p>{day.day.condition.text}</p>
              <img src={day.day.condition.icon} alt="Weather Icon" />
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Forecast;
