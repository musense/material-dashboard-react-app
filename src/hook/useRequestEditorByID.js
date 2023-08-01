import React, { useCallback, useEffect } from "react";
import *  as GetEditorAction from "actions/GetEditorAction";
import { useDispatch } from 'react-redux';

export default function useRequestEditorByID(id, editor, title) {

    const dispatch = useDispatch();

    useEffect(() => {
        if (title !== '更新成功') return
        if (editor) return
        requestEditorByID(id)
    }, [id, editor, title]);

    const requestEditorByID = useCallback((id) => {
        dispatch({
            type: GetEditorAction.REQUEST_EDITOR_BY_ID,
            payload: {
                _id: id
            },
        });
    }, [dispatch])
}
