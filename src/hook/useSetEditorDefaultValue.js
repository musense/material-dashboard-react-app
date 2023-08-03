import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as GetSlateAction from "actions/GetSlateAction";
import * as GetClassAction from "actions/GetClassAction";

export default function useSetEditorDefaultValue(editor = null) {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("🚀 ~ file: index.jsx:61 ~ useEffect ~ editor:", editor)
        if (!editor) {
            dispatch({
                type: GetSlateAction.RESET_FORM_VALUE,
            })
            return
        }
        dispatch({
            type: GetSlateAction.SET_DEFAULT_FORM_VALUE,
            payload: {
                allProps: editor
            },
        })
    }, [editor]);

}
