type Palette = {
  themePrimary: string;
  themeLighterAlt: string;
  themeLighter: string;
  themeLight: string;
  themeTertiary: string;
  themeSecondary: string;
  themeDarkAlt: string;
  themeDark: string;
  themeDarker: string;
  neutralLighterAlt: string;
  neutralLighter: string;
  neutralLight: string;
  neutralQuaternaryAlt: string;
  neutralQuaternary: string;
  neutralTertiaryAlt: string;
  neutralTertiary: string;
  neutralSecondary: string;
  neutralPrimaryAlt: string;
  neutralPrimary: string;
  neutralDark: string;
  black: string;
  white: string;
};

type Font = {
  fontFamily: string;
};

export interface ITheme {
  palette: Palette;
  defaultFontStyle: Font;
}

const Theme: ITheme = {
  palette: {
    themePrimary: "#4f28ca",
    themeLighterAlt: "#f7f5fd",
    themeLighter: "#ded7f6",
    themeLight: "#c3b6ef",
    themeTertiary: "#8d74df",
    themeSecondary: "#603ed0",
    themeDarkAlt: "#4624b5",
    themeDark: "#3b1f99",
    themeDarker: "#2c1771",
    neutralLighterAlt: "#f8f8f8",
    neutralLighter: "#f4f4f4",
    neutralLight: "#eaeaea",
    neutralQuaternaryAlt: "#dadada",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c8c8",
    neutralTertiary: "#bab8b7",
    neutralSecondary: "#a3a2a0",
    neutralPrimaryAlt: "#8d8b8a",
    neutralPrimary: "#323130",
    neutralDark: "#605e5d",
    black: "#494847",
    white: "#ffffff"
  },
  defaultFontStyle: {
    fontFamily: "Raleway, sans-serif"
  }
};

export default Theme;
