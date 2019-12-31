declare interface ICurrencyItem {
  name: string;
  nominal: number;
  value: number;
}

declare interface ICurrencyDataState {
  currencyData: ICurrencyItem[];
  loaded: boolean;
}
