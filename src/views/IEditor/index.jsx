import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentEditorForm from "./ContentEditorForm.jsx"
import DetailForm from "./DetailForm/DetailForm.jsx"
import * as GetEditorAction from 'actions/GetEditorAction.js';
import MessageDialog from '../../components/Modal/MessageDialog.jsx';

import useIEditorResult from '../../hook/useIEditorResult.js';
import useSetEditorDefaultValue from '../../hook/useSetEditorDefaultValue.js';

function NewIEditor() {

  const containRef = useRef(null);

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
  const contentFormRef = useRef(null)
  const detailFormRef = useRef(null)
  // SET_DEFAULT_FORM_VALUE
  const editor = useSelector((state) => state.getEditorReducer.editor);
  const returnMessage = useSelector((state) => state.getEditorReducer.errorMessage);
  console.log("🚀 ~ file: index.jsx:35 ~ NewIEditor ~ editor:", editor)
  console.log("🚀 ~ file: index.jsx:35 ~ NewIEditor ~ returnMessage:", returnMessage)

  useSetEditorDefaultValue('reset')
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    dispatch({
      type: GetEditorAction.SET_ERROR_MESSAGE,
      payload: {
        message: '--reset-error-message',
      }
    })
  }

  const {
    title,
    content,
    id,
    sitemapUrl,
    success
  } = useIEditorResult(returnMessage, editor)

  useEffect(() => {
    if (title) handleClickOpen()
  }, [title, content]);

  const [preview, setPreview] = useState(false);

  function onDraftEditorSave() {
    onEditorSave(null, false)
  }
  //* e exists means that the context was not draft
  function onEditorSave(e = null, checkValidity = true) {

    e && e.preventDefault();

    const contentFormData = contentFormRef.current.getFormData();
    const detailFormData = detailFormRef.current.getFormData();
    const checkFormSizeData = new Map([
      ...contentFormData,
      ...detailFormData
    ])

    console.log("🚀 ~ file: index.jsx:121 ~ onEditorSave ~ checkFormSizeData:", checkFormSizeData)
    console.log("🚀 ~ file: index.jsx:121 ~ onEditorSave ~ contentFormData:", contentFormData)
    console.log("🚀 ~ file: index.jsx:121 ~ onEditorSave ~ detailFormData:", detailFormData)
    if (checkValidity) {
      if (checkFormSizeData === undefined || checkFormSizeData.size === 0) {
        console.log('nothing to add!!!');
        if (e) {
          dispatch({
            type: GetEditorAction.SET_ERROR_MESSAGE,
            payload: {
              message: 'nothing to add!',
            }
          })
          return
        }
      }
    }
    const formData = new Map([
      ...checkFormSizeData
    ])
    console.log("🚀 ~ file: index.jsx:121 ~ onEditorSave ~ formData:", formData)

    const contentState = formData.has('content')
    console.log("🚀 ~ file: index.jsx:121 ~ onEditorSave ~ noContentState:", contentState)
    const contentTitleState = formData.has('content') && formData.get('content').has('title')
    const contentContentState = formData.has('content') && formData.get('content').has('content')
    console.log("🚀 ~ file: index.jsx:121 ~ onEditorSave ~ noContentTitleState:", contentTitleState)
    console.log("🚀 ~ file: index.jsx:121 ~ onEditorSave ~ noContentContentState:", contentContentState)

    if (checkValidity) {
      if (!contentState) {
        console.log('content title required!');
        dispatch({
          type: GetEditorAction.SET_ERROR_MESSAGE,
          payload: {
            message: 'content title required!',
          }
        })
        return
      }
      if (contentState && !contentTitleState) {
        console.log('title required!');
        dispatch({
          type: GetEditorAction.SET_ERROR_MESSAGE,
          payload: {
            message: 'title required!',
          }
        })
        return
      }
      if (contentState && !contentContentState) {
        console.log('content required!');
        dispatch({
          type: GetEditorAction.SET_ERROR_MESSAGE,
          payload: {
            message: 'content required!',
          }
        })
        return
      }
    }

    if (preview) {
      dispatch({
        type: GetEditorAction.PREVIEW_EDITOR,
        payload: {
          data: formData
        },
      })
      return
    }
    if (checkValidity) {
      if (formData === undefined || formData.size === 0) {
        console.log('nothing to add!');
        dispatch({
          type: GetEditorAction.SET_ERROR_MESSAGE,
          payload: {
            message: 'nothing to add!',
          }
        })
        return
      }
    }
    if (!checkValidity) {
      formData.set('draft', true)
    }
    // return
    dispatch({
      type: GetEditorAction.ADD_EDITOR,
      payload: {
        data: formData,
        draft: formData.get('draft')
      },
    })
  }



  const detailFormProps = useMemo(() => ({
    editor,
    onEditorSave,
  }), [editor, onEditorSave])

  const contentFormProps = useMemo(() => ({
    editor,
    onEditorSave,
  }), [editor, onEditorSave])

  return (
    <div ref={containRef} className={'container'}>
      <div className={'wrapper'}>
        <div className={'left-side'}>

          <ContentEditorForm />
        </div>
        <div className={'right-side'}>
          <DetailForm />
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

