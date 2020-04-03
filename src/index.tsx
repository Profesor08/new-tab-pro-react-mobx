import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import options from "./store/options";

options.load(() => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
