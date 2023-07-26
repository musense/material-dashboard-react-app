import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ContentEditorForm from "./../ContentEditorForm.jsx"
import DetailForm from "../DetailForm/DetailForm.jsx"
import * as GetEditorAction from "actions/GetEditorAction.js";
import MessageDialog from '../../../components/Modal/MessageDialog.jsx';
import useIEditorResult from '../../../hook/useIEditorResult.js';
import * as GetSlateAction from "actions/GetSlateAction";
import useSetEditorDefaultValue from '../../../hook/useSetEditorDefaultValue.js';

function IEditor() {

  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("🚀 ~ file: index.jsx:30 ~ IEditor ~ id:", id)
  const editor = useSelector((state) => state.getEditorReducer.editor);
  const returnMessage = useSelector((state) => state.getEditorReducer.errorMessage);
  const previewID = useSelector((state) => state.getEditorReducer.previewID);

  useSetEditorDefaultValue(editor)
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
    sitemapUrl,
    success
  } = useIEditorResult(returnMessage, editor)

  useEffect(() => {
    if (title) handleClickOpen()
    if (title === '更新成功') requestEditorByID(id)
  }, [title, content, id]);

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

  useEffect(() => {
    return () => {
      dispatch({
        type: GetSlateAction.RESET_FORM_VALUE,
      })
    }
  }, []);



  useEffect(() => {
    if (!editor) {
      requestEditorByID(id)
    }
  }, [editor]);

  console.log("🚀 ~ file: index.jsx:49 ~ IEditor ~ editor:", editor)

  const contentFormRef = useRef(null)
  const detailFormRef = useRef(null)

  const [preview, setPreview] = useState(false);

  function onEditorSave(e) {
    e.preventDefault(e);

    const contentFormData = contentFormRef.current.getFormData(editor);
    const detailFormData = detailFormRef.current.getFormData(editor);
    const formData = new Map([
      ...contentFormData,
      ...detailFormData,
    ])
    console.log("🚀 ~ file: index.jsx:256 ~ onEditorSave ~ contentFormData:", contentFormData)
    console.log("🚀 ~ file: index.jsx:256 ~ onEditorSave ~ detailFormData:", detailFormData)
    console.log("🚀 ~ file: index.jsx:256 ~ onEditorSave ~ formData:", formData)

    if (formData === undefined || formData.size === 0) {
      console.log('nothing to update!!!');
      dispatch({
        type: GetEditorAction.SET_ERROR_MESSAGE,
        payload: {
          message: 'nothing to update!',
        }
      })
      return
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

    // return
    dispatch({
      type: GetEditorAction.UPDATE_EDITOR,
      payload: {
        id: editor._id,
        data: formData
      },
    })
  }


  return (
    <div className={'container'}>
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

export default IEditor;

