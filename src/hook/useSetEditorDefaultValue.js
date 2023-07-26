import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as GetSlateAction from "actions/GetSlateAction";

export default function useSetEditorDefaultValue(editor) {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("🚀 ~ file: index.jsx:61 ~ useEffect ~ editor:", editor)
        if (!editor) return
        if (editor === 'reset') {
            dispatch({
                type: GetSlateAction.RESET_FORM_VALUE,
            })
            return
        }
        dispatch({
            type: GetSlateAction.SET_DEFAULT_FORM_VALUE,
            payload: {
                form: editor
            },
        })
    }, [editor]);

}
