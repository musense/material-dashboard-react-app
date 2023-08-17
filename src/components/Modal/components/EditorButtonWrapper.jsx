import React, { useCallback } from 'react'
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import * as GetDialogAction from 'actions/GetDialogAction';

export default function EditorButtonWrapper({
    success,
    dialogTitle,
    dialogContent,
    editorID,
    sitemapUrl,
    setClose,
}) {
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
    }, [success, sitemapUrl, editorID, navigate, setClose])

    const handleClose = useCallback((dialogContent) => {
        dispatch({
            type: GetDialogAction.ON_MODAL_CLOSE,
            payload: {
                messageDialogReturnValue: false
            }
        })
        setClose()
        if (dialogContent === '您已被登出！'
            || dialogContent === '您已登出！'
            || dialogContent === '取得資料出現錯誤！即將導回登入頁！'
        ) {
            dispatch({ type: "RESET_STATE_DATA" });
            navigate('/login', { replace: true })
        }
    }, [setClose, navigate, dispatch])

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
