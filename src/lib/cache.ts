interface CacheObject {
  data: any;
  expire: number;
}

export const isStorageAvailable = () => {
  return chrome.storage !== undefined;
};

export const getStorageCache = (key: string): Promise<CacheObject> =>
  new Promise(resolve => {
    chrome.storage.local.get([key], (result: any) => {
      try {
        if (result[key] !== undefined) {
          resolve(result[key]);
        } else {
          resolve({
            data: null,
            expire: 0,
          });
        }
      } catch (err) {
        console.warn(err);

        resolve({
          data: null,
          expire: 0,
        });
      }
    });
  });

export const getLocalCache = (key: string): Promise<CacheObject> =>
  new Promise(resolve => {
    try {
      const json = localStorage.getItem(key);

      if (json) {
        resolve(JSON.parse(json) as CacheObject);
      }
    } catch (err) {
      console.warn(err);
    }

    resolve({
      data: null,
      expire: 0,
    });
  });

export const setStorageCache = (key: string, data: CacheObject) => {
  const storage: { [key: string]: any } = {};

  storage[key] = data;

  chrome.storage.local.set(storage);
};

export const setLocalCache = (key: string, data: CacheObject) => {
  const json = JSON.stringify(data);

  localStorage.setItem(key, json);
};

export const getCache = async (key: string): Promise<CacheObject> => {
  if (isStorageAvailable()) {
    return await getStorageCache(key);
  }

  return await getLocalCache(key);
};

export function setCache(key: string, data: any, time: number) {
  const cachedData: CacheObject = {
    data: data,
    expire: Date.now() + time,
  };

  try {
    if (isStorageAvailable()) {
    } else {
      setLocalCache(key, cachedData);
    }
  } catch (err) {
    console.warn(err);
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
  } catch (err) {}

  let data = await callback();

  setCache(key, data, time);

  return data;
};
