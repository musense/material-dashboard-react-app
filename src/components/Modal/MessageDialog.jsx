import React, { useCallback } from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import * as GetDialogAction from '../../actions/GetDialogAction';
import { useNavigate } from 'react-router-dom'

const style = {
  minWidth: 300,
  height: 'fit-content',
  m: 0,
  p: 3
}

export default function MessageDialog(
  {
    open,
    setClose,
    dialogTitle,
    dialogContent,
    confirm = null,
    data = null
  }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = useCallback((dialogContent) => {
    dispatch({
      type: GetDialogAction.ON_MODAL_CLOSE,
      payload: {
        messageDialogReturnValue: false
      }
    })
    setClose()
    if (dialogContent === '您已被登出！' 
    || dialogContent === '您已登出！') {
      // navigate('/auth/login-page', { replace: true })
    }
  }, [setClose, navigate])

  const handleCloseOK = useCallback((data) => {
    console.log("🚀 ~ file: MessageDialog.jsx:34 ~ handleCloseOK ~ data:", data)
    dispatch({
      type: GetDialogAction.ON_MODAL_CLOSE,
      payload: {
        messageDialogReturnValue: data
      }
    })
    setClose()
  }, [setClose])

  return (
    <Dialog
      open={open}
      onClose={setClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={style}
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        {
          confirm
            ? (
              <DialogActions>
                <Button onClick={() => handleClose(dialogContent)}>算了</Button>
                <Button onClick={() => handleCloseOK(data)} autoFocus>好</Button>
              </DialogActions>
            )
            : (
              <DialogActions>
                <Button onClick={() => handleClose(dialogContent)} autoFocus>好</Button>
              </DialogActions>
            )
        }
      </Box>

    </Dialog>
  )
}
