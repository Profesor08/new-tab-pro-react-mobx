import React, { useCallback, useState } from "react";
import styled from "styled-components/macro";
import options from "../../store/options";
import { RecoilRoot, useRecoilState } from "recoil";
import { currencyConverterState } from "./currency-store";
import { getCurrencyData } from "./utils";

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

const CurrencyItem = ({
  currency,
  rate,
}: {
  currency: string;
  rate: number;
}) => {
  const [nominal, setNominal] = useState((1).toFixed(2));
  const [value, setValue] = useState((1 / rate).toFixed(2));
  const [activeInput, setActiveInput] = useState<HTMLInputElement | null>(null);

  const selectInput = useCallback(
    (event: React.MouseEvent) => {
      if (event.currentTarget instanceof HTMLInputElement) {
        if (event.currentTarget.isSameNode(activeInput) === false) {
          event.currentTarget.select();
        }

        setActiveInput(event.currentTarget);
      }
    },
    [activeInput],
  );

  return (
    <ListItem>
      <CurrencyName>{currency}</CurrencyName>
      <CurrencyNominal
        value={nominal}
        onChange={(e) => {
          setNominal(e.target.value);
          setValue((Number(e.target.value) / rate).toFixed(2));
        }}
        onBlur={(e) => {
          if (e.target.value.length === 0) {
            setNominal((1).toFixed(2));
            setValue((1 / rate).toFixed(2));
          }
        }}
        onClick={selectInput}
      />
      <CurrencyValue
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setNominal((Number(e.target.value) * rate).toFixed(2));
        }}
        onBlur={(e) => {
          if (e.target.value.length === 0) {
            setNominal((1).toFixed(2));
            setValue((1 / rate).toFixed(2));
          }
        }}
        onClick={selectInput}
      />
      <CurrencyRate>{(1 / rate).toFixed(4)}</CurrencyRate>
    </ListItem>
  );
};

const CurrencyConverterWidget = () => {
  const [state] = useRecoilState(currencyConverterState);

  if (state.loaded === true) {
    const { base, success, rates } = state.data;

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

export const CurrencyConverter = () => {
  if (options.showCurrencyWidget === true) {
    return (
      <RecoilRoot
        initializeState={async ({ set }) => {
          set(currencyConverterState, {
            loaded: true,
            data: await getCurrencyData(),
          });
        }}
      >
        <CurrencyConverterWidget />
      </RecoilRoot>
    );
  }

  return null;
};
