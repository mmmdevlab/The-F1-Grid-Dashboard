const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";
const TOKEN = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeather = async (lat, lng, days = 3) => {
  //   console.log(`getWeather fetch → ${lat},${lng}`);
  try {
    const params = new URLSearchParams({
      key: TOKEN,
      q: `${lat},${lng}`,
      days,
    });

    const response = await fetch(`${BASE_URL}?${params}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    return {
      location: {
        name: data.location.name,
        region: data.location.region,
        lat: data.location.lat,
        lon: data.location.lon,
      },
      forecast: data.forecast.forecastday.map((day) => ({
        date: day.date,
        temp_c: day.day.avgtemp_c,
        wind_kph: day.day.maxwind_kph,
        chance_of_rain: day.day.daily_chance_of_rain,
      })),
    };
  } catch (error) {
    console.error(`getWeather error`, error.message);
    return null;
  }
};
