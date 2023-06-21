import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentEditorForm from "./ContentEditorForm.jsx"
import DetailForm from "./DetailForm.jsx"
import * as GetEditorAction from 'actions/GetEditorAction.js';
import EditorDialog from './EditorDialog.jsx';
// import { useBeforeUnload } from "react-router-dom";


function NewIEditor() {

  const [state, setState] = useState(null);

  // save it off before users navigate away
  const [isDraft, setIsDraft] = useState(false);

  const onDraftEditorSave = useCallback(() => {
    setIsDraft(true)
    onEditorSave()
  }, [onEditorSave])

  // useBeforeUnload(
  //   useCallback(() => {
  //     onDraftEditorSave()
  //   }, [onDraftEditorSave])
  // )

  const dispatch = useDispatch();
  const contentFormRef = useRef(null)
  const detailFormRef = useRef(null)

  const editor = useSelector((state) => state.getEditorReducer.editor);

  const returnMessage = useSelector((state) => state.getEditorReducer.errorMessage);

  const [dialogTitle, setDialogTitle] = useState(null);

  const [success, setSuccess] = useState(true);
  const [id, setId] = useState(null);
  const [sitemapUrl, setSitemapUrl] = useState(null);
  const [dialogContent, setDialogContent] = useState(null);

  const [preview, setPreview] = useState(false);
  useEffect(() => {
    console.log("🚀 ~ file: index.jsx:45 ~ useEffect ~ returnMessage:", returnMessage)
    if (!editor) return
    if (returnMessage === 'add successfully') {
      console.log("🚀 ~ file: index.jsx:54 ~ useEffect ~ editor:", editor)

      console.log('新增成功！');
      setSuccess(true)
      setId(editor._id)
      setSitemapUrl(editor.sitemapUrl)
      setDialogContent('新增成功！')
      handleClickOpen()
    }

    if (returnMessage === 'add fail!') {
      // setDialogContent(editor.sitemapUrl)

      console.log('新增失敗！');
      setSuccess(false)
      setDialogContent('新增失敗！')
      handleClickOpen()
    }
  }, [returnMessage, editor]);

  //* e exists means that the context was not draft
  function onEditorSave(e = null) {

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
    if (checkFormSizeData === undefined || checkFormSizeData.size === 0) {
      console.log('nothing to add!!!');
      if (e) {
        setSuccess(false)
        setDialogContent('沒有新增任何資訊！')
        handleClickOpen()
      }
      return
    }
    const formData = e
      ? new Map([
        ...checkFormSizeData
      ])
      : new Map([
        ...checkFormSizeData,
        ['draft', true]
      ])
    console.log("🚀 ~ file: index.jsx:121 ~ onEditorSave ~ formData:", formData)

    const contentState = formData.has('content')
    console.log("🚀 ~ file: index.jsx:121 ~ onEditorSave ~ noContentState:", contentState)
    const contentTitleState = formData.has('content') && formData.get('content').has('title')
    const contentContentState = formData.has('content') && formData.get('content').has('content')
    console.log("🚀 ~ file: index.jsx:121 ~ onEditorSave ~ noContentTitleState:", contentTitleState)
    console.log("🚀 ~ file: index.jsx:121 ~ onEditorSave ~ noContentContentState:", contentContentState)

    if (!contentState) {
      console.log('content title required!!!');
      if (e) {
        setSuccess(false)
        setDialogContent('文章標題與文案為必填！')
        handleClickOpen()
      }
      return
    }
    if (contentState && !contentTitleState) {
      console.log('content title required!!!');
      if (e) {
        setSuccess(false)
        setDialogContent('文章標題為必填！')
        handleClickOpen()
      }
      return
    }
    if (contentState && !contentContentState) {
      console.log('content title required!!!');
      if (e) {
        setSuccess(false)
        setDialogContent('文案為必填！')
        handleClickOpen()
      }
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

    if (formData === undefined || formData.size === 0) {
      console.log('nothing to add!!!');
      setSuccess(false)
      setDialogContent('沒有新增任何資訊！')
      handleClickOpen()
      return
    }
    // return
    dispatch({
      type: GetEditorAction.ADD_EDITOR,
      payload: {
        data: formData
      },
    })
    setIsDraft(false)
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

export default NewIEditor;

