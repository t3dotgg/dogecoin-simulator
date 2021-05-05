import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./Game";

import ReactGA from "react-ga";

if (import.meta.env.PROD) {
  ReactGA.initialize("UA-25660758-13", {
    gaOptions: { siteSpeedSampleRate: 100 },
  });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById("root")
);
