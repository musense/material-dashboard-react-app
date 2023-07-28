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

export default function MessageDialog({
  open,
  setClose,
  dialogTitle,
  dialogContent,
  success = null,
  editorID = null,
  sitemapUrl = null,
  confirm = null,
  data = null,
  editor = null
}) {
  console.log("🚀 ~ file: MessageDialog.jsx:33 ~ sitemapUrl:", sitemapUrl)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const keepEditClose = useCallback(() => {
    if (success) {
      navigate(`/admin/editorList/${editorID}`)
      setClose()
    } else {
      setClose()
    }
  }, [success, editorID, setClose, navigate])

  const previewClose = useCallback(() => {
    if (success) {
      window.open(sitemapUrl, "_blank")
      navigate(`/admin/editorList/${editorID}`)
      setClose()
    } else {
      navigate(-1)
    }
  }, [success, sitemapUrl, navigate, setClose])

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
  }, [setClose, navigate, dispatch])

  const handleCloseOK = useCallback((data) => {
    console.log("🚀 ~ file: MessageDialog.jsx:34 ~ handleCloseOK ~ data:", data)
    dispatch({
      type: GetDialogAction.ON_MODAL_CLOSE,
      payload: {
        messageDialogReturnValue: data
      }
    })
    setClose()
  }, [setClose, dispatch])

  return (
    <Dialog
      open={open}
      onClose={setClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={style}>
        <DialogTitle id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        {editor
          ? <EditorButtonWrapper
            success={success}
            dialogTitle={dialogTitle}
            dialogContent={dialogContent}
            keepEditClose={keepEditClose}
            previewClose={previewClose}
            handleClose={handleClose}
          />
          : <ConfirmButtonWrapper
            confirm={confirm}
            dialogContent={dialogContent}
            data={data}
            handleClose={handleClose}
            handleCloseOK={handleCloseOK}
          />
        }
      </Box>
    </Dialog>
  )
}

function EditorButtonWrapper({
  success,
  dialogTitle,
  dialogContent,
  keepEditClose,
  previewClose,
  handleClose,
}) {

  const SuccessButton = <DialogActions>
    <Button onClick={previewClose}>{'前往網頁'}</Button>
    <Button onClick={keepEditClose} autoFocus>{'繼續編輯'}</Button>
  </DialogActions>;

  const WarningButton = <DialogActions>
    <Button onClick={previewClose}>{'回前頁'}</Button>
    <Button onClick={keepEditClose} autoFocus>{'確定'}</Button>
  </DialogActions>;

  const ErrorButton = <DialogActions>
    <Button onClick={() => handleClose(dialogContent)} autoFocus>好</Button>
  </DialogActions>;

  return success
    ? SuccessButton
    : dialogTitle === 'Warning'
      ? WarningButton
      : ErrorButton
}

function ConfirmButtonWrapper({
  confirm,
  dialogContent,
  data,
  handleClose,
  handleCloseOK
}) {

  const ConFirmButton = <DialogActions>
    <Button onClick={() => handleClose(dialogContent)}>算了</Button>
    <Button onClick={() => handleCloseOK(data)} autoFocus>好</Button>
  </DialogActions>;

  const NormalCloseButton = <DialogActions>
    <Button onClick={() => handleClose(dialogContent)} autoFocus>好</Button>
  </DialogActions>;



  return confirm
    ? ConFirmButton
    : NormalCloseButton


}

