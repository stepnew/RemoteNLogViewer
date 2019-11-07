import React from "react";
import ThemeProvider from "./theme";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

const App: React.FunctionComponent = React.memo(() => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
});

export default App;
