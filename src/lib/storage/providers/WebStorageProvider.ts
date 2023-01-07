import { AsyncStorage } from "../types";

export class WebStorageProvider implements AsyncStorage {
  getItem = async (key: string) => {
    return localStorage.getItem(key);
  };

  setItem = async (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  removeItem = async (key: string) => {
    localStorage.removeItem(key);
  };
}
