import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentEditorForm from "./ContentEditorForm.jsx"
import DetailForm from "./DetailForm/DetailForm.jsx"
import * as GetEditorAction from 'actions/GetEditorAction.js';
import * as GetSlateAction from 'actions/GetSlateAction.js';
import MessageDialog from '../../components/Modal/MessageDialog.jsx';

import useIEditorResult from '../../hook/useIEditorResult.js';
import useSetEditorDefaultValue from '../../hook/useSetEditorDefaultValue.js';
import useModal from '../../hook/useModal.js';

function NewIEditor() {

  const previewURL = process.env.REACT_APP_PREVIEW_URL
  const dispatch = useDispatch();

  const submitState = useSelector((state) => state.getSlateReducer.submitState);
  const isPreview = useSelector((state) => state.getSlateReducer.isPreview);
  const returnMessage = useSelector((state) => state.getSlateReducer.errorMessage);
  const _id = useSelector((state) => state.getEditorReducer._id);
  const errorMessage = useSelector((state) => state.getEditorReducer.errorMessage);
  const previewID = useSelector((state) => state.getSlateReducer.previewID);
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

  console.log("🚀 ~ file: index.jsx:35 ~ NewIEditor ~ editor:", submitState)
  console.log("🚀 ~ file: index.jsx:35 ~ NewIEditor ~ message:", message)
  useSetEditorDefaultValue()

  const {
    open,
    handleOpen: handleClickOpen,
    handleClose: setClose
  } = useModal()
  
  const handleClose = useCallback(() => {
    setClose()
    dispatch({
      type: GetSlateAction.CHECK_BEFORE_SUBMIT,
      payload: {
        errorMessage: '--reset-error-message',
      }
    })
  }, [dispatch, setClose])

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀beforeunload Hola!');
      event.preventDefault();
      // onEditorSave()
      event.returnValue = 'beforeunload Hola!';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const {
    title,
    content,
    sitemapUrl,
    success
  } = useIEditorResult(message, submitState)

  useEffect(() => {
    if (title) handleClickOpen()
  }, [title, content]);

  useEffect(() => {
    if (message !== 'check__OK!') return
    if (!isPreview) {
      onEditorSave(submitState)
      return
    }
    onPreviewSave(submitState)
  }, [message, submitState, isPreview]);

  useEffect(() => {
    if (!isPreview) return
    if (!previewID) return
    window.open(`${previewURL}/preview/${previewID}`, '_blank')
  }, [isPreview, previewID, previewURL]);

  const onPreviewSave = useCallback((data) => {
    console.log("🚀 ~ file: index.jsx:92 ~ onPreviewSave ~ data:", data)
    dispatch({
      type: GetSlateAction.PREVIEW_EDITOR,
      payload: {
        data: data
      },
    })
  }, [dispatch])

  const onEditorSave = useCallback((data) => {
    console.log("🚀 ~ file: index.jsx:74 ~ onEditorSave ~ data:", data)
    dispatch({
      type: GetEditorAction.ADD_EDITOR,
      payload: {
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
            createType={'add_new'} />
        </div>
      </div>
      <MessageDialog
        dialogTitle={title}
        dialogContent={content}
        editorID={_id}
        sitemapUrl={sitemapUrl}
        success={success}
        open={open}
        setClose={handleClose}
        editor={true}
      />
    </div>
  );
}

export default NewIEditor;

