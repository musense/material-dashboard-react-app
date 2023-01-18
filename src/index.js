import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import Auth from "layouts/Auth.jsx";
import RTL from "layouts/RTL.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";
import configureStore from './store/configureStore'
import { Provider } from "react-redux";

const hist = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {/* prevent warning: Warning: Failed prop type: Invalid prop `component` of type `object` supplied to `Route`, expected `function`.  */}
        <Route path="/admin" component={(props) => <Admin {...props} />} />
        <Route path="/auth" component={(props) => <Auth {...props} />} />
        <Route path="/rtl" component={(props) => <RTL {...props} />} />
        {/* <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
        <Route path="/rtl" component={RTL} /> */}
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
