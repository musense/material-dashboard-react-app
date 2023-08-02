import React, { useCallback, useEffect } from "react";
import *  as GetEditorAction from "actions/GetEditorAction";
import { useDispatch } from 'react-redux';

export default function useRequestEditorByID(id, editor) {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("🚀 ~ file: useRequestEditorByID.js:17 ~ useEffect ~ editor:", editor)
        if (editor) return
        console.log("🚀 ~ file: useRequestEditorByID.js:11 ~ useEffect ~ id:", id)
        requestEditorByID(id)
    }, [id, editor]);

    const requestEditorByID = useCallback((id) => {
        dispatch({
            type: GetEditorAction.REQUEST_EDITOR_BY_ID,
            payload: {
                _id: id
            },
        });
    }, [dispatch])
}
