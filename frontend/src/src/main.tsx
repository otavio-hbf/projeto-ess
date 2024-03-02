/**
 * Entry point of the application.
 * Renders the root component and sets up the application provider.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import Provider from "./Provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
);
