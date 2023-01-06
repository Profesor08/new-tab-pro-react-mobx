import React, { useRef, useEffect } from "react";
import { useControls, useOptions } from "../../store/options";
import styled, { css } from "styled-components/macro";
import { theme } from "../../theme/theme-default";

interface IPanelProps {
  active?: boolean;
}

const Panel = styled.div<IPanelProps>`
  position: fixed;
  top: 10px;
  left: 0;
  transform: translate(-100%, 0);
  opacity: 0;
  background-color: ${theme.optionsPanelBackground};
  border: 2px solid ${theme.optionsPanelBorderColor};
  color: ${theme.optionsPanelColor};
  z-index: 200;
  display: flex;
  flex-direction: column;
  transition: ease opacity 0.3s, ease transform 0.3s;
  outline: none;
  user-select: none;

  ${(p) =>
    p.active
      ? css`
          transform: translate(50px, 0);
          opacity: 1;
        `
      : null}
`;

const ButtonText = styled.div`
  transition: ease padding ${theme.animationSpeed};
  padding: 0 30px 0 0;
`;

const Button = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 5px;
  border-top: 1px solid #434343;
  font-size: 0.8rem;
  background-color: transparent;
  transition: ease background-color ${theme.animationSpeed};
  white-space: nowrap;
`;

interface IIconProps {
  active?: boolean;
}

const Icon = styled.span<IIconProps>`
  display: block;
  color: ${(props) => (props.active ? "green" : "grey")};
  font-size: 16px;
  line-height: 100%;
  transition: ease color ${theme.animationSpeed};

  &:before {
    content: ${(props) => (props.active ? "'☑'" : "'☐'")};
  }
`;

interface IOptionsButtonProps {
  active?: boolean;
  children?: React.ReactChild;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const OptionsButton = ({
  active = false,
  children,
  onClick,
}: IOptionsButtonProps) => {
  return (
    <Button onClick={onClick}>
      <ButtonText>{children}</ButtonText>
      <Icon active={active} />
    </Button>
  );
};

export const OptionsPanel = () => {
  const ref: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
  const optionsPanel = useControls((state) => state.optionsPanel);
  const closeOptionsPanel = useControls((state) => state.closeOptionsPanel);
  const weather = useOptions((state) => state.weather);
  const toggleWeather = useOptions((state) => state.toggleWeather);
  const currency = useOptions((state) => state.currency);
  const toggleCurrency = useOptions((state) => state.toggleCurrency);
  const sites = useOptions((state) => state.sites);
  const toggleSites = useOptions((state) => state.toggleSites);
  const starSpace = useOptions((state) => state.starSpace);
  const toggleStarSpace = useOptions((state) => state.toggleStarSpace);
  const controls = useOptions((state) => state.controls);
  const toggleControls = useOptions((state) => state.toggleControls);

  useEffect(() => {
    if (optionsPanel === true && ref.current !== null) {
      ref.current.focus();
    }
  }, [optionsPanel]);

  return (
    <Panel
      ref={ref}
      active={optionsPanel === true}
      tabIndex={-1}
      onBlur={closeOptionsPanel}
    >
      <OptionsButton active={weather} onClick={toggleWeather}>
        Show weather
      </OptionsButton>
      <OptionsButton active={currency} onClick={toggleCurrency}>
        Show currency
      </OptionsButton>
      <OptionsButton active={sites} onClick={toggleSites}>
        Show sites
      </OptionsButton>
      <OptionsButton active={starSpace} onClick={toggleStarSpace}>
        Background Star Space
      </OptionsButton>
      <OptionsButton active={controls} onClick={toggleControls}>
        Additional Options
      </OptionsButton>
    </Panel>
  );
};
