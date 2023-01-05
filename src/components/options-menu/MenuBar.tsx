import React, { useCallback } from "react";
import { useControls } from "../../store/options";
import styled from "styled-components/macro";
import { theme } from "../../theme/theme-default";

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
  const toggleOptionsPanel = useControls((state) => state.toggleOptionsPanel);
  const toggleAddSiteForm = useControls((state) => state.toggleAddSiteForm);

  const onOptionsButtonClick = useCallback(() => {
    toggleOptionsPanel();
  }, [toggleOptionsPanel]);

  const onAddSiteFormButtonClick = useCallback(() => {
    toggleAddSiteForm();
  }, [toggleAddSiteForm]);

  return (
    <MenuContainer>
      <MenuButton onClick={onOptionsButtonClick}>
        <Icon>☰</Icon>
      </MenuButton>
      <MenuButton onClick={onAddSiteFormButtonClick}>
        <Icon>★</Icon>
      </MenuButton>
    </MenuContainer>
  );
};
