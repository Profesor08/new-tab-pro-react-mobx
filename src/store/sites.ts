import { observable } from "mobx";
import { sites as demo } from "../store/demo/sites";

export interface ISite {
  name: string;
  url: string;
  image: string;
}

export interface ISiteProps {
  name?: string;
  url?: string;
  image?: string;
}

export class SitesStore {
  @observable sites: ISite[] = [];

  constructor() {
    try {
      const json = localStorage.getItem("webSites");

      if (json) {
        this.sites = JSON.parse(json);
      } else {
        this.sites = demo;
      }
    } catch {
      this.sites = demo;
    }
  }

  get(id: any) {
    return this.sites[id];
  }

  add(site: ISite) {
    this.sites.push(site);
    this.save();
  }

  remove(id: number) {
    if (id in this.sites) {
      this.sites.splice(id, 1);
      this.save();
    }
  }

  update(id: number, site: ISiteProps) {
    if (id in this.sites) {
      this.sites[id] = {
        ...this.sites[id],
        ...site,
      };
      this.save();
    }
  }

  save() {
    try {
      localStorage.setItem("webSites", JSON.stringify(this.sites));
    } catch (err) {
      console.warn(err);
    }
  }
}

export default new SitesStore();
