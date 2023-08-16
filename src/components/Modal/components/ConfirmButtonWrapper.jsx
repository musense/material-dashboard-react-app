import React, { useCallback } from 'react'
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import * as GetDialogAction from 'actions/GetDialogAction';

export default function ConfirmButtonWrapper({
    confirm,
    dialogContent,
    data,
    setClose,
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onModalClose = useCallback((value) => {
        dispatch({
            type: GetDialogAction.ON_MODAL_CLOSE,
            payload: {
                messageDialogReturnValue: value
            }
        })
    }, [dispatch])

    const onEditorDenied = useCallback((dialogContent) => {
        if (dialogContent === '您已被登出！'
            || dialogContent === '您已登出！'
            || dialogContent === '取得資料出現錯誤！即將導回登入頁！'
        ) {
            dispatch({ type: "RESET_STATE_DATA" });
            navigate('/login', { replace: true })
        }
    }, [dispatch, navigate])

    const handleClose = useCallback((dialogContent) => {
        setClose()
        onModalClose(false)
        onEditorDenied(dialogContent)
    }, [setClose, onModalClose, onEditorDenied])

    const handleCloseOK = useCallback((data) => {
        setClose()
        onModalClose(data)
    }, [setClose, onModalClose])

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
