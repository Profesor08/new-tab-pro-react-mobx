import React from "react";
import { useCurrencyData } from "../store";
import { CurrencyItem } from "./CurrencyItem";
import {
  List,
  ListHeader,
  HeaderCurrency,
  HeaderCurrencyDefault,
  HeaderCurrencyRate,
} from "./List";

export const CurrencyConverterWidget = () => {
  const { data } = useCurrencyData();

  if (data !== undefined) {
    const { base, success, rates } = data;

    if (success === true) {
      return (
        <List>
          <ListHeader>
            <HeaderCurrency>Currency</HeaderCurrency>
            <HeaderCurrencyDefault>{base}</HeaderCurrencyDefault>
            <HeaderCurrencyRate>Rate</HeaderCurrencyRate>
          </ListHeader>

          {Object.entries(rates).map(([currency, rate]) => (
            <CurrencyItem
              key={`currency-item-${currency}`}
              currency={currency}
              rate={rate}
            />
          ))}
        </List>
      );
    }
  }

  return null;
};
