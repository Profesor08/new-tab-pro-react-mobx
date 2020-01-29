import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import store from "../../store/options";
import { WeatherIcon } from "./Icon";
import { useWeather } from "./utils";

const WidgetContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 60px;
  color: #ffffff;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0 30px;
`;

const WeatherCurrent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap;
`;

const WeatherInfo = styled.div`
  display: grid;
  grid-template:
    "icon description" 1fr
    "icon temperature" 1fr / 45px;
  grid-gap: 0 0.5rem;
  height: 45px;
`;

const WeatherInfoIcon = styled.div`
  width: 45px;
  height: 45px;
  grid-area: icon;
`;

const WeatherInfoDescription = styled.div`
  font-size: 0.8rem;
  text-transform: capitalize;
  grid-area: description;
`;

const WeatherInfoTemperature = styled.div`
  font-size: 1.5rem;
  grid-area: temperature;
`;

const WeatherLocation = styled.div``;

const WeatherForecast = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 0 0.5rem;
`;

const WeatherForecastItem = styled.div``;

const WeatherForecastDay = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
`;

const WeatherForecastIcon = styled.div`
  width: 40px;
  height: 40px;
`;

const WeatherForecastTemperature = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
`;

export const WeatherWidget = observer(() => {
  const [weather, forecast, location] = useWeather();

  if (
    store.showWeatherWidget &&
    weather !== null &&
    forecast !== null &&
    location !== null
  ) {
    let forecastList = forecast.list
      .filter(weather => {
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
      <WidgetContainer>
        <WeatherCurrent>
          <WeatherLocation>
            {location.city}, {location.country}
          </WeatherLocation>
          <WeatherInfo>
            <WeatherInfoIcon>
              <WeatherIcon type={weather.weather[0].icon} />
            </WeatherInfoIcon>
            <WeatherInfoDescription>
              {weather.weather[0].description}
            </WeatherInfoDescription>
            <WeatherInfoTemperature>
              {Math.floor(weather.main.temp)}°
            </WeatherInfoTemperature>
          </WeatherInfo>
        </WeatherCurrent>
        <WeatherForecast>
          {forecastList.map((weather, id: number) => (
            <WeatherForecastItem key={`forecast-item-${id}`}>
              <WeatherForecastDay>{weather.day}</WeatherForecastDay>
              <WeatherForecastIcon>
                <WeatherIcon type={weather.icon} />
              </WeatherForecastIcon>
              <WeatherForecastTemperature>
                {weather.temperature}°
              </WeatherForecastTemperature>
            </WeatherForecastItem>
          ))}
        </WeatherForecast>
      </WidgetContainer>
    );
  }

  return null;
});
