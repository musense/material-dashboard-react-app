import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import * as GetSlateAction from 'actions/GetSlateAction'

export default function DetailFormButtonList({ styles, createType }) {
    const dispatch = useDispatch();
    const onErrorMessageChange = useCallback((e, createType) => {
        console.log("🚀 ~ file: DetailFormButtonList.jsx:8 ~ onErrorMessageChange ~ createType:", createType)
        e.preventDefault()
        dispatch({
            type: GetSlateAction.CHECK_BEFORE_SUBMIT,
            payload: {
                errorMessage: undefined,
                createType: createType
            }
        })
    }, [dispatch])

    return <section id="button">
        <div className={styles['button-wrapper']}>
            <input type='submit' onClick={(e) => onErrorMessageChange(e, createType)} value='確認' />
            <input type='submit' onClick={(e) => onErrorMessageChange(e, createType)} value='預覽' />
        </div>
    </section>;
}