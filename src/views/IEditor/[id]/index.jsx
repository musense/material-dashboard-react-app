import React, { useEffect, useRef, useState, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import CustomModal from "./../../../components/CustomModal/CustomModal.jsx";

import ContentEditorForm from "./../ContentEditorForm.jsx"
import DetailForm from "./../DetailForm.jsx"
import * as GetEditorAction from "../../../actions/GetEditorAction.js";

const webHeaderID = [
  'title', 'description', 'keywords', 'customUrl'
]

function IEditor({ props }) {

  const dispatch = useDispatch();


  const editor = useSelector((state) => state.getEditorReducer.editor);
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
  console.log("🚀 ~ file: index.jsx:33 ~ IEditor ~ initialValue:", initialValue)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const bannerRef = useRef();
  const thumbnailRef = useRef();
  const imageAltTextRef = useRef();
  const imageUrlRef = useRef(undefined);
  const imageNameRef = useRef(undefined);
  const customUrlRef = useRef();

  const idRef = useRef()
  const newTitleRef = useRef('');
  const editorContentRef = useRef(initialValue)
  const tagArrayRef = useRef(null);
  const classArrayRef = useRef(null);



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

    console.log("🚀 ~ file: index.jsx:108 ~ setDetailDefaultValue ~ hide:", hide)
  }

  setContentDefaultValue(editor)
  setDetailDefaultValue(editor)

  useMemo(() => {
    if (!editor) return
    tagArrayRef.current = editor.tags
    classArrayRef.current = editor.classifications
  }, [editor])

  console.log("🚀 ~ file: index.jsx:145 ~ IEditor ~ tagArrayRef:", tagArrayRef)
  console.log("🚀 ~ file: index.jsx:146 ~ IEditor ~ classArrayRef:", classArrayRef)

  function onEditorSave(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData)

    const tData = new Map()

    const webHeader = new Map()
    formDataObject.title !== editor.webHeader.title && (webHeader.set('title', formDataObject.title));
    formDataObject.description !== editor.webHeader.description && (webHeader.set('description', formDataObject.description))
    formDataObject.keywords !== editor.webHeader.keywords && (webHeader.set('keywords', formDataObject.keywords))
    formDataObject.customUrl !== editor.webHeader.customUrl && (webHeader.set('customUrl', formDataObject.customUrl))
    webHeader.size !== 0 && tData.set('webHeader', webHeader)
    console.log("🚀 ~ file: index.jsx:145 ~ onEditorSave ~ webHeader:", webHeader)

    const content = new Map()
    newTitleRef.current.value !== editor.content.title && (content.set('title', newTitleRef.current.value))
    editorContentRef.current !== editor.content.content && (content.set('content', editorContentRef.current))
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

    JSON.stringify(classArrayRef.current) !== JSON.stringify(editor.classifications) && (tData.set('classifications', classArrayRef.current))

    if (tData.size === 0) {
      console.log('nothing to update!!!');
      return
    }
    // return
    dispatch({
      type: GetEditorAction.UPDATE_EDITOR,
      payload: {
        id: editor._id,
        data: tData
      },
    })
  }

  return (
    <div className={'container'}>
      <div className={'wrapper'}>
        <div className={'left-side'}>
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
            customUrlRef={customUrlRef}
            tagArrayRef={tagArrayRef}
            classArrayRef={classArrayRef}
            onEditorSave={onEditorSave}
          />
        </div>
        <CustomModal ariaHideApp={false} isModalOpen={isModalOpen} />
        <CustomModal
          ariaHideApp={false}
          isModalOpen={isAddModalOpen}
          text={'add successfully'}
        />
      </div>
    </div>
  );
}

export default IEditor;

