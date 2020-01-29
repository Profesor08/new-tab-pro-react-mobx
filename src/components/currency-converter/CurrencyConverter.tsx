import React, { useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import store from "../../store/options";
import { useCurrencyData, selectInput } from "./utils";

const List = styled.div`
  margin: 200px 20px 0 40px;
  color: white;
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 3fr;
  grid-gap: 5px 10px;
  margin-bottom: 5px;
`;

const ListHeaderItem = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
`;

const HeaderCurrency = styled(ListHeaderItem)`
  grid-column: span 2;
`;

const HeaderCurrencyDefault = styled(ListHeaderItem)``;

const HeaderCurrencyRate = styled(ListHeaderItem)``;

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 3fr;
  grid-gap: 5px 10px;
  font-size: 0.8rem;
`;

const TextItem = styled.div`
  display: inline-flex;
  align-items: center;
`;

const CurrencyName = styled(TextItem)``;

const CurrencyInput = styled.input.attrs({
  type: "number",
  min: 0,
  step: 0.01,
})`
  width: 100%;
  min-width: 0;
  background-color: transparent;
  border: 0;
  outline: none;
  color: white;
`;

const CurrencyValue = styled(CurrencyInput)``;

const CurrencyNominal = styled(CurrencyInput)``;

const CurrencyRate = styled(TextItem)``;

const CurrencyItem = ({ currency }: { currency: ICurrencyItem }) => {
  const [nominal, setNominal] = useState(currency.nominal.toFixed(2));
  const [value, setValue] = useState(currency.value.toFixed(2));
  const rate = currency.value / currency.nominal;

  return (
    <ListItem>
      <CurrencyName>{currency.name}</CurrencyName>
      <CurrencyNominal
        value={nominal}
        onChange={e => {
          setNominal(e.target.value);
          setValue((Number(e.target.value) * rate).toFixed(2));
        }}
        onBlur={e => {
          if (e.target.value.length === 0) {
            setNominal(currency.nominal.toFixed(2));
            setValue(currency.value.toString());
          }
        }}
        onClick={selectInput}
      />
      <CurrencyValue
        value={value}
        onChange={e => {
          setValue(e.target.value);
          console.log(e.target.value);
          setNominal((Number(e.target.value) / rate).toFixed(2));
        }}
        onBlur={e => {
          if (e.target.value.length === 0) {
            setNominal(currency.nominal.toFixed(2));
            setValue(currency.value.toString());
          }
        }}
        onClick={selectInput}
      />
      <CurrencyRate>{currency.value}</CurrencyRate>
    </ListItem>
  );
};

export const CurrencyConverter = observer(() => {
  const [currencies, loaded] = useCurrencyData();

  if (store.showCurrencyWidget) {
    return (
      <List>
        <ListHeader>
          <HeaderCurrency>Currency</HeaderCurrency>
          <HeaderCurrencyDefault>MDL</HeaderCurrencyDefault>
          <HeaderCurrencyRate>Rate</HeaderCurrencyRate>
        </ListHeader>

        {currencies.map((currency, id) => {
          return (
            <CurrencyItem key={`currency-item-${id}`} currency={currency} />
          );
        })}
      </List>
    );
  }

  return null;
});
