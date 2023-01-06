import { observable, computed } from "mobx";
import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CommonStorageProvider } from "../lib/storage/providers/CommonStorageProvider";
import { getFromStorage, setToStorage } from "../lib/storage/storage";

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
      const options = await getFromStorage<any>("options");
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

interface IAddSiteState {
  readonly addSite: boolean;
  readonly openAddSite: () => void;
  readonly closeAddSite: () => void;
  readonly toggleAddSite: () => void;
}

interface IBookmarksState {
  readonly bookmarks: boolean;
  readonly openBookmarks: () => void;
  readonly closeBookmarks: () => void;
  readonly toggleBookmarks: () => void;
}

export const useControls = create<IAddSiteState & IBookmarksState>((set) => ({
  bookmarks: false,
  openBookmarks: () => set({ bookmarks: true }),
  closeBookmarks: () => set({ bookmarks: false }),
  toggleBookmarks: () => set((state) => ({ bookmarks: !state.bookmarks })),

  addSite: false,
  openAddSite: () => set({ addSite: true }),
  closeAddSite: () => set({ addSite: false }),
  toggleAddSite: () => set((state) => ({ addSite: !state.addSite })),
}));

interface IWeatherState {
  readonly weather: boolean;
  readonly openWeather: () => void;
  readonly closeWeather: () => void;
  readonly toggleWeather: () => void;
}

interface ICurrencyState {
  readonly currency: boolean;
  readonly openCurrency: () => void;
  readonly closeCurrency: () => void;
  readonly toggleCurrency: () => void;
}

interface ISitesState {
  readonly sites: boolean;
  readonly openSites: () => void;
  readonly closeSites: () => void;
  readonly toggleSites: () => void;
}

interface IStarSpaceState {
  readonly starSpace: boolean;
  readonly openStarSpace: () => void;
  readonly closeStarSpace: () => void;
  readonly toggleStarSpace: () => void;
}

interface IControlsState {
  readonly controls: boolean;
  readonly openControls: () => void;
  readonly closeControls: () => void;
  readonly toggleControls: () => void;
}

type IPersitedOptionsState = IWeatherState &
  ICurrencyState &
  ISitesState &
  IStarSpaceState &
  IControlsState;

export const useOptions = create(
  persist<IPersitedOptionsState>(
    (set) => ({
      weather: true,
      openWeather: () => set({ weather: true }),
      closeWeather: () => set({ weather: false }),
      toggleWeather: () => set((state) => ({ weather: !state.weather })),

      currency: true,
      openCurrency: () => set({ currency: true }),
      closeCurrency: () => set({ currency: false }),
      toggleCurrency: () => set((state) => ({ currency: !state.currency })),

      sites: true,
      openSites: () => set({ sites: true }),
      closeSites: () => set({ sites: false }),
      toggleSites: () => set((state) => ({ sites: !state.sites })),

      starSpace: true,
      openStarSpace: () => set({ starSpace: true }),
      closeStarSpace: () => set({ starSpace: false }),
      toggleStarSpace: () => set((state) => ({ starSpace: !state.starSpace })),

      controls: true,
      openControls: () => set({ controls: true }),
      closeControls: () => set({ controls: false }),
      toggleControls: () => set((state) => ({ controls: !state.controls })),
    }),
    {
      name: "new-tab-pro-options",
      storage: createJSONStorage(() => new CommonStorageProvider()),
    },
  ),
);
