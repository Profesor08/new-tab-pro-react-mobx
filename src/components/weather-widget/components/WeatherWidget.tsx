import styled from "styled-components";

export const WidgetContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 60px;
  color: #ffffff;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0 30px;
`;

export const WeatherCurrent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap;
`;

export const WeatherInfo = styled.div`
  display: grid;
  grid-template:
    "icon description" 1fr
    "icon temperature" 1fr / 45px;
  grid-gap: 0 0.5rem;
  height: 45px;
`;

export const WeatherInfoIcon = styled.div`
  width: 45px;
  height: 45px;
  grid-area: icon;
`;

export const WeatherInfoDescription = styled.div`
  font-size: 0.8rem;
  text-transform: capitalize;
  grid-area: description;
`;

export const WeatherInfoTemperature = styled.div`
  font-size: 1.5rem;
  grid-area: temperature;
`;

export const WeatherLocation = styled.div``;

export const WeatherForecast = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 0 0.5rem;
`;

export const WeatherForecastItem = styled.div``;

export const WeatherForecastDay = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
`;

export const WeatherForecastIcon = styled.div`
  width: 40px;
  height: 40px;
`;

export const WeatherForecastTemperature = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
`;
