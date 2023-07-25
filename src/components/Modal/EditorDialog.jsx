import React, { useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import CloseIcon from '../Icon/CloseIcon'
import * as GetDialogAction from '../../actions/GetDialogAction';

const style = {
    minWidth: 300,
    height: 'fit-content',
    m: 0,
    p: 3
}

export default function EditorDialog({
    open,
    setClose,
    dialogTitle,
    dialogContent,
    success,
    editorID = null,
    sitemapUrl = null,
    confirm = null,
    data = null
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClose = useCallback(() => {
        if (success) {
            navigate(`/admin/editorList/${editorID}`)
            setClose()
        } else {
            setClose()
        }
    }, [success, editorID])

    const goTo = useCallback(() => {
        if (success) {
            window.open(sitemapUrl, "_blank")
            navigate(`/admin/editorList/${editorID}`)
            setClose()
        } else {
            navigate(-1)
        }
    }, [success, sitemapUrl])

    const handleFailureClose = useCallback((dialogContent) => {
        dispatch({
            type: GetDialogAction.ON_MODAL_CLOSE,
            payload: {
                messageDialogReturnValue: false
            }
        })
        setClose()
        if (dialogContent === '您已被登出！'
            || dialogContent === '您已登出！') {
            navigate('/auth/login-page', { replace: true })
        }
    }, [setClose, navigate])


    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Box sx={style}>
                <CloseIcon
                    onClose={onClose}
                    distance={5}
                    color="black"
                />
                <DialogTitle id="alert-dialog-title">
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" >
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions >
                    {success
                        ? (<>
                            <Button onClick={goTo}>{'前往網頁'}</Button>
                            <Button onClick={onClose} autoFocus>{'繼續編輯'}</Button>
                        </>)
                        : (
                            dialogTitle === 'Warning'
                                ? (<>
                                    <Button onClick={goTo}>{'回前頁'}</Button>
                                    <Button onClick={onClose} autoFocus>{'確定'}</Button>
                                </>)
                                : (<>
                                    <Button onClick={() => handleFailureClose(dialogContent)} autoFocus>{'確定'}</Button>
                                </>)
                        )}
                </DialogActions>
            </Box>
        </Dialog >
    )
}
