import { ChromeStorageProvider } from "./ChromeStorageProvider";
import { WebStorageProvider } from "./WebStorageProvider";
import { AsyncStorage } from "../types";

export class CommonStorageProvider implements AsyncStorage {
  private storage: ChromeStorageProvider | WebStorageProvider;

  constructor() {
    if (chrome.storage !== undefined) {
      this.storage = new ChromeStorageProvider();
    } else {
      this.storage = new WebStorageProvider();
    }
  }

  getItem = async (key: string) => {
    return await this.storage.getItem(key);
  };

  setItem = async (key: string, value: string) => {
    return await this.storage.setItem(key, value);
  };

  removeItem = async (key: string) => {
    return await this.storage.removeItem(key);
  };
}
