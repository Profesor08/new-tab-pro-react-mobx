import { Color } from "../lib/color";
import { css } from "styled-components";

const rgba = (r: number, g: number, b: number, a: number = 1): string => {
  return new Color(r, g, b, a).get();
};

const rgb = (r: number, g: number, b: number): string => rgba(r, g, b, 1);

const theme: {
  [key: string]: string | number;
} = {};

theme.mainBorderColor = rgba(255, 51, 0, 0.2);
theme.mainHoverBorderColor = "#4B7BEF";
theme.mainHoverTextColor = "#4B7BEF";

theme.animationSpeed = ".3s";

theme.menuBarButtonSize = "30px";
theme.menuBarButtonColor = "white";
theme.menuBarBackgroundColor = "#343434";
theme.menuBarBorderColor = theme.mainBorderColor;
theme.menuBarBorderRadius = "50%";
theme.menuBarHoverButtonSize = "30px";
theme.menuBarHoverButtonColor = theme.mainHoverTextColor;
theme.menuBarHoverBackgroundColor = "#444444";
theme.menuBarHoverBorderColor = theme.mainHoverBorderColor;
theme.menuBarHoverBorderRadius = "50%";

theme.optionsPanelBackground = "#343434";
theme.optionsPanelBorderColor = theme.mainBorderColor;
theme.optionsPanelColor = "white";

theme.siteBorderColor = rgba(119, 14, 168, 0.37);
theme.siteBackgroundColor = rgba(11, 16, 45, 0.4);
theme.siteNameColor = rgb(200, 200, 200);
theme.siteAddButtonIconColor = rgba(119, 14, 168, 1);
theme.siteHoverBorderColor = rgba(255, 14, 168, 0.37);
theme.siteHoverBackgroundColor = rgba(255, 255, 255, 0.08);
theme.siteHoverNameColor = rgba(255, 255, 255);
theme.siteActiveBorderColor = rgba(255, 14, 168, 0.37);
theme.siteActiveBackgroundColor = rgba(255, 255, 255, 0.1);
theme.siteActiveNameColor = rgba(255, 255, 255, 1);

export { theme };

export const colors = {
  primary: new Color(25, 118, 210, 1),
  secondary: new Color(220, 0, 78, 1),
  error: new Color(244, 67, 54, 1),
  warning: new Color(255, 160, 0, 1),
  info: new Color(25, 118, 210, 1),
  success: new Color(56, 142, 60, 1),
};

interface IThemeColorMixinProps {
  primary?: true;
  secondary?: true;
  error?: true;
  warning?: true;
  info?: true;
  success?: true;
  warn?: true;
  danger?: true;
}

export const themeColorMixin = ({
  primary,
  secondary,
  error,
  warning,
  info,
  success,
  warn,
  danger,
}: IThemeColorMixinProps) => {
  const getColor = (a: number) => {
    if (primary) return colors.primary.alpha(a);
    if (secondary) return colors.secondary.alpha(a);
    if (error || danger) return colors.error.alpha(a);
    if (warning || warn) return colors.warning.alpha(a);
    if (info) return colors.info.alpha(a);
    if (success) return colors.success.alpha(a);
    return primary;
  };

  return css`
    color: ${getColor(1)};

    &:hover {
      background-color: ${getColor(0.08)};
    }

    &:active {
      background-color: ${getColor(0.2)};
    }
  `;
};
