import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import * as GetSlateAction from 'actions/GetSlateAction'

export default function FormButtonList({
    createType
}) {
    const dispatch = useDispatch();
    const onErrorMessageChange = useCallback((e, createType, submitType) => {
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
        <div className={'button-wrapper'}>
            <input onClick={(e) => onErrorMessageChange(e, createType, 'preview')} defaultValue='預覽' type="button" className="btn" />
            <input onClick={(e) => onErrorMessageChange(e, createType, 'submit')} defaultValue='確認' type="button" className="submit-btn" />
        </div>
    </section>;
}