import React from "react";
import ReactDOM from "react-dom/client";


import "assets/css/material-dashboard-react.css?v=1.6.0";
import configureStore from './store/configureStore'
import { Provider } from "react-redux";

import RouterIndex from "router";
import './app.css'
// const hist = createBrowserHistory();
const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterIndex />
    </Provider>
  </React.StrictMode>
);
