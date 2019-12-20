import React from "react";
import { observer } from "mobx-react";
import options from "../../store-mobx/options";
import styled from "styled-components";

interface IPanelProps {
  active?: boolean;
}

const Panel = styled.div<IPanelProps>`
  position: fixed;
  top: 10px;
  left: 0;
  transform: ${props =>
    props.active ? "translate(50px, 0)" : "translate(-100%, 0)"};
  opacity: ${props => (props.active ? 1 : 0)};
  background-color: var(--options-panel-background);
  border: 2px solid var(--options-panel-border-color);
  color: var(--options-panel-color);
  z-index: 200;
  display: flex;
  flex-direction: column;
  transition: ease opacity 0.3s, ease transform 0.3s;
`;

const ButtonText = styled.div`
  transition: ease padding var(--animation-speed);
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
  transition: ease background-color var(--animation-speed);
  white-space: nowrap;
`;

interface IIconProps {
  active?: boolean;
}

const Icon = styled.span<IIconProps>`
  display: block;
  color: ${props => (props.active ? "green" : "grey")};
  font-size: 16px;
  line-height: 100%;
  transition: ease color var(--animation-speed);

  &:before {
    content: ${props => (props.active ? "'☑'" : "'☐'")};
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
  return (
    <Panel active={options.optionsPanelShow}>
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

export default OptionsPanel;
