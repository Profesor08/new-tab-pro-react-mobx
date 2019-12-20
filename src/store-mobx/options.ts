import { observable } from "mobx";

export class OptionsStore {
  @observable public additionalOptions: boolean = false;
  @observable public optionsPanelShow: boolean = true;
  @observable public backgroundStarSpaceAnimation: boolean = true;
  @observable public showWeatherWidget: boolean = true;
  @observable public showCurrencyWidget: boolean = true;
  @observable public showWebSites: boolean = true;
  @observable public showAddSiteForm: boolean = false;
  [key: string]: any;

  constructor() {
    try {
      const json = localStorage.getItem("options");

      if (json) {
        const props = JSON.parse(json);

        for (const [prop, value] of Object.entries(props)) {
          if (prop in this) {
            this[prop] = value;
          }
        }
      }
    } catch (err) {
      console.warn(err);
    }
  }
}

export const store = new OptionsStore();

export default store;
