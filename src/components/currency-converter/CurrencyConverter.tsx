import React from "react";
import { useOptions } from "../../store/options";
import { queryClient } from "./store";
import { QueryClientProvider } from "react-query";
import { CurrencyConverterWidget } from "./components/CurrencyConverterWidget";

export const CurrencyConverter = () => {
  const showCurrencyWidget = useOptions((state) => state.showCurrencyWidget);

  if (showCurrencyWidget === true) {
    return (
      <QueryClientProvider client={queryClient}>
        <CurrencyConverterWidget />
      </QueryClientProvider>
    );
  }

  return null;
};
