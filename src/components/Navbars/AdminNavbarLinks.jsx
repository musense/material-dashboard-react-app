import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import headerLinksStyle from 'assets/jss/material-dashboard-react/components/headerLinksStyle.jsx';
import { useDispatch, useSelector } from 'react-redux';
import * as GetUserAction from 'actions/GetUserAction';
import MessageDialog from '../Modal/MessageDialog';
import useModalResult from 'hook/useModalResult';
import useModal from 'hook/useModal';
import Icon from 'views/Icons/Icon';
import { IconButton } from '@material-ui/core';

function HeaderLinks(props) {
  const dispatch = useDispatch();
  const returnMessage = useSelector((state) => state.getUserReducer.errorMessage);

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
      <IconButton
        sx={{
          backgroundColor: 'transparent'
        }}
        // color="transparent"
        aria-label="logout"
        title='登出'
        onClick={logout}
      >
        <Icon icon={'logout'} />
      </IconButton>
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
