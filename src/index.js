import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserHistory } from "history";
import { BrowserRouter, RouterProvider } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.6.0";
import configureStore from './store/configureStore'
import { Provider } from "react-redux";
import App from './App'
import router from "router";
// const hist = createBrowserHistory();
const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
