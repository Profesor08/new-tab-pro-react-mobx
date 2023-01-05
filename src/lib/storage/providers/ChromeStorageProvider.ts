import { AsyncStorage } from "../types";

export class ChromeStorageProvider implements AsyncStorage {
  getItem = async (key: string) => {
    const items = await chrome.storage.local.get([key]);

    if (items[key] !== undefined) {
      return items[key];
    } else {
      throw `No data found with key: ${key}`;
    }
  };

  setItem = async (key: string, value: string) => {
    await chrome.storage.local.set({
      [key]: value,
    });
  };

  removeItem = async (key: string) => {
    await chrome.storage.local.remove(key);
  };
}
