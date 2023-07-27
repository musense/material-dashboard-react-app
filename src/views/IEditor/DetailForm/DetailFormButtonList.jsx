import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import * as GetSlateAction from 'actions/GetSlateAction'

export default function DetailFormButtonList({ styles }) {
    const dispatch = useDispatch();
    const onErrorMessageChange = useCallback((e) => {
        e.preventDefault()
        dispatch({
            type: GetSlateAction.CHECK_BEFORE_SUBMIT,
            payload: {
                errorMessage: undefined
            }
        })
    }, [dispatch])

    return <section id="button">
        <div className={styles['button-wrapper']}>
            <input type='submit' onClick={onErrorMessageChange} value='確認' />
            <input type='submit' onClick={onErrorMessageChange} value='預覽' />
        </div>
    </section>;
}