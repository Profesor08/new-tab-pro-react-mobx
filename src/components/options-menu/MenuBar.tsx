import React from "react";
import styled from "styled-components/macro";
import { theme } from "../../theme/theme-default";
import { useControls } from "../../store/options";
import { Tooltip } from "../tooltip/Tooltip";
import { OptionsPanel } from "./OptionsPanel";

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
  const openBookmarks = useControls((state) => state.openBookmarks);

  return (
    <MenuContainer>
      <Tooltip
        behavior="click"
        floatingProps={{
          placement: "right-start",
        }}
        toggle={({ reference, referenceProps, ...props }) => (
          <MenuButton ref={reference} {...referenceProps} {...props}>
            <Icon>☰</Icon>
          </MenuButton>
        )}
        content={() => <OptionsPanel />}
      />

      <MenuButton onClick={openBookmarks}>
        <Icon>★</Icon>
      </MenuButton>
    </MenuContainer>
  );
};
