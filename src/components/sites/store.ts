import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CommonStorageProvider } from "../../lib/storage/providers/CommonStorageProvider";
import { sites } from "../../store/demo/sites";

interface ISitesState {
  sites: ISite[];
  add: (site: ISite) => void;
  get: (index: number) => ISite | undefined;
  remove: (index: number) => void;
  update: (index: number, site: ISite) => void;
}

export const useSites = create(
  persist<ISitesState>(
    (set, get) => ({
      sites: sites,
      add: (site) => {
        set({
          sites: [...get().sites, site],
        });
      },
      get: (index) => {
        return get().sites[index];
      },
      remove: (index) => {
        set({
          sites: get().sites.filter(
            (site, currentIndex) => currentIndex !== index,
          ),
        });
      },
      update: (index, site) => {
        set({
          sites: get().sites.map((s, currentIndex) => {
            if (currentIndex === index) {
              return site;
            }

            return s;
          }),
        });
      },
    }),
    {
      name: "new-tab-pro-sites",
      storage: createJSONStorage(() => new CommonStorageProvider()),
    },
  ),
);

interface ISiteEditorState {
  index: number | null;
  setIndex: (index: this["index"]) => void;
  active: boolean;
  setActive: (active: this["active"]) => void;
}

export const useSiteEditor = create<ISiteEditorState>((set, get) => ({
  index: null,
  setIndex: (index) => set({ index }),
  active: false,
  setActive: (active) => set({ active }),
}));
