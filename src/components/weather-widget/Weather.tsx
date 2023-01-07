import React, { useMemo } from "react";
import { useOptions } from "../../store/options";
import { WeatherIcon } from "./components/Icon";
import { useWeather } from "./store";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./store";
import {
  WidgetContainer,
  WeatherCurrent,
  WeatherLocation,
  WeatherInfo,
  WeatherInfoIcon,
  WeatherInfoDescription,
  WeatherInfoTemperature,
  WeatherForecast,
  WeatherForecastItem,
  WeatherForecastDay,
  WeatherForecastIcon,
  WeatherForecastTemperature,
} from "./components/WeatherWidget";

const WeatherWidget = () => {
  const [weather, forecast, location] = useWeather();

  const forecastList = useMemo(() => {
    return (
      forecast?.list
        .filter((weather) => {
          const arr = weather.dt_txt.split(/\s+/);

          return arr[1] === "00:00:00";
        })
        .map((weather) => {
          const day = new Date(weather.dt * 1000).toLocaleDateString(
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
        }) ?? []
    );
  }, [forecast]);

  return (
    <WidgetContainer>
      <WeatherCurrent>
        {location !== undefined && (
          <WeatherLocation>
            {location.city}, {location.country}
          </WeatherLocation>
        )}
        {weather !== undefined && (
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
        )}
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
};

export const Weather = () => {
  const showWeatherWidget = useOptions((state) => state.weather);

  if (showWeatherWidget === true) {
    return (
      <QueryClientProvider client={queryClient}>
        <WeatherWidget />
      </QueryClientProvider>
    );
  }

  return null;
};
