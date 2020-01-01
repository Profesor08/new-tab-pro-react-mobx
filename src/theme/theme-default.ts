type Color = number;
type Alpha = number;

const rgba = (r: Color, g: Color, b: Color, a: Alpha = 1): string => {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const rgb = (r: Color, g: Color, b: Color): string => rgba(r, g, b, 1);

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
