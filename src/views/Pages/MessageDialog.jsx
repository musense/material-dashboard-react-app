import React, { useCallback } from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import * as GetDialogAction from '../../actions/GetDialogAction';

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

  const handleClose = useCallback(() => {
    dispatch({
      type: GetDialogAction.ON_MODAL_CLOSE,
      payload: {
        messageDialogReturnValue: false
      }
    })
    setClose()
  }, [setClose])

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
      sx={{ m: 0, p: 30 }}
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
              <Button onClick={() => handleClose()}>算了</Button>
              <Button onClick={() => handleCloseOK(data)} autoFocus>好</Button>
            </DialogActions>
          )
          : (
            <DialogActions>
              <Button onClick={setClose} autoFocus>
                好
              </Button>
            </DialogActions>
          )
      }

    </Dialog>
  )
}
