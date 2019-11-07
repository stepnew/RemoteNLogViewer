import React from "react";
import { ThemeProvider as ThemeProviderEmotion } from "emotion-theming";
import { loadTheme, registerIcons } from "office-ui-fabric-react";
import { Global } from "@emotion/core";

import theme from "./config";
import global from "./global";
import icons from "./icons";

loadTheme(theme);
registerIcons(icons);

const ThemeProvider: React.FunctionComponent = React.memo(({ children }) => (
  <ThemeProviderEmotion theme={theme}>
    <Global styles={global} />
    {children}
  </ThemeProviderEmotion>
));

export default ThemeProvider;
