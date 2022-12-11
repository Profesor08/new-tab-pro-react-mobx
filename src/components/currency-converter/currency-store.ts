import { atom } from "recoil";
import { ICurrencyConverterState } from "./types";

export const currencyConverterState = atom<ICurrencyConverterState>({
  key: "currencyConverterState",
  default: {
    loaded: false,
  },
});
