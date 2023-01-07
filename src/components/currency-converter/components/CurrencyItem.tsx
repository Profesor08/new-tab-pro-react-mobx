import React, { useState, useCallback } from "react";
import {
  ListItem,
  CurrencyName,
  CurrencyNominal,
  CurrencyValue,
  CurrencyRate,
} from "./List";

export const CurrencyItem = ({
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
