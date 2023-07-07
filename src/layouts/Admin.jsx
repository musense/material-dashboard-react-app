/* eslint-disable */
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// creates a beautiful scrollbar
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import Footer from 'components/Footer/Footer.jsx';
import Navbar from 'components/Navbars/Navbar.jsx';
import Sidebar from 'components/Sidebar/Sidebar.jsx';
import routes from 'routes.js';

import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx';

import image from 'assets/img/sidebar-1.jpg';

// import logo from process.env.REACT_APP_LOGO_DIR;

import { Link, Outlet } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';

import { useDispatch, useSelector } from 'react-redux';

import * as GetClassAction from "actions/GetClassAction.js";
import * as GetTagsAction from "actions/GetTagsAction.js";

let userInfo = {};

function Dashboard({ ...props }) {
  const { classes, ...rest } = props;
  // const [image, setImage] = useState(image);
  const [color, setColor] = useState('orange');
  const [hasImage, setHasImage] = useState(true);
  const [fixedClasses, setFixedClasses] = useState('dropdown show');
  const [mobileOpen, setMobileOpen] = useState(false);

  const mainPanel = useRef(null);

  // const handleImageClick = (image) => {
  //   setImage(image);
  // };
  const [logoImage, setLogoImage] = useState(null);
  const [logoText, setLogoText] = useState(null);
  const location = useLocation()
  const editorClassList = useSelector((state) => state.getClassReducer.editorClassList);
  const tagList = useSelector((state) => state.getTagsReducer.tagList);

  const dispatch = new useDispatch();

  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === 'dropdown') {
      setFixedClasses('dropdown show');
    } else {
      setFixedClasses('dropdown');
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen((preMobileOpen) => !preMobileOpen);
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
      import(process.env.REACT_APP_LOGO_DIR)
        .then(res => setLogoImage(res.default));
      setLogoText(process.env.REACT_APP_LOGO_TEXT);
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
          logoText={logoText}
          logo={logoImage}
          image={image}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
          {...rest}
        />
        <div className={classes.mainPanel} ref={mainPanel}>
          <Navbar
            routes={routes}
            handleDrawerToggle={handleDrawerToggle}
            color={color}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          <div style={{ paddingBottom: 0 }} className={classes.content}>
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
