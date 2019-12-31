import { cache } from "../../lib/cache";
import { useState } from "react";
import { useEffect } from "react";
import store from "../../store-mobx/currency";

export async function loadCurrencyData() {
  const response = await fetch(
    "https://proxy.e-webdev.ru/?url=" +
      escape(
        "https://www.bnm.md/ru/official_exchange_rates?get_xml=1&date=30.12.2019",
      ),
  );

  return await response.text();
}

const text = (element: Element | null) => {
  if (element !== null) {
    return element.textContent;
  }

  return null;
};

export function parseCurrencyData(html: string): ICurrencyItem[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/xml");

  return Array.from(doc.querySelectorAll("Valute")).map(valute => {
    const CharCode = text(valute.querySelector("CharCode"));
    const Nominal = text(valute.querySelector("Nominal"));
    const Value = text(valute.querySelector("Value"));

    const name: string = CharCode || "-/-";
    const nominal: number = Number(Nominal);
    const value: number = Number(Value);

    return {
      name: name,
      nominal: nominal,
      value: value,
    };
  });
}

export async function getCurrencyData(): Promise<ICurrencyItem[]> {
  try {
    const currencyData: ICurrencyItem[] = await cache(
      "currencyData",
      async () => {
        return parseCurrencyData(await loadCurrencyData());
      },
    );

    return currencyData.filter(currency => {
      return store.displayCurrencies.includes(currency.name);
    });
  } catch (err) {
    console.warn(err);
    return [];
  }
}

export function useCurrencyData(): [ICurrencyItem[], boolean] {
  const [data, setData] = useState<ICurrencyDataState>({
    currencyData: [],
    loaded: false,
  });

  useEffect(() => {
    const load = async () => {
      setData({
        currencyData: await getCurrencyData(),
        loaded: true,
      });
    };

    if (data.loaded === false) {
      load();
    }
  }, [data.loaded]);

  return [data.currencyData, data.loaded];
}

export const selectInput = (() => {
  let targetInput: Node | null = null;

  return (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const target = e.target as HTMLTextAreaElement;

    if (target.isSameNode(targetInput) === false) {
      target.select();
    }

    targetInput = target;
  };
})();
