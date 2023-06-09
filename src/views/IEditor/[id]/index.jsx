import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ContentEditorForm from "./../ContentEditorForm.jsx"
import DetailForm from "./../DetailForm.jsx"
import * as GetEditorAction from "actions/GetEditorAction.js";
import EditorDialog from '../EditorDialog.jsx';


const webHeaderID = [
  'title', 'description', 'keywords', 'customUrl'
]

function IEditor({ props }) {

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


  const initialValue = useMemo(
    () =>
      editor ? editor.content.content : [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ],
    [editor]
  )
  // console.log("🚀 ~ file: index.jsx:33 ~ IEditor ~ initialValue:", initialValue)

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
    setDialogTitle('修改文章訊息')
  }, []);

  // useEffect(() => {

  //   console.log("🚀 ~ file: index.jsx:66 ~ useEffect ~ previewID:", previewID)
  //   if (previewID) {
  //     window.open(`http://10.88.0.103:4200/preview_${previewID}`, '_blank');
  //   }
  // }, [previewID]);
  useEffect(() => {
    if (!returnMessage) return

    if (returnMessage === "Editor update successfully") {

      console.log('更新成功！');
      setDialogContent('更新成功！')
      handleClickOpen()

      console.log('Editor update successfully');
      console.log("🚀 ~ file: index.jsx:79 ~ useEffect ~ id:", id)
      requestEditorByID(id)
    }
  }, [returnMessage, id]);

  function setDefaultValueById(id, obj) {
    const item = document.getElementById(`detail-form-${id}`)
    if (!item) return
    switch (item.type) {
      case 'checkbox': {
        item.checked = obj
        break;
      }
      case 'text':
      default: {
        item.value = obj[id]
        break;
      }
    }
  }

  //*  set default value for ContentEditorForm
  const setContentDefaultValue = (editor) => {
    if (!editor) return
    const { content } = editor
    if (content && content.title) {
      // content-editor-title
      const id = 'title'
      const item = document.getElementById(`content-editor-${id}`)
      if (!item) return
      item.value = content[id]

      // newTitleRef.current.value = content.title
    }
    if (content && content.content) {
      editorContentRef.current = content.content
    }
  }

  //*  set default value for DetailForm
  const setDetailDefaultValue = (editor) => {
    if (!editor) return
    const { webHeader, media, hide } = editor


    webHeaderID.map(id => setDefaultValueById(id, webHeader))
    customUrlRef.current = webHeader.customUrl
    manualUrlRef.current.value = ''
    if (media && media.altText) {
      setDefaultValueById('altText', media)
    }

    if (media && media.banner) {
      imageUrlRef.current = media.banner
      bannerRef.current = media.banner
      //* 圖片才要取檔名
      if (media.banner.indexOf('<iframe') === -1) {
        imageNameRef.current = media.banner.substring(media.banner.lastIndexOf('/') + 1)
      }
    }

    setDefaultValueById('hide', hide)

    // console.log("🚀 ~ file: index.jsx:108 ~ setDetailDefaultValue ~ hide:", hide)
  }

  setContentDefaultValue(editor)
  setDetailDefaultValue(editor)

  useMemo(() => {
    if (!editor) return
    tagArrayRef.current = editor.tags
    classRef.current = editor.classifications ? editor.classifications : null
  }, [editor])

  // console.log("🚀 ~ file: index.jsx:145 ~ IEditor ~ tagArrayRef:", tagArrayRef)
  // console.log("🚀 ~ file: index.jsx:146 ~ IEditor ~ classArrayRef:", classArrayRef)


  function getFormData(e) {
    const form = e.target;
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData)

    const tData = new Map()

    if (preview) {
      const webHeader = new Map()
      webHeader.set('title', formDataObject.title)
      webHeader.set('description', formDataObject.description)
      webHeader.set('keywords', formDataObject.keywords)
      webHeader.set('customUrl', formDataObject.customUrl)
      tData.set('webHeader', webHeader)
      console.log("🚀 ~ file: index.jsx:145 ~ onEditorSave ~ webHeader:", webHeader)

      const content = new Map()
      content.set('title', newTitleRef.current.value)
      content.set('content', editorContentRef.current)
      tData.set('content', content)
      console.log("🚀 ~ file: index.jsx:145 ~ onEditorSave ~ content:", content)

      const media = new Map()
      media.set('banner', bannerRef.current)
      media.set('thumbnail', editor.media.thumbnail)
      media.set('altText', imageAltTextRef.current.value)
      tData.set('media', media)
      console.log("🚀 ~ file: index.jsx:152 ~ onEditorSave ~ media:", media)

      tData.set('hide', !!formDataObject.hideSwitch)

      tData.set('tags', tagArrayRef.current)

      tData.set('classifications', [classRef.current])

    } else {
      const webHeader = new Map()
      formDataObject.title !== editor.webHeader.title && (webHeader.set('title', formDataObject.title));
      formDataObject.description !== editor.webHeader.description && (webHeader.set('description', formDataObject.description))
      formDataObject.keywords !== editor.webHeader.keywords && (webHeader.set('keywords', formDataObject.keywords))
      formDataObject.manualUrl.length > 0 && (webHeader.set('manualUrl', formDataObject.manualUrl))
      webHeader.size !== 0 && tData.set('webHeader', webHeader)
      console.log("🚀 ~ file: index.jsx:145 ~ onEditorSave ~ webHeader:", webHeader)

      const content = new Map()
      newTitleRef.current.value !== editor.content.title && (content.set('title', newTitleRef.current.value))
      JSON.stringify(editorContentRef.current) !== JSON.stringify(editor.content.content) && (content.set('content', editorContentRef.current))
      content.size !== 0 && tData.set('content', content)
      console.log("🚀 ~ file: index.jsx:145 ~ onEditorSave ~ content:", content)

      const media = new Map()
      bannerRef.current !== editor.media.banner && (media.set('banner', bannerRef.current))
      thumbnailRef.current && thumbnailRef.current !== editor.media.thumbnail && (media.set('thumbnail', thumbnailRef.current))
      console.log("🚀 ~ file: index.jsx:150 ~ onEditorSave ~ editor.media.thumbnail:", editor.media.thumbnail)
      imageAltTextRef.current.value !== editor.media.altText && (media.set('altText', imageAltTextRef.current.value))
      media.size !== 0 && tData.set('media', media)
      console.log("🚀 ~ file: index.jsx:152 ~ onEditorSave ~ media:", media)

      !!formDataObject.hideSwitch !== editor.hide && (tData.set('hide', !!formDataObject.hideSwitch))

      JSON.stringify(tagArrayRef.current) !== JSON.stringify(editor.tags) && (tData.set('tags', tagArrayRef.current))

      JSON.stringify(classRef.current) !== JSON.stringify(editor.classifications) && (tData.set('classifications', classRef.current ? [classRef.current] : null))
    }

    return tData
  }


  function onEditorSave(e) {
    e.preventDefault(e);

    const formData = getFormData(e);
    console.log("🚀 ~ file: index.jsx:198 ~ onEditorSave ~ formData:", formData)

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
      console.log('nothing to update!!!');
      setDialogContent('沒有更新任何資訊！')
      handleClickOpen()
      return
    }
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


  // const onPreviewButtonClick = (e) => {

  //   e.preventDefault(e);

  //   const formData = getFormData();

  // }

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

export default IEditor;

