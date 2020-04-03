import { observable, computed } from "mobx";
import { getFromStorage, setToStorage } from "./../lib/storage";

interface IOptions {
  showWeatherWidget: boolean;
  showCurrencyWidget: boolean;
  showWebSites: boolean;
  backgroundStarSpaceAnimation: boolean;
  additionalOptions: boolean;
}

export class OptionsStore {
  @observable public optionsPanelShow: boolean = false;
  @observable public showAddSiteForm: boolean = false;
  @observable private _showWeatherWidget: boolean = true;
  @observable private _showCurrencyWidget: boolean = true;
  @observable private _showWebSites: boolean = true;
  @observable private _backgroundStarSpaceAnimation: boolean = true;
  @observable private _additionalOptions: boolean = false;
  [key: string]: any;

  async save() {
    try {
      setToStorage("options", {
        showWeatherWidget: this._showWeatherWidget,
        showCurrencyWidget: this._showCurrencyWidget,
        showWebSites: this._showWebSites,
        backgroundStarSpaceAnimation: this._backgroundStarSpaceAnimation,
        additionalOptions: this._additionalOptions,
      });
    } catch (err) {
      console.warn(err);
    }
  }

  async load(callback: () => void = () => {}) {
    try {
      const options = await getFromStorage<IOptions>("options");
      this._showWeatherWidget = options.showWeatherWidget;
      this._showCurrencyWidget = options.showCurrencyWidget;
      this._showWebSites = options.showWebSites;
      this._backgroundStarSpaceAnimation = options.backgroundStarSpaceAnimation;
      this._additionalOptions = options.additionalOptions;
    } catch (err) {
      console.info("Saved options configuration not found. Using defaults.");
    }

    callback();
  }

  @computed get showWebSites() {
    return this._showWebSites;
  }

  set showWebSites(value: boolean) {
    this._showWebSites = value;
    this.save();
  }

  @computed get showCurrencyWidget() {
    return this._showCurrencyWidget;
  }

  set showCurrencyWidget(value: boolean) {
    this._showCurrencyWidget = value;
    this.save();
  }

  @computed get showWeatherWidget() {
    return this._showWeatherWidget;
  }

  set showWeatherWidget(value: boolean) {
    this._showWeatherWidget = value;
    this.save();
  }

  @computed get backgroundStarSpaceAnimation() {
    return this._backgroundStarSpaceAnimation;
  }

  set backgroundStarSpaceAnimation(value: boolean) {
    this._backgroundStarSpaceAnimation = value;
    this.save();
  }

  @computed get additionalOptions() {
    return this._additionalOptions;
  }

  set additionalOptions(value: boolean) {
    this._additionalOptions = value;
    this.save();
  }
}

export const store = new OptionsStore();

export default store;
