import { getFromStorage, setToStorage } from "./storage";

interface CacheObject {
  data: any;
  expire: number;
}

export const getCache = async (key: string): Promise<CacheObject> => {
  return await getFromStorage<CacheObject>(key);
};

export function setCache(key: string, data: any, time: number) {
  const cachedData: CacheObject = {
    data: data,
    expire: Date.now() + time,
  };

  try {
    setToStorage(key, cachedData);
  } catch (err) {
    console.info(err);
  }
}

export const cache = async (
  key: string,
  callback: () => any,
  time = 300000,
): Promise<any> => {
  try {
    let { data, expire } = await getCache(key);

    if (expire > Date.now()) {
      return data;
    }
  } catch (err) {
    console.info(err);
  }

  let data = await callback();

  setCache(key, data, time);

  return data;
};
