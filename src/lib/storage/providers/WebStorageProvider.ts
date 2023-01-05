import { AsyncStorage } from "../types";

export class WebStorageProvider implements AsyncStorage {
  getItem = async (key: string) => {
    const item = localStorage.getItem(key);

    if (item !== null) {
      return item;
    } else {
      throw `No data found with key: ${key}`;
    }
  };

  setItem = async (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  removeItem = async (key: string) => {
    localStorage.removeItem(key);
  };
}
