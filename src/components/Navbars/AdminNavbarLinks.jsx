import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Hidden from '@material-ui/core/Hidden';
import Poppers from '@material-ui/core/Popper';
// @material-ui/icons
import Person from '@material-ui/icons/Person';
import Notifications from '@material-ui/icons/Notifications';
import Dashboard from '@material-ui/icons/Dashboard';
import Search from '@material-ui/icons/Search';
// core components
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';

import headerLinksStyle from 'assets/jss/material-dashboard-react/components/headerLinksStyle.jsx';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as GetUserAction from '../../actions/GetUserAction';
import { replace } from 'lodash';

function HeaderLinks(props) {
  let anchorEl;
  const { classes } = props;
  // const [open, setOpen] = useState(false);
  const [notifyPopupOpen, setNotifyPopupOpen] = useState(false);
  const [profilePopupOpen, setProfilePopupOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleToggleNotify = () => {
    setNotifyPopupOpen((prevNotifyOpen) => !prevNotifyOpen);
    setProfilePopupOpen(false);
  };

  const handleToggleProfile = () => {
    setProfilePopupOpen((prevProfilePopupOpen) => !prevProfilePopupOpen);
    setNotifyPopupOpen(false);
  };

  const handleClose = (event) => {
    // if (anchorEl.contains(event.target)) {
    //   return;
    // }
    setNotifyPopupOpen(false);
    setProfilePopupOpen(false);
  };

  // useEffect(() => {
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [anchorEl, window.innerWidth]);

  const logout = () => {
    dispatch({
      type: GetUserAction.LOGOUT_USER,
    });
    navigate('/auth/login-page', { replace: true });
  };

  return (
    <div>
      {/* <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + ' ' + classes.search,
          }}
          inputProps={{
            placeholder: 'Search',
            inputProps: {
              'aria-label': 'Search',
            },
          }}
        />
        <Button color='white' aria-label='edit' justIcon round>
          <Search />
        </Button>
      </div>
      <Button
        color={window.innerWidth > 959 ? 'transparent' : 'white'}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label='Dashboard'
        className={classes.buttonLink}
      >
        <Dashboard className={classes.icons} />
        <Hidden mdUp implementation='css'>
          <p className={classes.linkText}>Dashboard</p>
        </Hidden>
      </Button>
      <div className={classes.manager}>
        <Button
          buttonRef={(node) => {
            anchorEl = node;
          }}
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={notifyPopupOpen ? 'menu-list-grow' : null}
          aria-haspopup='true'
          onClick={handleToggleNotify}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          <span className={classes.notifications}>5</span>
          <Hidden mdUp implementation='css'>
            <p className={classes.linkText}>Notification</p>
          </Hidden>
        </Button>
        <Poppers
          open={notifyPopupOpen}
          anchorEl={anchorEl}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !notifyPopupOpen }) +
            ' ' +
            classes.pooperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id='menu-list-grow'
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList role='menu'>
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      Mike John responded to your email
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      You have 5 new tasks
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      You're now friend with Andrew
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      Another Notification
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      Another One
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div> */}
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label='Person'
          aria-owns={profilePopupOpen ? 'menu-list-grow' : null}
          aria-haspopup='true'
          onClick={handleToggleProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation='css'>
            <p onClick={handleToggleProfile} className={classes.linkText}>
              Profile
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={profilePopupOpen}
          anchorEl={anchorEl}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !profilePopupOpen }) +
            ' ' +
            classes.pooperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id='menu-list-grow'
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList role='menu'>
                    <NavLink to='/admin/user'>
                      <MenuItem
                        onClick={handleClose}
                        className={classes.dropdownItem}
                      >
                        Profile
                      </MenuItem>
                    </NavLink>
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      Settings
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      Activity
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      Support
                    </MenuItem>
                    <MenuItem onClick={logout} className={classes.dropdownItem}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
