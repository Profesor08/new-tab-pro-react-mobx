import { QueryClient, useQuery } from "react-query";
import { createAsyncStoragePersistor } from "react-query/createAsyncStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { CommonStorageProvider } from "../../lib/storage/providers/CommonStorageProvider";
import { getForecast, getGeoLocation, getWeather } from "./utils";

export const useWeather = (): [
  IWeatherData | undefined,
  IForecastData | undefined,
  IGeoLocation | undefined,
] => {
  const { data: geoLocation } = useQuery(
    "geoLocation",
    async () => await getGeoLocation(),
  );

  const { data: weatherData } = useQuery(
    "weatherData",
    async () => {
      if (geoLocation !== undefined) {
        return await getWeather(geoLocation);
      }
    },
    {
      enabled: geoLocation !== undefined,
    },
  );

  const { data: forecastData } = useQuery(
    "forecastData",
    async () => {
      if (geoLocation !== undefined) {
        return await getForecast(geoLocation);
      }
    },
    {
      enabled: geoLocation !== undefined,
    },
  );

  return [weatherData, forecastData, geoLocation];
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 5, // 5 min
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      keepPreviousData: true,
    },
  },
});

const asyncStoragePersistor = createAsyncStoragePersistor({
  key: "weatherOfflineCache",
  throttleTime: 0,
  storage: new CommonStorageProvider(),
});

persistQueryClient({
  queryClient,
  persistor: asyncStoragePersistor,
  buster: "",
});
