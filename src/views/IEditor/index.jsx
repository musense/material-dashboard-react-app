import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentEditorForm from "./ContentEditorForm.jsx"
import DetailForm from "./DetailForm/DetailForm.jsx"
import * as GetEditorAction from 'actions/GetEditorAction.js';
import * as GetSlateAction from 'actions/GetSlateAction.js';
import MessageDialog from '../../components/Modal/MessageDialog.jsx';

import useIEditorResult from '../../hook/useIEditorResult.js';
import useSetEditorDefaultValue from '../../hook/useSetEditorDefaultValue.js';

function NewIEditor() {

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀beforeunload Hola!');
  //     event.preventDefault();
  //     onDraftEditorSave()
  //     event.returnValue = 'beforeunload Hola!';
  //   };
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  const dispatch = useDispatch();

  const {
    submitState: editor,
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
  useSetEditorDefaultValue('reset')
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
    id,
    sitemapUrl,
    success
  } = useIEditorResult(message, editor)
  console.log("🚀 ~ file: index.jsx:74 ~ NewIEditor ~ id:", id)

  useEffect(() => {
    if (title) handleClickOpen()
  }, [title, content]);

  useEffect(() => {
    if (message !== 'check__OK!') return
    onEditorSave(editor)
  }, [message, editor]);

  const onEditorSave = useCallback((data) => {
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
          <DetailForm onEditorSave={onEditorSave} />
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

export default NewIEditor;

