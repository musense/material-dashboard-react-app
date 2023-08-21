import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/icons/Menu";
import AdminNavbarLinks from "./AdminNavbarLinks.jsx";
import Button from "components/CustomButtons/Button.jsx";
import headerStyle from "assets/jss/material-dashboard-react/components/headerStyle.jsx";
import { useLocation } from "react-router-dom";

function Header({ ...props }) {
  const location = useLocation()
  function makeBrand() {
    let name;
    props.routes.map((prop) => {
      if (prop.layout + prop.path === location.pathname) {
        name = prop.name;
      } else if (location.pathname.includes('/admin/editorList/')) {
        name = '編輯文章'
      } else {
        return null;
      }
    });
    return name;
  }
  const { classes, color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex} style={{ flex: 1, marginRight: 'auto' }}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks {...props} />
        </Hidden>
        {/* <Hidden mdUp implementation="css"> */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerToggle}
        // sx={{ display: { md: 'none', xs: 'block' } }}
        >
          <Menu />
        </IconButton>
        {/* </Hidden> */}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
};

export default withStyles(headerStyle)(Header);
