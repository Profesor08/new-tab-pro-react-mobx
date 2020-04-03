import { useEffect, useState } from "react";
import { cache } from "../../lib/cache";
import icons from "./icons";
import options from "../../store/options";

const openWeatherMapApiKey = `6a3811c0c201a60032a60c243e832cf1`;

const makeRequest = async (
  urlString: string,
  props: { [key: string]: string | number } = {},
) => {
  const url = new URL(urlString);

  for (const prop in props) {
    url.searchParams.append(prop, props[prop].toString());
  }

  return fetch(url.href);
};

export const getGeoLocation = async (): Promise<IGeoLocation> => {
  const response = await makeRequest("https://api.sypexgeo.net/json/");
  const { city, country } = await response.json();

  const language = navigator.language.substr(0, 2);

  return {
    latitude: city.lat,
    longitude: city.lon,
    city: city["name_" + language] || city["name_en"],
    country: country["name_" + language] || country["name_en"],
  };
};

export const getWeather = async () => {
  return cache("weatherData", async () => {
    const language = navigator.language.substr(0, 2);

    const location: IGeoLocation = await getGeoLocation();

    const props = {
      lat: location.latitude,
      lon: location.longitude,
      num_of_days: 5,
      format: "json",
      units: "Metric",
      appid: openWeatherMapApiKey,
      lang: language,
    };

    const weather = await (
      await makeRequest(
        "https://api.openweathermap.org/data/2.5/weather",
        props,
      )
    ).json();
    const forecast = await (
      await makeRequest(
        "https://api.openweathermap.org/data/2.5/forecast",
        props,
      )
    ).json();

    return {
      weather,
      forecast,
      location,
    };
  });
};

export const useWeather = (): [
  IWeatherData | null,
  IForecastData | null,
  IGeoLocation | null,
] => {
  const [data, setData] = useState({
    loaded: false,
    weather: null,
    forecast: null,
    location: null,
  });

  useEffect(() => {
    const load = async () => {
      if (options.showWeatherWidget) {
        const { weather, forecast, location } = await getWeather();

        setData({
          loaded: true,
          weather,
          forecast,
          location,
        });
      }
    };

    if (data.loaded === false) {
      load();
    }
  }, [data.loaded, options.showWeatherWidget]);

  return [data.weather, data.forecast, data.location];
};

export const getWeatherIcon = (icon: string) => {
  try {
    icon = icon.substr(0, 2);
  } catch (err) {
    return icons.sunny;
  }

  switch (icon) {
    case "01":
      return icons.sunny;
    case "02":
      return icons.mostlySunny;
    case "03":
      return icons.mostlyCloudy;
    case "04":
      return icons.cloudyDay;
    case "09":
      return icons.showersDay;
    case "10":
      return icons.scatteredShowersDay;
    case "11":
      return icons.isolatedStormsDay;
    case "13":
      return icons.snowShowersDay;
    case "50":
      return icons.mist;
    default:
      return icons.partlyCloudy;
  }
};
