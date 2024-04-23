const fetchWeatherData = async (apiKey, baseUrl, location) => {
  try {
    const response = await fetch(
      `${baseUrl}/forecast.json?key=${apiKey}&q=${location}&days=10&aqi=no&alerts=no`
    );

    return await response.json();

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchWeatherData;
