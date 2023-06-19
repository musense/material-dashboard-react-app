import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentEditorForm from "./ContentEditorForm.jsx"
import DetailForm from "./DetailForm.jsx"
import * as GetEditorAction from 'actions/GetEditorAction.js';
import EditorDialog from './EditorDialog.jsx';
import { Beforeunload, useBeforeunload } from "react-beforeunload";

function NewIEditor() {
  const alertUser = (e) => {
    window.alert('are you sure?')
  }
  useBeforeunload((e) => alertUser(e))

  const dispatch = useDispatch();

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]

  const contentFormRef = useRef(null)
  const detailFormRef = useRef(null)

  const editor = useSelector((state) => state.getEditorReducer.editor);
  const returnMessage = useSelector((state) => state.getEditorReducer.errorMessage);

  const bannerRef = useRef();
  const thumbnailRef = useRef();
  const imageAltTextRef = useRef();
  const imageUrlRef = useRef(undefined);
  const imageNameRef = useRef(undefined);
  const manualUrlRef = useRef(undefined);
  const customUrlRef = useRef(undefined);

  const idRef = useRef()
  const newTitleRef = useRef('');
  const editorContentRef = useRef(initialValue)

  const tagArrayRef = useRef([]);
  const classRef = useRef(null);
  const [dialogTitle, setDialogTitle] = useState(null);

  const [success, setSuccess] = useState(true);
  const [id, setId] = useState(null);
  const [sitemapUrl, setSitemapUrl] = useState(null);
  const [dialogContent, setDialogContent] = useState(null);

  const [preview, setPreview] = useState(false);
  useEffect(() => {
    classRef.current = null;
    tagArrayRef.current = [];
    console.log("🚀 ~ file: index.jsx:48 ~ useEffect ~ classRef:", classRef)
    console.log("🚀 ~ file: index.jsx:48 ~ useEffect ~ tagArrayRef.current:", tagArrayRef.current)
    setDialogTitle('新增文章訊息')
  }, []);

  useEffect(() => {
    console.log("🚀 ~ file: index.jsx:45 ~ useEffect ~ returnMessage:", returnMessage)
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

  function onEditorSave(e) {
    e.preventDefault();

    const contentFormData = contentFormRef.current.getFormData();
    const detailFormData = detailFormRef.current.getFormData();
    const formData = new Map([
      ...contentFormData,
      ...detailFormData,
    ])
    console.log("🚀 ~ file: index.jsx:121 ~ onEditorSave ~ contentFormData:", contentFormData)
    console.log("🚀 ~ file: index.jsx:121 ~ onEditorSave ~ detailFormData:", detailFormData)
    console.log("🚀 ~ file: index.jsx:121 ~ onEditorSave ~ formData:", formData)
    if (formData === undefined || formData.size === 0) {
      console.log('nothing to add!!!');
      setSuccess(false)
      setDialogContent('沒有新增任何資訊！')
      handleClickOpen()
      return
    }
    const noContentState = !formData.has('content')
    const noContentTitleState = formData.has('content') && !formData.get('content').has('title')

    if (noContentState || noContentTitleState) {
      console.log('content title required!!!');
      setSuccess(false)
      setDialogContent('文章標題為必填欄位！')
      handleClickOpen()
      return
    }

    // return
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
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const detailFormProps = useMemo(() => ({
    bannerRef: bannerRef,
    thumbnailRef: thumbnailRef,
    imageAltTextRef: imageAltTextRef,
    imageUrlRef: imageUrlRef,
    imageNameRef: imageNameRef,
    manualUrlRef: manualUrlRef,
    customUrlRef: customUrlRef,
    tagArrayRef: tagArrayRef,
    classRef: classRef,
    onEditorSave: onEditorSave,
    // onPreviewButtonClick:onPreviewButtonClick,
    setPreview: setPreview,
  }), [
    bannerRef,
    thumbnailRef,
    imageAltTextRef,
    imageUrlRef,
    imageNameRef,
    manualUrlRef,
    customUrlRef,
    tagArrayRef,
    classRef,
    onEditorSave,
    // onPreviewButtonClick,
    setPreview,
  ])

  const contentFormProps = useMemo(() => ({
    newTitleRef: newTitleRef,
    editorContentRef: editorContentRef,
    initialValue: initialValue,
    onEditorSave: onEditorSave,
    setPreview: setPreview
  }), [
    newTitleRef,
    editorContentRef,
    initialValue,
    onEditorSave,
    setPreview,
  ])

  const dialogProps = useMemo(() => ({
    open: open,
    success: success,
    editorID: id,
    sitemapUrl: sitemapUrl,
    handleClose: () => setOpen(false),
    dialogTitle: dialogTitle,
    dialogContent: dialogContent,
  }), [
    open,
    success,
    id,
    sitemapUrl,
    setOpen,
    dialogTitle,
    dialogContent,
  ])
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

