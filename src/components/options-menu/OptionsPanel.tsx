import React, { useRef, useEffect, useCallback } from "react";
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
  const showOptionsPanel = useControls((state) => state.showOptionsPanel);
  const toggleOptionsPanel = useControls((state) => state.toggleOptionsPanel);
  const {
    showWeatherWidget,
    showCurrencyWidget,
    showWebSites,
    backgroundStarSpaceAnimation,
    additionalOptions,
    toggleWeatherWidget,
    toggleCurrencyWidget,
    toggleWebSites,
    toggleBackgroundStarSpaceAnimation,
    toggleAdditionalOptions,
  } = useOptions();

  const onPanelBlur = useCallback(() => {
    toggleOptionsPanel(false);
  }, [toggleOptionsPanel]);

  useEffect(() => {
    if (showOptionsPanel === true && ref.current !== null) {
      ref.current.focus();
    }
  }, [showOptionsPanel]);

  const onShowWeatherOptionClick = useCallback(() => {
    toggleWeatherWidget();
  }, [toggleWeatherWidget]);

  const onShowCurrencyOptionClick = useCallback(() => {
    toggleCurrencyWidget();
  }, [toggleCurrencyWidget]);

  const onShowSitesOptionClick = useCallback(() => {
    toggleWebSites();
  }, [toggleWebSites]);

  const onBackgroundStarSpaceOptionClick = useCallback(() => {
    toggleBackgroundStarSpaceAnimation();
  }, [toggleBackgroundStarSpaceAnimation]);

  const onAdditionalOptionsOptionClick = useCallback(() => {
    toggleAdditionalOptions();
  }, [toggleAdditionalOptions]);

  return (
    <Panel
      ref={ref}
      active={showOptionsPanel === true}
      tabIndex={-1}
      onBlur={onPanelBlur}
    >
      <OptionsButton
        active={showWeatherWidget}
        onClick={onShowWeatherOptionClick}
      >
        Show weather
      </OptionsButton>
      <OptionsButton
        active={showCurrencyWidget}
        onClick={onShowCurrencyOptionClick}
      >
        Show currency
      </OptionsButton>
      <OptionsButton active={showWebSites} onClick={onShowSitesOptionClick}>
        Show sites
      </OptionsButton>
      <OptionsButton
        active={backgroundStarSpaceAnimation}
        onClick={onBackgroundStarSpaceOptionClick}
      >
        Background Star Space
      </OptionsButton>
      <OptionsButton
        active={additionalOptions}
        onClick={onAdditionalOptionsOptionClick}
      >
        Additional Options
      </OptionsButton>
    </Panel>
  );
};
