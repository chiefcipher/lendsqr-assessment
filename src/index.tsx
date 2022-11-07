import React from "react";
import ReactDOM from "react-dom/client";
import "./sass/combine-styles.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
// TODO ADD HELMET
// TODO ADD REDUX probably
// TODO REMOVE PUBLIC REACT CONTENT
// TODO ADD TECHNOLOGIES TO README.MD
// TODO DOWNLOAD AVERNIR FONT
// TODO ADD TECHNICALITTIES ON HOW TO START APP IN README.MD 
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
