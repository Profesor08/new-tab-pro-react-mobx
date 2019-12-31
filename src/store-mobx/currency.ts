import { observable } from "mobx";

export class CurrencyStore {
  @observable public currencies: ICurrencyItem[] = [];
  @observable public default: string = "MDL";
  @observable public displayCurrencies: string[] = [
    "USD",
    "EUR",
    "RUB",
    "UAH",
    "RON",
    "GBP",
  ];
}

export default new CurrencyStore();
