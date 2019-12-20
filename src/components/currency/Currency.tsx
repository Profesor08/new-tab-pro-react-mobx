import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import store from "../../store-mobx/options";
import { cache } from "../../lib/cache";
import "./currency.scss";

const apiKey = `2d33699c560793a723e61cd5f53a1351`;
const currencyVolutes = ["USD", "EUR", "RUB", "UAH", "RON", "GBP"];
const baseCurrency = "MDL";

async function getJson(url: string, params: UrlParams = {}) {
  const query = Object.keys(params)
    .map(key => {
      return `${key}=${params[key]}`;
    })
    .join("&");

  const response = await fetch(url + query);

  return await response.json();
}

interface UrlParams {
  [key: string]: string | number;
}

async function getCurrencyInfo(): Promise<CurrencyInfo> {
  const params: UrlParams = {
    access_key: apiKey,
    format: 1,
    currencies: baseCurrency + "," + currencyVolutes.join(","),
  };

  try {
    const url = `http://www.apilayer.net/api/live?`;
    const currencyInfo: CurrencyInfo = await getJson(url, params);

    return currencyInfo;
  } catch (err) {
    console.warn("Error while getting the currency info:");
    console.warn(err);

    const error: CurrencyInfo = {
      success: false,
      error: {
        message: err.message,
      },
    };

    return error;
  }
}

interface CurrencyInfo {
  readonly success?: boolean;
  readonly error?: CurrencyInfoError;
  readonly source?: string;
  readonly quotes?: {
    readonly [key: string]: number;
  };
}

interface CurrencyInfoError {
  message: string;
}

const useCurrencyApi = (): [CurrencyInfo | null, boolean] => {
  const [data, setData] = useState({
    currencyData: null,
    loaded: false,
  });

  useEffect(() => {
    const load = async () => {
      const currencyData = await cache("currencyData", async () => {
        return await getCurrencyInfo();
      });

      setData({
        currencyData: currencyData,
        loaded: true,
      });
    };

    if (data.loaded === false) {
      load();
    }
  }, [data.loaded]);

  return [data.currencyData, data.loaded];
};

interface CurrencyError {
  message: string;
}

interface CurrencyState {
  currencies: CurrencyItem[];
  error: CurrencyError | null;
}

interface CurrencyItem {
  formInitialNominal: string;
  formInitialResult: string;
  formNominal: string;
  formResult: string;
  name: string;
  nominal: number;
  result: number;
  value: number;
}

let targetInput: Node | null = null;

const selectInput = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
  const target = e.target as HTMLTextAreaElement;

  if (target.isSameNode(targetInput) === false) {
    target.select();
  }

  targetInput = target;
};

interface ICurrencyConverterItemProps {
  currency: CurrencyItem;
}

const CurrencyConverterItem = ({ currency }: ICurrencyConverterItemProps) => {
  const formNominal = currency.formNominal;
  const formResult = currency.formResult;
  const [nominal, setNominal] = useState(formNominal);
  const [result, setResult] = useState(formResult);

  return (
    <div className="currency-row">
      <div className="nominal">
        <div className="name">{currency.name}</div>
        <input
          type="number"
          min={0}
          step={0.01}
          value={nominal}
          onChange={e => {
            setNominal(e.target.value);
            setResult((Number(e.target.value) * currency.value).toFixed(2));
          }}
          onBlur={e => {
            if (e.target.value.length === 0) {
              setNominal(formResult);
              setResult((Number(e.target.value) * currency.value).toFixed(2));
            }
          }}
          onClick={e => selectInput(e)}
        />
      </div>
      <div className="result">
        <input
          type="tel"
          pattern="[0-9]+([\.,][0-9]+)?"
          min={0}
          step={0.01}
          value={result}
          onChange={e => {
            setResult(e.target.value);
            setNominal((Number(e.target.value) / currency.value).toFixed(2));
          }}
          onBlur={e => {
            if (e.target.value.length === 0) {
              setResult(formResult);
              setNominal((Number(e.target.value) / currency.value).toFixed(2));
            }
          }}
          onClick={e => selectInput(e)}
        />
      </div>
      <div className="value">{currency.value}</div>
    </div>
  );
};

export const Currency = observer(() => {
  if (store.showCurrencyWidget) {
    const [currencyData, loaded] = useCurrencyApi();

    if (loaded && currencyData && currencyData.quotes) {
      const quotes = currencyData.quotes;

      const main = quotes[currencyData.source + baseCurrency];

      const currencies = currencyVolutes.map(currency => {
        const nominal = parseFloat((1).toFixed(2));

        const result = parseFloat(
          (main / quotes[currencyData.source + currency]).toFixed(2),
        );

        const value = parseFloat(
          (main / quotes[currencyData.source + currency]).toFixed(4),
        );

        return {
          name: currency,
          nominal: nominal,
          result: result,
          formNominal: nominal.toFixed(2),
          formResult: result.toFixed(2),
          formInitialNominal: nominal.toFixed(2),
          formInitialResult: result.toFixed(2),
          value: value,
        };
      });

      return (
        <div className="currency">
          <div className="currency-header">
            <div className="title">Волюта</div>
            <div className="selected">MDL</div>
            <div className="rate">Курс</div>
          </div>
          {currencies.map((currency: CurrencyItem, index: number) => {
            return <CurrencyConverterItem currency={currency} key={index} />;
          })}
        </div>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
});

export default Currency;
