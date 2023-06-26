import React, { useCallback } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import CloseIcon from './../../components/Icon/CloseIcon'


export default function MessageModal({
    confirm = null,
    open = true,
    success,
    handleClose,
    dialogTitle,
    dialogContent
}) {

    const onClose = useCallback(() => {
        if (success) {
            handleClose()
        } else {
            handleClose()
        }
    }, [success])

    return (<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={{
            px: 2,
            py: 3,
            textAlign: 'center',
        }}>
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
                {confirm && <Button onClick={onClose}>{'取消'}</Button>}
                <Button onClick={onClose} autoFocus>{'確定'}</Button>
            </DialogActions>
        </Box>
    </Dialog>);
}