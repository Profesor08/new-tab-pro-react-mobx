import { AsyncStorage } from "../types";

export class ChromeStorageProvider implements AsyncStorage {
  getItem = async (key: string) => {
    const items: Record<string, string | undefined> =
      await chrome.storage.local.get([key]);

    return items[key] ?? null;
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
