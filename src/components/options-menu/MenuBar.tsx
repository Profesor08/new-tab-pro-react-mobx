import React from "react";
import { observer } from "mobx-react";
import options from "../../store-mobx/options";
import bookmarks from "../../store-mobx/bookmarks";
import styled from "styled-components";
import { theme } from "../../theme/theme-default";

const Icon = styled.i.attrs({
  className: "icon",
})`
  font-style: normal;
  transition: ease color 0.2s;
`;

const MenuButton = styled.div.attrs({
  className: "menu-button",
})`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 100%;
  width: ${theme.menuBarButtonSize};
  height: ${theme.menuBarButtonSize};
  background-color: ${theme.menuBarBackgroundColor};
  border: 2px solid ${theme.menuBarBorderColor};
  border-radius: ${theme.menuBarBorderRadius};
  color: ${theme.menuBarButtonColor};
  transition: ease all 0.2s;
  outline: none;

  &:hover {
    cursor: pointer;
    width: ${theme.menuBarHoverButtonSize};
    height: ${theme.menuBarHoverButtonSize};
    border-radius: ${theme.menuBarHoverBorderRadius};
    border-color: ${theme.menuBarHoverBorderColor};
    background-color: ${theme.menuBarHoverBackgroundColor};

    ${Icon} {
      color: ${theme.menuBarHoverButtonColor};
    }
  }
`;

const MenuBar = styled.div.attrs({
  className: "menu-bar",
})`
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
        onClick={() => {
          options.optionsPanelShow = true;
        }}
      >
        <Icon>☰</Icon>
      </MenuButton>
      <MenuButton
        onClick={() => {
          bookmarks.bookmarksPanelShow = true;
        }}
      >
        <Icon>★</Icon>
      </MenuButton>
    </MenuBar>
  );
});

export default Menu;
