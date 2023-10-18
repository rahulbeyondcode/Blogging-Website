import React from "react";
import ReactDOM from "react-dom";
import dotenv from "dotenv";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import store from "./Store";
import 'react-notifications/lib/notifications.css';
import "./Assets/Styles/style.css";
import * as serviceWorker from "./serviceWorker";

dotenv.config();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
