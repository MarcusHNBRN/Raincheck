import React from "react";

function AddDetails({ day }) {
  return (
    <div>
      <p>Wind: {day.day.maxwind_kph} km/h</p>
      <p>Humidity: {day.day.avghumidity}%</p>
    </div>
  );
}

export default AddDetails;
