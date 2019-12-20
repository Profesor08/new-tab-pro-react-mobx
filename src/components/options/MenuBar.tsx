import React from "react";
import { observer } from "mobx-react";
import options from "../../store-mobx/options";
import styled from "styled-components";
import OptionsPanel from "./OptionsPanel";

const Icon = styled.i`
  font-style: normal;
  transition: ease color 0.2s;
`;

const MenuButton = styled.div.attrs({
  tabIndex: -1,
})`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 100%;
  width: var(--options-button-size);
  height: var(--options-button-size);
  background-color: var(--options-background-color);
  border: 2px solid var(--options-border-color);
  border-radius: var(--options-border-radius);
  color: var(--options-button-color);
  transition: ease all 0.2s;
  outline: none;

  &:hover,
  &:focus,
  &:focus-within {
    cursor: pointer;
    width: var(--options-hover-button-size);
    height: var(--options-hover-button-size);
    border-radius: var(--options-hover-border-radius);
    border-color: var(--options-hover-border-color);
    background-color: var(--options-hover-background-color);

    ${Icon} {
      color: var(--options-hover-button-color);
    }
  }
`;

const MenuBar = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  user-select: none;
  z-index: 100;
`;

export const Menu = observer(() => {
  return (
    <MenuBar>
      <MenuButton
        onFocus={() => {
          options.optionsPanelShow = true;
        }}
        onBlur={() => {
          options.optionsPanelShow = false;
        }}
      >
        <Icon>☰</Icon>
        <OptionsPanel />
      </MenuButton>
      <MenuButton onFocus={() => {}}>
        <Icon>★</Icon>
      </MenuButton>
    </MenuBar>
  );
});

export default Menu;
