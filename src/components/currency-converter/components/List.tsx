import styled from "styled-components";

export const List = styled.div`
  margin: 200px 20px 0 40px;
  color: white;
`;

export const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 3fr;
  grid-gap: 5px 10px;
  margin-bottom: 5px;
`;

export const ListHeaderItem = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
`;

export const HeaderCurrency = styled(ListHeaderItem)`
  grid-column: span 2;
`;

export const HeaderCurrencyDefault = styled(ListHeaderItem)``;

export const HeaderCurrencyRate = styled(ListHeaderItem)``;

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 3fr;
  grid-gap: 5px 10px;
  font-size: 0.8rem;
`;

export const TextItem = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const CurrencyName = styled(TextItem)``;

export const CurrencyInput = styled.input.attrs({
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

export const CurrencyValue = styled(CurrencyInput)``;

export const CurrencyNominal = styled(CurrencyInput)``;

export const CurrencyRate = styled(TextItem)``;
