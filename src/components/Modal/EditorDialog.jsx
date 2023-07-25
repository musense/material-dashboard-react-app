import React, { useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import CloseIcon from '../Icon/CloseIcon'

const style = {
    minWidth: 300,
    height: 'fit-content',
    m: 0,
    p: 3
}

export default function EditorDialog({
    open = true,
    success,
    editorID = null,
    sitemapUrl = null,
    handleClose,
    dialogTitle,
    dialogContent
}) {

    const onClose = useCallback(() => {
        if (success) {
            navigate(`/admin/editorList/${editorID}`)
            handleClose()
        } else {
            handleClose()
        }
    }, [success, editorID])

    const goTo = useCallback(() => {
        if (success) {
            window.open(sitemapUrl, "_blank")
            navigate(`/admin/editorList/${editorID}`)
            handleClose()
        } else {
            navigate(-1)
        }
    }, [success, sitemapUrl])


    const navigate = useNavigate();
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Box
                sx={style}
            >
                <CloseIcon
                    onClose={onClose}
                    distance={5}
                    color="black"
                />
                <DialogTitle
                    sx={{
                        pt: 0,
                        px: 2,
                        pb: 1,
                    }}
                    id="alert-dialog-title">
                    {dialogTitle}
                </DialogTitle>
                <DialogContent
                    sx={{
                        p: 0,
                        my: 1,
                        textAlign: 'center',
                    }}

                >
                    <DialogContentText id="alert-dialog-description" className=''>
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    sx={{
                        pt: 1,
                        px: 2,
                        pb: 0,
                    }}
                >
                    <Button onClick={goTo}>{success ? '前往網頁' : '回前頁'}</Button>
                    <Button onClick={onClose} autoFocus>{success ? '繼續編輯' : '確定'}</Button>
                </DialogActions>
            </Box>
        </Dialog >
    )
}
