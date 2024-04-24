import React, { useState } from "react";
import { StyledButton } from "./FormComponents";
import AddDetails from "./AddDetails";

function Forecast({ location, data }) {
  const [showForecast, setShowForecast] = useState(false);
  const [expandDetails, setExpandDetails] = useState([]);

  const toggleForecast = () => {
    setShowForecast(!showForecast);
  };

  const toggleAddDetails = (index) => {
    const newExpandDetails = [...expandDetails];
    newExpandDetails[index] = !newExpandDetails[index];
    setExpandDetails(newExpandDetails);
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
      <div
        className={
          "forecast-card " +
          getWeatherConditionClass(data.current.condition.text)
        }
      >
        <h2>{startUpper(location)}</h2>
        <p>Today</p>
        <img src={data.current.condition.icon} alt="Weather Icon" />
        <p>{currentTemperature} °C</p>
        <p>{currentCondition}</p>
        <StyledButton onClick={toggleForecast}>
          {showForecast ? "Hide 8-Day forecast" : "Show 8-Day forecast"}
        </StyledButton>
      </div>
      {showForecast && data && data.forecast && (
        <div>
          <hr />
          <h3>8-Day Forecast</h3>
          {data.forecast.forecastday.map((day, index) => (
            <div
              key={day.date}
              className={
                "forecast-card " +
                getWeatherConditionClass(day.day.condition.text)
              }
            >
              <p className="day">{displayDay(day.date)}</p>
              <img src={day.day.condition.icon} alt="Weather Icon" />
              <p>Min: {day.day.mintemp_c} °C</p>
              <p>Max: {day.day.maxtemp_c} °C</p>
              <p>{day.day.condition.text}</p>
              <a onClick={() => toggleAddDetails(index)}>
                {expandDetails[index] ? "Show less" : "Show more"}
              </a>
              {expandDetails[index] && (
                <AddDetails day={day} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function getWeatherConditionClass(conditionText) {
  conditionText = conditionText.trim().toLowerCase();
  switch (conditionText) {
    case "sunny":
      return "sunny-weather";
    case "cloudy":
    case "partly cloudy":
      return "cloudy-weather";
    case "rain":
      return "rainy-weather";
    case "overcast":  
        return "overcast-weather";
    case "light sleet":
        return "sleet-weather";
    case "patchy rain nearby":
      return "patchty-rainy-weather";
    case "moderate rain":
      return "moderate-rain-weather";
    case "light snow":
    case "moderate snow":
      return "snow-weather";
    case "heavy snow":
        return "snow-heavy-weather";
    case "patchy light snow":
        return "patchy-snow";
    case "fog":
    case "mist":
      return "fog-weather";
    default:
      return "default-weather";
  }
}

export default Forecast;