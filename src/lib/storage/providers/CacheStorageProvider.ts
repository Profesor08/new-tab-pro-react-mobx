import { AsyncStorage } from "../types";
import { CommonStorageProvider } from "./CommonStorageProvider";

export class CacheStorageProvider implements AsyncStorage {
  private storage: CommonStorageProvider;
  private time: number;
  private refresh: () => Promise<void>;

  constructor(time: number, refresh: () => Promise<void>) {
    this.storage = new CommonStorageProvider();
    this.time = time;
    this.refresh = refresh;
  }

  getItem = async (key: string) => {
    const item = await this.storage.getItem(key);

    if (item !== null) {
      const data = JSON.parse(item);

      if (data.expires > Date.now()) {
        return JSON.stringify(data.data);
      }
    }

    this.refresh();

    return null;
  };

  setItem = async (key: string, value: string) => {
    return await this.storage.setItem(
      key,
      JSON.stringify({
        data: JSON.parse(value),
        expires: Date.now() + this.time,
      }),
    );
  };

  removeItem = async (key: string) => {
    return await this.storage.removeItem(key);
  };
}
