import styled, { css } from "styled-components/macro";
import React from "react";
import { theme } from "../../theme/theme-default";
import { CloseButton } from "../buttons/CloseButton";

interface IPanelElementProps {
  active: boolean;
}

const PanelElement = styled.div<IPanelElementProps>`
  position: fixed;
  z-index: 100;
  top: 10px;
  left: 50%;
  transform: translate(-50%, 0);

  display: grid;
  grid-template-rows: auto 1fr;
  gap: 20px;

  width: 1000px;
  max-width: calc(100% - 28px - 28px);
  height: calc(100vh - 10px - 10px);
  padding: 16px;
  border-radius: 8px;

  color: #000000;
  background-color: #ffffff;
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0,
    rgba(60, 64, 67, 0.15) 0 2px 6px 2px;

  user-select: none;
  overflow: hidden;

  font-family: "Roboto Light", sans-serif;

  transition: ease opacity ${theme.animationSpeed},
    ease transform ${theme.animationSpeed}, ease left 0s;
  transition-delay: 0s, 0s, 0s;

  ${(p) =>
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
  display: grid;
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

const PanelHeaderContent = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 8px;
`;

const PanelHeaderElement = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.3fr;
  grid-template-areas: "content close";
  align-items: center;
  gap: 24px;

  ${PanelHeaderContent} {
    grid-area: content;
  }

  ${CloseButton} {
    justify-self: end;
    grid-area: close;
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
      <PanelHeaderContent>{children}</PanelHeaderContent>
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

  ${(props) =>
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

  ${(props) =>
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
  onClose?: () => void;
}

export const Panel = styled<Styled<IPanelProps>>(
  ({ active = false, children, onClose, ...props }) => {
    return (
      <PanelWrapper active={active}>
        <PanelBackdrop active={active} onClick={onClose} />
        <PanelElement active={active} {...props}>
          {children}
        </PanelElement>
      </PanelWrapper>
    );
  },
)``;
