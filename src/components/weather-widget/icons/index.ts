// солнечно
import { sunny } from "./sunny";

// в основном солнечно
import { mostlySunny } from "./mostlySunny";

// переменная облачность
import { partlyCloudy } from "./partlyCloudy";

// облачно
import { mostlyCloudy } from "./mostlyCloudy";

// пасмурно
import { cloudyDay } from "./cloudyDay";

// моросит
import { mixedSleet } from "./mixedSleet";

// временами дожди
import { scatteredShowersDay } from "./scatteredShowersDay";

// ливни
import { showersDay } from "./showersDay";

// временами грозы
import { isolatedStormsShowersDay } from "./isolatedStormsShowersDay";

// грозы
import { isolatedStormsDay } from "./isolatedStormsDay";

// дождь со снегом
import { winteryMixDay } from "./winteryMixDay";

// снег
import { snowShowersDay } from "./snowShowersDay";

export const showerRain = mostlySunny;

export const rain = mostlySunny;

export const thunderStorm = mostlySunny;

export const snow = mostlySunny;

export const mist = mostlyCloudy;

export default {
  sunny,
  mostlySunny,
  partlyCloudy,
  mostlyCloudy,

  cloudyDay,
  mixedSleet,
  scatteredShowersDay,
  showersDay,

  isolatedStormsShowersDay,
  isolatedStormsDay,
  winteryMixDay,
  snowShowersDay,

  showerRain,
  rain,
  thunderStorm,
  snow,
  mist,
};
