/**
 * Entry point of the application.
 * Renders the root component and sets up the application provider.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import Provider from "./Provider";
import "@fontsource/inter";
import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";

const theme = extendTheme({ cssVarPrefix: "demo" });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssVarsProvider
      defaultMode="dark"
      theme={theme} // the selector to apply CSS theme variables stylesheet.
      colorSchemeSelector="#demo_dark-mode-by-default"
      //
      // the local storage key to use
      modeStorageKey="demo_dark-mode-by-default"
      //
      // set as root provider
      disableNestedContext
    >
      <Provider>
        <App />
      </Provider>
    </CssVarsProvider>
  </React.StrictMode>,
);
