import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as GetDialogAction from 'actions/GetDialogAction';

export default function useDeleteSelectedRow(messageDialogReturnValue, { deleteType }) {

    const dispatch = useDispatch();

    useEffect(() => {
        const id = messageDialogReturnValue
        if (!id) return console.log('id is null');
        dispatch({
            type: deleteType,
            payload: [id]
        });
        dispatch({
            type: GetDialogAction.RESET_MODAL_STATUS
        });
    }, [messageDialogReturnValue, deleteType]);
}
