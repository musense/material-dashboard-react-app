import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// @material-ui/core components
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';

// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Fingerprint from '@material-ui/icons/Fingerprint';
import Menu from '@material-ui/icons/Menu';
import PersonAdd from '@material-ui/icons/PersonAdd';

// core components
import Button from 'components/CustomButtons/Button';

import authNavbarStyle from 'assets/jss/material-dashboard-react/components/authNavbarStyle.jsx';

function AuthNavbar(props) {
  const { classes, color, brandText } = props;
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    // return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
    return location.pathname.indexOf(routeName) > -1 ? true : false;
  };

  const appBarClasses = cx({
    [' ' + classes[color]]: color,
  });
  const list = (
    <List className={classes.list}>
      {/* <ListItem className={classes.listItem}>
        <NavLink to={'/admin/dashboard'} className={classes.navLink}>
          <Dashboard className={classes.listItemIcon} />
          <ListItemText
            primary={'Dashboard'}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem> */}
      <ListItem className={classes.listItem}>
        <NavLink
          to={'/auth/register-page'}
          className={cx(classes.navLink, {
            [classes.navLinkActive]: activeRoute('/auth/register-page'),
          })}
        >
          <PersonAdd className={classes.listItemIcon} />
          <ListItemText
            primary={'Register'}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink
          to={'/auth/login-page'}
          className={cx(classes.navLink, {
            [classes.navLinkActive]: activeRoute('/auth/login-page'),
          })}
        >
          <Fingerprint className={classes.listItemIcon} />
          <ListItemText
            primary={'Login'}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
    </List>
  );
  return (
    <AppBar position='static' className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown>
          <div className={classes.flex}>
            <Button href='#' className={classes.title} color='transparent'>
              {brandText}
            </Button>
          </div>
        </Hidden>
        <Hidden mdUp>
          <div className={classes.flex}>
            <Button href='#' className={classes.title} color='transparent'>
              MD Pro React
            </Button>
          </div>
        </Hidden>
        <Hidden smDown>{list}</Hidden>
        <Hidden mdUp>
          <Button
            className={classes.sidebarButton}
            color='transparent'
            justIcon
            aria-label='open drawer'
            onClick={handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
        <Hidden mdUp>
          <Hidden mdUp>
            <Drawer
              variant='temporary'
              anchor={'right'}
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {/* {list} */}
            </Drawer>
          </Hidden>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
// }

AuthNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  brandText: PropTypes.string,
};

export default withStyles(authNavbarStyle)(AuthNavbar);
