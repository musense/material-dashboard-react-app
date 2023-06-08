import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentEditorForm from "./ContentEditorForm.jsx"
import DetailForm from "./DetailForm.jsx"
import * as GetEditorAction from 'actions/GetEditorAction.js';
import EditorDialog from './EditorDialog.jsx';
import { useBeforeunload } from "react-beforeunload";

function NewIEditor({ props }) {

  const dispatch = useDispatch();

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]

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

  const tagArrayRef = useRef(null);
  const classRef = useRef(null);
  const [dialogTitle, setDialogTitle] = useState(null);
  const [dialogContent, setDialogContent] = useState(null);

  const [preview, setPreview] = useState(false);
  useEffect(() => {
    classRef.current = null;
    setDialogTitle('新增文章訊息')
  }, []);
  const alertUser = (e) => {
    alert('are you sure?')
  }

  useBeforeunload(alertUser)

  useEffect(() => {
    console.log("🚀 ~ file: index.jsx:45 ~ useEffect ~ returnMessage:", returnMessage)
    if (returnMessage === 'add successfully') {
      console.log('新增成功！');
      setDialogContent('新增成功！')
      handleClickOpen()
    }
  }, [returnMessage]);

  function getFormData(e) {
    const form = e.target;
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData)

    const tData = new Map()

    const webHeader = new Map()
    webHeader.set('title', formDataObject.title)
    webHeader.set('description', formDataObject.description)
    webHeader.set('keywords', formDataObject.keywords)
    formDataObject.manualUrl.length > 0 && webHeader.set('manualUrl', formDataObject.manualUrl)
    tData.set('webHeader', webHeader)

    const content = new Map()
    content.set('title', newTitleRef.current.value)
    content.set('content', editorContentRef.current)
    tData.set('content', content)
    if (!preview) {
      if (content.get('title') === '') {
        console.log('please add title!!!');
        return
      }
    }
    const media = new Map()
    media.set('banner', bannerRef.current)
    media.set('thumbnail', thumbnailRef.current)
    media.set('altText', imageAltTextRef.current.value)
    tData.set('media', media)

    tData.set('hide', !!formDataObject.hideSwitch)

    tData.set('tags', tagArrayRef.current)

    tData.set('classifications', classRef.current ? [classRef.current] : [])

    return tData
  }
  function onEditorSave(e) {
    e.preventDefault();

    const formData = getFormData(e)

    if (preview) {
      dispatch({
        type: GetEditorAction.PREVIEW_EDITOR,
        payload: {
          data: formData
        },
      })
      return
    }
    if (formData.size === 0) {
      console.log('nothing to add!!!');
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

  return (
    <div className={'container'}>
      <div className={'wrapper'}>
        <div className={'left-side'}>
          <EditorDialog
            open={open}
            handleClose={() => setOpen(false)}
            dialogTitle={dialogTitle}
            dialogContent={dialogContent}
          />
          <ContentEditorForm
            newTitleRef={newTitleRef}
            editorContentRef={editorContentRef}
          />
        </div>
        <div className={'right-side'}>
          <DetailForm
            bannerRef={bannerRef}
            thumbnailRef={thumbnailRef}
            imageAltTextRef={imageAltTextRef}
            imageUrlRef={imageUrlRef}
            imageNameRef={imageNameRef}
            manualUrlRef={manualUrlRef}
            customUrlRef={customUrlRef}
            tagArrayRef={tagArrayRef}
            classRef={classRef}
            onEditorSave={onEditorSave}
            // onPreviewButtonClick={onPreviewButtonClick}
            setPreview={setPreview}
          />
        </div>
      </div>
    </div>
  );
}

export default NewIEditor;

