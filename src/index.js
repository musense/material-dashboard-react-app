import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.6.0";
import configureStore from './store/configureStore'
import { Provider } from "react-redux";
import App from './App'

const hist = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={hist}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
