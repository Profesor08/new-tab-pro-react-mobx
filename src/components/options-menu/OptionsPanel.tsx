import React, { useRef, useEffect, useState } from "react";
import { observer } from "mobx-react";
import options from "../../store/options";
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

export const OptionsPanel = observer(() => {
  const ref: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
  const [active, setActive] = useState(options.optionsPanelShow);

  useEffect(() => {
    setActive(options.optionsPanelShow);
  }, [options.optionsPanelShow]);

  useEffect(() => {
    if (active && ref.current !== null) {
      ref.current.focus();
    }
  }, [ref.current, active]);

  return (
    <Panel
      ref={ref}
      active={active}
      tabIndex={-1}
      onBlur={() => {
        options.optionsPanelShow = false;
      }}
    >
      <OptionsButton
        active={options.showWeatherWidget}
        onClick={() => {
          options.showWeatherWidget = !options.showWeatherWidget;
        }}
      >
        Show weather
      </OptionsButton>
      <OptionsButton
        active={options.showCurrencyWidget}
        onClick={() => {
          options.showCurrencyWidget = !options.showCurrencyWidget;
        }}
      >
        Show currency
      </OptionsButton>
      <OptionsButton
        active={options.showWebSites}
        onClick={() => {
          options.showWebSites = !options.showWebSites;
        }}
      >
        Show sites
      </OptionsButton>
      <OptionsButton
        active={options.backgroundStarSpaceAnimation}
        onClick={() => {
          options.backgroundStarSpaceAnimation = !options.backgroundStarSpaceAnimation;
        }}
      >
        Background Star Space
      </OptionsButton>
      <OptionsButton
        active={options.additionalOptions}
        onClick={() => {
          options.additionalOptions = !options.additionalOptions;
        }}
      >
        Additional Options
      </OptionsButton>
    </Panel>
  );
});
