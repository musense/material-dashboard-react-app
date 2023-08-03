import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as GetSlateAction from "actions/GetSlateAction";
import * as GetClassAction from "actions/GetClassAction";
import * as GetEditorAction from 'actions/GetEditorAction';

export default function useResetEditorState(route) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (route === '/admin/editorList/new') {
            dispatch({
                type: GetEditorAction.ADD_NEW_EDITOR
            })
        }
        return () => {
            console.log("🚀 ~ file: useResetEditorState.js:12 ~ //return ~ route:", route)
            // if (route === '/admin/editorList/new') {
            console.log("🚀 ~ file: useResetEditorState.js:12 ~ useResetEditorState ~ useResetEditorState:")
            // reset form value
            dispatch({
                type: GetSlateAction.RESET_FORM_VALUE,
            })
            return
            // }
        }
    }, [route]);

}
