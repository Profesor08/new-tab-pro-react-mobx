declare interface IGeoLocation {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

declare interface ICoordinates {
  lat: number;
  lon: number;
}

declare interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

declare interface IWeatherMainInfo {
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

declare interface IWeatherWind {
  speed: number;
  deg: number;
}

declare interface IWeatherClouds {
  all: number;
}

declare interface IWeatherSys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

declare interface IWeatherData {
  coord: ICoordinates;
  weather: IWeather[];
  base: string;
  main: IWeatherMainInfo;
  visibility: number;
  wind: IWeatherWind;
  clouds: IWeatherClouds;
  dt: number;
  sys: IWeatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

declare interface IForecastSys {
  pod: string;
}

declare interface IForecastMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

declare interface IForecast {
  dt: number;
  main: IForecastMain;
  weather: IWeather[];
  clouds: IWeatherClouds;
  wind: IWeatherWind;
  sys: IForecastSys;
  dt_txt: string;
}

declare interface IForecastCity {
  id: number;
  name: string;
  coord: ICoordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

declare interface IForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: IForecast[];
  city: IForecastCity;
}
