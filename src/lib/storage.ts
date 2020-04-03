export const isBrowserStorageAvailable = () => {
  return chrome.storage !== undefined;
};

export const setToBrowserStorage = async (key: string, data: any) => {
  const storage: { [key: string]: any } = {};

  storage[key] = data;

  chrome.storage.local.set(storage);
};

export const getFromBrowserStorage = async <T>(key: string): Promise<T> =>
  new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (result: any) => {
      if (result[key] !== undefined) {
        resolve(result[key]);
      } else {
        reject(`No data found with key: ${key}`);
      }
    });
  });

export const setToLocalStorage = (key: string, data: any) => {
  const json = JSON.stringify({ data });

  localStorage.setItem(key, json);
};

export const getFromLocalStorage = async <T>(key: string): Promise<T> => {
  const json = localStorage.getItem(key);

  if (json !== null) {
    const data = JSON.parse(json);

    return data.data;
  }

  throw new Error(`No data found with key: ${key}`);
};

export const setToStorage = async (key: string, data: any) => {
  if (isBrowserStorageAvailable()) {
    return await setToBrowserStorage(key, data);
  } else {
    return setToLocalStorage(key, data);
  }
};

export const getFromStorage = async <T>(key: string) => {
  if (isBrowserStorageAvailable()) {
    return await getFromBrowserStorage<T>(key);
  } else {
    return await getFromLocalStorage<T>(key);
  }
};
