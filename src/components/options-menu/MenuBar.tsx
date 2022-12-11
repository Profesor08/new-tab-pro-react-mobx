import React from "react";
import { observer } from "mobx-react";
import options from "../../store/options";
import bookmarks from "../../store/bookmarks/store";
import styled from "styled-components/macro";
import { theme } from "../../theme/theme-default";
import { runInAction } from "mobx";

const Icon = styled.i`
  font-style: normal;
  transition: ease color 0.2s;
`;

const MenuButton = styled.div`
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

const MenuContainer = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  user-select: none;
  z-index: 100;
`;

export const MenuBar = () => {
  return (
    <MenuContainer>
      <MenuButton
        onClick={() => {
          options.optionsPanelShow = true;
        }}
      >
        <Icon>☰</Icon>
      </MenuButton>
      <MenuButton
        onClick={() => {
          runInAction(() => {
            bookmarks.bookmarksPanelShow = true;
          });
        }}
      >
        <Icon>★</Icon>
      </MenuButton>
    </MenuContainer>
  );
};
