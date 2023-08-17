import { useCallback } from "react";
import { useDispatch } from 'react-redux';
import * as GetDialogAction from 'actions/GetDialogAction';

export default function useEditCellFunction({
    handleOpenDialog,
    onDelete: {
        id,
        name,
    },
    onEdit: {
        selectedID = null,
        editType,
        editData,
        callback = null
    },

}) {
    console.log("🚀 ~ file: useEditCellFunction.js:19 ~ editData:", editData)
    const dispatch = useDispatch();
    const onCopy = useCallback((sitemapUrl, result) => {
        dispatch({
            type: GetDialogAction.COPY_SITEMAP,
            payload: {
                contentData: result ? sitemapUrl : '',
                message: result ? 'copy sitemapUrl successfully' : 'copy sitemapUrl failed',
            },
        });
        handleOpenDialog && handleOpenDialog();
    }, [handleOpenDialog, dispatch]);

    const onDelete = useCallback(() => {
        dispatch({
            type: GetDialogAction.ON_DELETE_EDITOR,
            payload: {
                data: id,
                contentData: name,
                message: 'delete one',
                confirm: true,
            },
        });
        handleOpenDialog && handleOpenDialog()
    }, [handleOpenDialog, dispatch, id, name])

    const onEdit = useCallback(() => {
        dispatch({
            type: editType,
            payload: {
                data: editData
            },
        });
        callback && callback()
    }, [dispatch, callback, editType, editData, selectedID])

    return {
        onCopy,
        onDelete,
        onEdit,
    }
}
