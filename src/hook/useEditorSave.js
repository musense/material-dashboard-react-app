import React, { useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import * as GetSlateAction from "actions/GetSlateAction";
import * as GetEditorAction from "actions/GetEditorAction";

export default function useEditorSave(message, submitState, isPreview, id = null) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (message !== 'check__OK!') return
        if (isPreview) {
            onPreviewSave(submitState)
            return
        }
        if (id) {
            onEditorUpdate(submitState, id)
            return
        }
        onEditorSave(submitState)
    }, [message, submitState, isPreview, id]);
    const onEditorUpdate = useCallback((data, id = null) => {
        console.log("🚀 ~ file: index.jsx:113 ~ onEditorSave ~ data:", data)
        dispatch({
            type: GetEditorAction.UPDATE_EDITOR,
            payload: {
                id: id,
                data: data,
                draft: false
            },
        })
    }, [dispatch])
    const onEditorSave = useCallback((data, id = null) => {
        console.log("🚀 ~ file: index.jsx:74 ~ onEditorSave ~ data:", data)

        dispatch({
            type: GetEditorAction.ADD_EDITOR,
            payload: {
                data: data,
                draft: false
            },
        })
    }, [dispatch])

    const onPreviewSave = useCallback((data) => {
        console.log("🚀 ~ file: index.jsx:92 ~ onPreviewSave ~ data:", data)
        dispatch({
            type: GetSlateAction.PREVIEW_EDITOR,
            payload: {
                data: data
            },
        })
    }, [dispatch])

    return { onEditorSave, onEditorUpdate, onPreviewSave }
}
