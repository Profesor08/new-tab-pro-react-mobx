declare interface IGeoLocation {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
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

declare interface ILocation {
  name: string;
  local_names: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
}

namespace YandexGeoCoder {
  export interface ApiResponse {
    response: {
      GeoObjectCollection: YandexGeoCoder.GeoObjectCollection;
    };
  }

  export interface GeoObjectCollection {
    metaDataProperty: {
      GeocoderResponseMetaData: GeocoderResponseMetaData;
    };
    featureMember: {
      GeoObject: GeoObject;
    }[];
  }

  export interface GeocoderResponseMetaData {
    Point: Point;
    request: string;
    results: string;
    found: string;
  }

  export type Position = `${number} ${number}`;

  export interface Point {
    pos: Position;
  }

  export interface GeoObject {
    metaDataProperty: {
      GeocoderMetaData: GeocoderMetaData;
    };
    name: string;
    description?: string;
    boundedBy: {
      Envelope: Envelope;
    };
    Point: Point;
  }

  export interface Envelope {
    lowerCorner: Position;
    upperCorner: Position;
  }

  export interface GeocoderMetaData {
    precision: Precision;
    text: string;
    kind: Kind;
    Address: Address;
    AddressDetails: AddressDetails;
  }

  export interface Address {
    country_code?: string;
    formatted: string;
    Components: { kind: Kind; name: string }[];
  }

  export type Precision = "street" | "other";

  export type Kind =
    | "house"
    | "street"
    | "metro"
    | "district"
    | "locality"
    | "country"
    | "area"
    | "other";

  export interface AddressDetails {
    Country?: Country;
    Address?: string;
  }

  export interface Country {
    AddressLine: string;
    CountryNameCode: string;
    CountryName: string;
    AdministrativeArea?: AdministrativeArea;
  }

  export interface AdministrativeArea {
    AdministrativeAreaName: string;
    Locality?: Locality;
  }

  export interface Locality {
    LocalityName: string;
    Thoroughfare?: Thoroughfare;
    DependentLocality?: DependentLocality;
  }

  export interface Thoroughfare {
    ThoroughfareName: string;
  }

  export interface DependentLocality {
    DependentLocalityName: string;
  }
}
