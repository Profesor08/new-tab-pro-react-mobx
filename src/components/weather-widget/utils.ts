import icons from "./icons";

const openWeatherMapApiKey = `6a3811c0c201a60032a60c243e832cf1`;
const yandexGeoCoderApiKey = `a1dcf3c2-9a95-4ca5-ac07-7154ee32ed32`;

const api = async <T>(
  input: string,
  props: Record<string, string | number> = {},
): Promise<T> => {
  const url = new URL(input);

  Object.entries(props).forEach(([name, value]) => {
    url.searchParams.set(name, value.toString());
  });

  const request = await fetch(url, {
    method: "GET",
  });

  return await request.json();
};

export const getWeatherIcon = (icon: string) => {
  try {
    icon = icon.substring(0, 2);
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

export const getCoords = async (): Promise<GeolocationCoordinates> => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      resolve(coords);
    });
  });
};

export const getLanguage = () =>
  navigator.language.substring(0, 2).toLowerCase();

export const getGeoLocation = async (): Promise<IGeoLocation> => {
  const coords = await getCoords();

  const {
    response: { GeoObjectCollection },
  } = await api<YandexGeoCoder.ApiResponse>(
    "https://geocode-maps.yandex.ru/1.x",
    {
      apikey: yandexGeoCoderApiKey,
      format: "json",
      geocode: `${coords.longitude},${coords.latitude}`,
    },
  );

  const location = GeoObjectCollection.featureMember[0]?.GeoObject as
    | YandexGeoCoder.GeoObject
    | undefined;

  const [longitude, latitude] = location?.Point.pos.split(/\s+/) ?? [
    coords.longitude,
    coords.latitude,
  ];

  const country =
    location?.metaDataProperty.GeocoderMetaData.Address.Components.find(
      (component) => component.kind === "country",
    );

  const locality =
    location?.metaDataProperty.GeocoderMetaData.Address.Components.find(
      (component) => component.kind === "locality",
    );

  const area =
    location?.metaDataProperty.GeocoderMetaData.Address.Components.find(
      (component) => component.kind === "area",
    );

  return {
    latitude: parseFloat(latitude.toString()),
    longitude: parseFloat(longitude.toString()),
    city: locality?.name ?? area?.name,
    country: country?.name,
  };
};

export const getWeather = async (
  location: IGeoLocation,
): Promise<IWeatherData> => {
  const language = getLanguage();

  return await api("https://api.openweathermap.org/data/2.5/weather", {
    lat: location.latitude.toString(),
    lon: location.longitude.toString(),
    num_of_days: "5",
    format: "json",
    units: "Metric",
    appid: openWeatherMapApiKey,
    lang: language,
  });
};

export const getForecast = async (
  location: IGeoLocation,
): Promise<IForecastData> => {
  const language = getLanguage();

  return await api("https://api.openweathermap.org/data/2.5/forecast", {
    lat: location.latitude.toString(),
    lon: location.longitude.toString(),
    num_of_days: "5",
    format: "json",
    units: "Metric",
    appid: openWeatherMapApiKey,
    lang: language,
  });
};
