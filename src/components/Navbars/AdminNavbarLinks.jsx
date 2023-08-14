import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
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
// core components
import Button from 'components/CustomButtons/Button.jsx';

import headerLinksStyle from 'assets/jss/material-dashboard-react/components/headerLinksStyle.jsx';
import { useDispatch, useSelector } from 'react-redux';
import * as GetUserAction from 'actions/GetUserAction';
import MessageDialog from '../Modal/MessageDialog';
import useModalResult from 'hook/useModalResult';
import useModal from 'hook/useModal';
import Icon from 'views/Icons/Icon';

function HeaderLinks(props) {
  let anchorEl;
  const { classes } = props;
  const dispatch = useDispatch();
  const returnMessage = useSelector((state) => state.getUserReducer.errorMessage);

  const [profilePopupOpen, setProfilePopupOpen] = useState(false);

  const handleToggleProfile = () => {
    setProfilePopupOpen((prevProfilePopupOpen) => !prevProfilePopupOpen);
  };

  const handleClose = (event) => {
    setProfilePopupOpen(false);
  };
  const logout = () => {
    dispatch({ type: GetUserAction.LOGOUT_USER });
  };

  const {
    title,
    content,
    success
  } = useModalResult({
    message: returnMessage
  })

  const {
    open,
    // handleOpen: handleDialogOpen,
    handleClose: handleDialogClose,
  } = useModal(title)

  return (
    <div>
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
          <Icon icon={'logout'} />
          {/* <Person className={classes.icons} /> */}
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
                    {/* <NavLink to='/admin/user'>
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
                    </MenuItem> */}
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
      <MessageDialog
        dialogTitle={title}
        dialogContent={content}
        open={open}
        setClose={handleDialogClose}
      />
    </div>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
