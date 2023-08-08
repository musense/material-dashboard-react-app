/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
// creates a beautiful scrollbar
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import Navbar from 'components/Navbars/Navbar.jsx';
import Sidebar from 'components/Sidebar/Sidebar.jsx';
import routes from 'routes.js';

import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx';

import image from 'assets/img/sidebar-1.jpg';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';

import { useDispatch, useSelector } from 'react-redux';

import * as GetClassAction from "actions/GetClassAction.js";
import * as GetTagsAction from "actions/GetTagsAction.js";
import useResetEditorState from '../hook/useResetEditorState';
import * as GetConfigAction from "actions/GetConfigAction.js";


const myContainerStyle = {
  minHeight: 'unset',
  marginTop: '74px',
  height: 'calc(100vh - 74px)',
  overflow: 'hidden',
}

function Dashboard({ ...props }) {

  const sidebarOpen = useSelector((state) => state.getConfigReducer.sidebarOpen);
  const [logo, setLogo] = useState();
  const [logoText, setLogoText] = useState();
  const { classes, ...rest } = props;
  const color = "orange";

  const mainPanel = useRef(null);
  const location = useLocation()
  const dispatch = new useDispatch();

  useResetEditorState(location.pathname)

  const handleDrawerToggle = () => {
    dispatch({ type: GetConfigAction.TOGGLE_SIDEBAR_OPEN });
  };
  function getRoute() {
    return props.location && props.location.pathname !== '/admin/maps';
  }
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  const getAgentPlatform = () => {
    return navigator
      ? navigator.userAgentData
        ? navigator.userAgentData.platform
        : navigator.platform
      : 'unknown';
  };

  useEffect(() => {
    dispatch({ type: GetClassAction.REQUEST_CLASS_LIST });
    dispatch({ type: GetTagsAction.REQUEST_TAG })
  }, [location.pathname]);

  useEffect(() => {

    if (mainPanel.current === null) {
      //componentDidMount
      mainPanel.current = classes.mainPanel;
      if (getAgentPlatform().indexOf('Win') > -1) {
        const ps = new PerfectScrollbar(mainPanel);
      }
      window.addEventListener('resize', resizeFunction);
    } else {
      //componentDidUpdate

      import(process.env.REACT_APP_LOGO_DIR).then(res => {
        setLogo(res.default)
        // setLogoText(process.env.REACT_APP_LOGO_TEXT)
      })
    }
    return () => {
      //componentWillUnmount
      window.removeEventListener('resize', resizeFunction);
    };
  }, []);
  return (
    <>
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          // logoText={logoText}
          logo={logo}
          image={image}
          handleDrawerToggle={handleDrawerToggle}
          open={sidebarOpen}
          color={color}
          {...rest}
        />
        <div className={`${classes.mainPanel} ${sidebarOpen ? '' : 'main-panel-max-size'}`} ref={mainPanel}>
          <Navbar
            routes={routes}
            handleDrawerToggle={handleDrawerToggle}
            color={color}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          <div style={myContainerStyle} className={`${classes.content}`}>
            <div className={classes.container}>
              <Outlet />
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}

// Dashboard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
export default withStyles(dashboardStyle)(Dashboard);
