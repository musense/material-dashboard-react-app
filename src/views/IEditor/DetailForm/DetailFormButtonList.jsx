import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import * as GetSlateAction from 'actions/GetSlateAction'

export default function DetailFormButtonList({ styles, createType }) {
    const dispatch = useDispatch();
    const onErrorMessageChange = useCallback((e, createType, submitType) => {
        console.log("🚀 ~ file: DetailFormButtonList.jsx:8 ~ onErrorMessageChange ~ createType:", createType)
        e.preventDefault()
        dispatch({
            type: GetSlateAction.CHECK_BEFORE_SUBMIT,
            payload: {
                errorMessage: undefined,
                createType: createType,
                isPreview: submitType === 'submit' ? false : true
            }
        })


    }, [dispatch])

    return <section id="button">
        <div className={styles['button-wrapper']}>
            <input type='submit' onClick={(e) => onErrorMessageChange(e, createType, 'submit')} value='確認' />
            <input type='submit' onClick={(e) => onErrorMessageChange(e, createType, 'preview')} value='預覽' />
        </div>
    </section>;
}