import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import store from "../../store-mobx/options";
import { cache } from "../../lib/cache";
import icons from "./icons";
import Icon from "./Icon";

const openWeatherMapAPI = `6a3811c0c201a60032a60c243e832cf1`;

interface UrlParams {
  [key: string]: string | number;
}

async function getJson(url: string, params: UrlParams = {}) {
  const query = Object.keys(params)
    .map(key => {
      return `${key}=${params[key]}`;
    })
    .join("&");

  const response = await fetch(url + query);

  return await response.json();
}

interface IWeatherForecaseItemMainInfo {
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
}

interface IWeatherForecaseWeatherInfo {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface IWeatherForecastItem {
  dt: number;
  dt_txt: string;
  main: IWeatherForecaseItemMainInfo;
  weather: IWeatherForecaseWeatherInfo[];
}

interface IWeatherMainInfo {
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface IWeatherForecast {
  list: IWeatherForecastItem[];
}

interface IWeatherInfo {
  weather: IWeatherForecaseWeatherInfo[];
  main: IWeatherMainInfo;
}

interface IGeoPosition {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

async function getWeatherData(
  coords: Coordinates,
): Promise<{
  weather: IWeatherInfo;
  forecast: IWeatherForecast;
}> {
  const language = navigator.language.substr(0, 2);

  const data = {
    lat: coords.latitude,
    lon: coords.longitude,
    num_of_days: 5,
    format: "json",
    units: "Metric",
    appid: openWeatherMapAPI,
    lang: language,
  };

  return {
    weather: await getJson(
      `https://api.openweathermap.org/data/2.5/weather?`,
      data,
    ),
    forecast: await getJson(
      `https://api.openweathermap.org/data/2.5/forecast?`,
      data,
    ),
  };
}

async function getSypexGeoPosition() {
  const { city, country } = await getJson("https://api.sypexgeo.net/json/");

  const language = navigator.language.substr(0, 2);

  return {
    latitude: city.lat,
    longitude: city.lon,
    city: city["name_" + language] ? city["name_" + language] : city["name_en"],
    country: country["name_" + language]
      ? country["name_" + language]
      : country["name_en"],
  };
}

async function getGeoPosition() {
  return await getSypexGeoPosition();
}

function getWeatherIcon(icon: string) {
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
}

const useWeatherApi = (): [
  IWeatherInfo | null,
  IWeatherForecast | null,
  IGeoPosition | null,
  boolean,
] => {
  const [data, setData] = useState({
    loaded: false,
    weather: null,
    forecast: null,
    position: null,
  });

  useEffect(() => {
    const load = async () => {
      let position = await cache("geoPosition", async () => {
        return await getGeoPosition();
      });

      let { weather, forecast } = await cache("weatherData", async () => {
        return await getWeatherData(position);
      });

      setData({
        loaded: true,
        weather: weather,
        forecast: forecast,
        position: position,
      });
    };

    if (data.loaded === false) {
      load();
    }
  }, [data.loaded]);

  return [data.weather, data.forecast, data.position, data.loaded];
};

export const Weather = observer(() => {
  if (store.showWeatherWidget) {
    const [weather, forecast, position, loaded] = useWeatherApi();

    if (loaded && weather !== null && forecast !== null && position !== null) {
      let forecastList = forecast.list

        .filter((weather: IWeatherForecastItem) => {
          let arr = weather.dt_txt.split(/\s+/);

          return arr[1] === "00:00:00";
        })

        .map(weather => {
          let day = new Date(weather.dt * 1000).toLocaleDateString(
            window.navigator.language,
            {
              weekday: "short",
            },
          );

          return {
            temperature: Math.floor(weather.main.temp),
            weather: weather.weather[0].description,
            icon: weather.weather[0].icon,
            day: day,
          };
        });

      return (
        <div className="weather-widget">
          <div className="current-weather">
            <div className="location">
              {position.city}, {position.country}
            </div>
            <div className="info-wrapper">
              <Icon animationData={getWeatherIcon(weather.weather[0].icon)} />
              <div className="info">
                <div className="description">
                  {weather.weather[0].description}
                </div>
                <div className="temperature">
                  {Math.floor(weather.main.temp)}°
                </div>
              </div>
            </div>
          </div>
          <div className="weather-forecast">
            {forecastList.map((weather, index: number) => {
              return (
                <div key={index} className="day-weather">
                  <div className="day">{weather.day}</div>
                  <Icon animationData={getWeatherIcon(weather.icon)} />
                  <div className="temperature">{weather.temperature}°</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="weather">
          <div className="location">...</div>
        </div>
      );
    }
  } else {
    return null;
  }
});

export default Weather;
