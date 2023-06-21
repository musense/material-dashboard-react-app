import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ContentEditorForm from "./../ContentEditorForm.jsx"
import DetailForm from "./../DetailForm.jsx"
import * as GetEditorAction from "actions/GetEditorAction.js";
import * as GetClassAction from "actions/GetClassAction.js";
import EditorDialog from '../EditorDialog.jsx';


function IEditor() {
  const alertUser = (e) => {
    window.alert('are you sure?')
  }

  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("🚀 ~ file: index.jsx:30 ~ IEditor ~ id:", id)
  const editor = useSelector((state) => state.getEditorReducer.editor);
  const returnMessage = useSelector((state) => state.getEditorReducer.errorMessage);
  const previewID = useSelector((state) => state.getEditorReducer.previewID);

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
    if (!editor) {
      requestEditorByID(id)
    } 
  }, [editor]);

  console.log("🚀 ~ file: index.jsx:49 ~ IEditor ~ editor:", editor)

  const contentFormRef = useRef(null)
  const detailFormRef = useRef(null)

  const idRef = useRef()

  const [success, setSuccess] = useState(true);
  const [sitemapUrl, setSitemapUrl] = useState(null);
  const [dialogTitle, setDialogTitle] = useState(null);
  const [dialogContent, setDialogContent] = useState(null);

  const [preview, setPreview] = useState(false);
  useEffect(() => {
    if (!returnMessage) return

    if (returnMessage === "Editor update successfully") {
      setSitemapUrl(editor.sitemapUrl)
      console.log('更新成功！');
      setSuccess(true)
      setDialogContent('更新成功！')
      handleClickOpen()

      console.log('Editor update successfully');
      console.log("🚀 ~ file: index.jsx:79 ~ useEffect ~ id:", id)
      requestEditorByID(id)
    }
  }, [returnMessage, id]);


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
      setSuccess(false)
      setDialogContent('沒有更新任何資訊！')
      handleClickOpen()
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };


  const detailFormProps = useMemo(() => ({
    editor,
    onEditorSave,
  }), [editor, onEditorSave])

  const contentFormProps = useMemo(() => ({
    editor,
    onEditorSave,
  }), [editor, onEditorSave])

  const dialogProps = useMemo(() => ({
    open,
    success,
    editorID: id,
    sitemapUrl,
    handleClose: () => setOpen(false),
    dialogTitle,
    dialogContent,
  }), [open, success, id, sitemapUrl, setOpen, dialogTitle, dialogContent])

  return (
    <div className={'container'}>
      <div className={'wrapper'}>
        <div className={'left-side'}>
          <EditorDialog
            {...dialogProps}
          />
          <ContentEditorForm
            ref={contentFormRef}
            {...contentFormProps}
          />
        </div>
        <div className={'right-side'}>
          <DetailForm
            ref={detailFormRef}
            {...detailFormProps}
          />
        </div>
      </div>
    </div>
  );
}

export default IEditor;

