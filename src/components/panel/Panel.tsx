import styled, { css } from "styled-components";
import React, { useEffect, useRef } from "react";
import { theme } from "../../theme/theme-default";
import { CloseButton } from "../buttons/CloseButton";

interface IPanelElementProps {
  active: boolean;
}

const PanelElement = styled.div.attrs({
  tabIndex: -1,
})<IPanelElementProps>`
  position: fixed;
  z-index: 100;
  height: calc(100vh - 10px - 10px);
  width: 1000px;
  max-width: calc(100% - 28px - 28px);
  transform: translate(-50%, 0);
  left: 50%;
  top: 10px;
  background: white;
  color: black;
  padding: 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0,
    rgba(60, 64, 67, 0.15) 0 1px 3px 1px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: "Roboto Light", sans-serif;
  user-select: none;
  transition: ease opacity ${theme.animationSpeed},
    ease transform ${theme.animationSpeed}, ease left 0s;
  transition-delay: 0s, 0s, 0s;

  ${p =>
    !p.active
      ? css`
          opacity: 0;
          transform: translate(-50%, 20px);
          left: -99999px;
          transition-delay: 0s, 0s, ${theme.animationSpeed};
        `
      : null}
`;

export const PanelBody = styled.div`
  flex: 1;
  margin-top: 20px;
  display: flex;
  overflow: hidden;
`;

export const PanelContainer = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  position: relative;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
  }
`;

const PanelHeaderElement = styled.div`
  display: flex;
  align-items: center;

  ${CloseButton} {
    margin-left: auto;
  }
`;

interface IPanelHeaderProps extends React.HTMLAttributes<HTMLElement> {
  onClose: () => void;
}

export const PanelHeader = ({
  onClose,
  className,
  children,
  ...rest
}: IPanelHeaderProps) => {
  return (
    <PanelHeaderElement className={className} {...rest}>
      {children}
      <CloseButton onClick={onClose} />
    </PanelHeaderElement>
  );
};

interface IPanelWrapperProps {
  active?: boolean;
}

const PanelWrapper = styled.div<IPanelWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  overflow: hidden;
  transition: transform ease 0s;
  transition-delay: 0s;

  ${props =>
    props.active
      ? css`
          transform: translateX(0);
        `
      : css`
          transform: translateX(-99999px);
          transition-delay: 0.3s;
        `}
`;

interface IPanelBackdropProps {
  active?: boolean;
}

const PanelBackdrop = styled.div<IPanelBackdropProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  transition: ease opacity 0.3s;

  ${props =>
    props.active
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}
`;

interface IPanelProps {
  active: boolean;
  [key: string]: any;
}

export const Panel = ({
  active = false,
  children,
  className,
  onClose,
  ...rest
}: IPanelProps) => {
  return (
    <PanelWrapper active={active}>
      <PanelBackdrop active={active} onClick={onClose} />
      <PanelElement active={active} className={className} {...rest}>
        {children}
      </PanelElement>
    </PanelWrapper>
  );
};
