import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ContentEditorForm from "./../ContentEditorForm.jsx"
import DetailForm from "../DetailForm/DetailForm.jsx"
import * as GetEditorAction from "actions/GetEditorAction.js";
import * as GetSlateAction from "actions/GetSlateAction";
import MessageDialog from '../../../components/Modal/MessageDialog.jsx';

import useIEditorResult from '../../../hook/useIEditorResult.js';
import useSetEditorDefaultValue from '../../../hook/useSetEditorDefaultValue.js';
import usePreview from '../../../hook/usePreview.js';

function IEditor() {

  const { id } = useParams();

  const dispatch = useDispatch();

  const editor = useSelector((state) => state.getEditorReducer.editor);
  console.log("🚀 ~ file: index.jsx:20 ~ IEditor ~ id:", id)
  console.log("🚀 ~ file: index.jsx:20 ~ IEditor ~ editor:", editor)

  const submitState = useSelector((state) => state.getSlateReducer.submitState);
  const isPreview = useSelector((state) => state.getSlateReducer.isPreview);
  const returnMessage = useSelector((state) => state.getSlateReducer.errorMessage);
  const errorMessage = useSelector((state) => state.getEditorReducer.errorMessage);
  const previewID = useSelector((state) => state.getSlateReducer.previewID);
  console.log("🚀 ~ file: index.jsx:26 ~ IEditor ~ previewID:", previewID)
  const message = getErrorMessage(errorMessage, returnMessage)

  function getErrorMessage(errorMessage, returnMessage) {
    console.log("🚀 ~ file: index.jsx:40 ~ getErrorMessage ~ returnMessage:", returnMessage)
    console.log("🚀 ~ file: index.jsx:40 ~ getErrorMessage ~ errorMessage:", errorMessage)
    if (errorMessage) {
      return errorMessage;
    }
    if (returnMessage) {
      return returnMessage;
    }
    return null;

  }

  console.log("🚀 ~ file: index.jsx:35 ~ NewIEditor ~ editor:", editor)
  console.log("🚀 ~ file: index.jsx:35 ~ NewIEditor ~ message:", message)
  useSetEditorDefaultValue(editor)
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    dispatch({
      type: GetSlateAction.CHECK_BEFORE_SUBMIT,
      payload: {
        errorMessage: '--reset-error-message',
      }
    })
  }

  const {
    title,
    content,
    // id,
    sitemapUrl,
    success
  } = useIEditorResult(message, editor)
  console.log("🚀 ~ file: index.jsx:74 ~ NewIEditor ~ id:", id)

  useEffect(() => {
    if (message !== 'check__OK!') return
    if (!isPreview) {
      onEditorSave(submitState, id)
      return
    }
    onPreviewSave(submitState)
  }, [message, submitState, id, isPreview]);

  useEffect(() => {
    if (!editor) requestEditorByID(id)
  }, [id, editor]);

  useEffect(() => {
    if (title) handleClickOpen()
    if (title === '更新成功') requestEditorByID(id)
  }, [title, id]);

  usePreview(previewID, isPreview)
  
  // useEffect(() => {
  //   if (!isPreview) return
  //   if (!previewID) return
  //   window.open(`http://10.88.0.103:3001/preview/${previewID}`, '_blank')

  // }, [isPreview, previewID]);

  function requestEditorByID(id) {
    dispatch({
      type: GetEditorAction.REQUEST_EDITOR_BY_ID,
      payload: {
        _id: id
      },
    });
  }

  const onPreviewSave = useCallback((data) => {
    console.log("🚀 ~ file: index.jsx:92 ~ onPreviewSave ~ data:", data)
    dispatch({
      type: GetSlateAction.PREVIEW_EDITOR,
      payload: {
        data: data
      },
    })
  }, [dispatch])

  const onEditorSave = useCallback((data, id) => {
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

  return (
    <div className={'container'}>
      <div className={'wrapper'}>
        <div className={'left-side'}>
          <ContentEditorForm />
        </div>
        <div className={'right-side'}>
          <DetailForm
            createType={'update'} />
        </div>
      </div>
      <MessageDialog
        dialogTitle={title}
        dialogContent={content}
        editorID={id}
        sitemapUrl={sitemapUrl}
        success={success}
        open={open}
        setClose={handleClose}
        editor={true}
      />
    </div>
  );
}

export default IEditor;

