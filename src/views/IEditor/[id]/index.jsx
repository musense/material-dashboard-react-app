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

function IEditor() {

  const { id } = useParams();

  const dispatch = useDispatch();

  const editor = useSelector((state) => state.getEditorReducer.editor);
  const {
    submitState,
    errorMessage: returnMessage
  } = useSelector((state) => state.getSlateReducer);
  const errorMessage = useSelector((state) => state.getEditorReducer.errorMessage);
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
    onEditorSave(submitState, id)
  }, [message, submitState, id]);

  useEffect(() => {
    if (!editor) requestEditorByID(id)
    if (title) handleClickOpen()
    if (title === '更新成功') requestEditorByID(id)
  }, [title, id, editor]);

  function requestEditorByID(id) {
    dispatch({
      type: GetEditorAction.REQUEST_EDITOR_BY_ID,
      payload: {
        data: {
          _id: id
        },
      },
    });
  }

  const onEditorSave = useCallback((data, id) => {
    console.log("🚀 ~ file: index.jsx:74 ~ onEditorSave ~ data:", data)

    // if (preview) {
    //   dispatch({
    //     type: GetEditorAction.PREVIEW_EDITOR,
    //     payload: {
    //       data: formData
    //     },
    //   })
    //   return
    // }

    // return
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

