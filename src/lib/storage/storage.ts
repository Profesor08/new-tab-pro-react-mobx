import { CommonStorageProvider } from "./providers/CommonStorageProvider";

const storage = new CommonStorageProvider();

export const setToStorage = async <T>(key: string, data: T) => {
  return await storage.setItem(
    key,
    JSON.stringify({
      data: data,
    }),
  );
};

export const getFromStorage = async <T>(key: string): Promise<T> => {
  const json = await storage.getItem(key);

  if (json !== null) {
    const data = JSON.parse(json);

    return data.data;
  }

  throw new Error(`No data found with key: ${key}`);
};
