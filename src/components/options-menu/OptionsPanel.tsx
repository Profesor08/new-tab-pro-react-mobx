import React from "react";
import { useOptions } from "../../store/options";
import styled from "styled-components/macro";
import { theme } from "../../theme/theme-default";
import { ActionButton, ActionMenu } from "../action-menu/ActionMenu";

const ButtonText = styled.div`
  transition: ease padding ${theme.animationSpeed};
  padding: 0 30px 0 0;
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

const OptionsPanelMenu = styled(ActionMenu)`
  background-color: ${theme.menuBarBackgroundColor};
  border: 2px solid ${theme.menuBarHoverBorderColor};
  box-shadow: 0 2px 6px ${theme.menuBarBorderColor};
`;

const OptionsPanelButton = styled(ActionButton)`
  grid-template-columns: 1fr auto;
  gap: 8px;
  color: ${theme.menuBarButtonColor};

  &:hover {
    background-color: ${theme.menuBarHoverBackgroundColor};
    cursor: pointer;
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
    <OptionsPanelButton onClick={onClick}>
      <ButtonText>{children}</ButtonText>
      <Icon active={active} />
    </OptionsPanelButton>
  );
};

export const OptionsPanel = () => {
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

  return (
    <OptionsPanelMenu>
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
    </OptionsPanelMenu>
  );
};
