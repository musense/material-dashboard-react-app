import React from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ImageDialog({ open, setClose, urlRef, altTextRef, hrefRef }) {


    const handleClose = (e) => {
        console.log("🚀 ~ file: ImageDialog.jsx:15 ~ handleClose ~ e.target.value:", e.target.value)
        const buttonValue = e.target.value
        setClose();
        if (buttonValue === 'cancel') return
        if (!urlRef.current) {
            alert('請至少輸入URL')
            return
        }
        console.log("🚀 ~ file: ImageDialog.jsx:15 ~ handleClose ~ urlRef.current:", urlRef.current)
        console.log("🚀 ~ file: ImageDialog.jsx:15 ~ handleClose ~ altTextRef.current:", altTextRef.current)
        console.log("🚀 ~ file: ImageDialog.jsx:15 ~ handleClose ~ hrefRef.current:", hrefRef.current)
    };


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>加入圖片</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    圖片URL與替代文字
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="url"
                    label="URL"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => urlRef.current = e.target.value}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="href"
                    label="超連結"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => hrefRef.current = e.target.value}
                />
                <TextField
                    margin="dense"
                    id="altText"
                    label="替代文字"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => altTextRef.current = e.target.value}
                />
            </DialogContent>
            <DialogActions>
                <Button value='cancel' onClick={handleClose}>取消</Button>
                <Button value='submit' onClick={handleClose}>加入</Button>
            </DialogActions>
        </Dialog>
    )
}
