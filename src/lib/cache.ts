import { getFromStorage, setToStorage } from "./storage/storage";

interface CacheObject<T> {
  data: T;
  expire: number;
}

export const getCache = async <T>(key: string): Promise<CacheObject<T>> => {
  return await getFromStorage<CacheObject<T>>(key);
};

export function setCache<T>(key: string, data: T, time: number) {
  const cachedData: CacheObject<T> = {
    data: data,
    expire: Date.now() + time,
  };

  try {
    setToStorage(key, cachedData);
  } catch (err) {
    console.info(err);
  }
}

export const cache = async <T>(
  key: string,
  callback: () => T,
  time = 300000,
): Promise<T> => {
  try {
    const { data, expire } = await getCache<T>(key);

    if (expire > Date.now()) {
      return data;
    }
  } catch (err) {
    console.info(err);
  }

  const data = await callback();

  setCache(key, data, time);

  return data;
};
