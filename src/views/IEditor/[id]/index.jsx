import React, { useEffect, useRef, useState, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import CustomModal from "./../../../components/CustomModal/CustomModal.jsx";

import ContentEditorForm from "./../ContentEditorForm.jsx"
import DetailForm from "./../DetailForm.jsx"
import * as GetEditorAction from "./../../../actions/GetEditorAction.js";

const webHeaderID = [
  'title', 'description', 'keywords', 'customUrl'
]

function IEditor({ props }) {

  const dispatch = useDispatch();


  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem('content')) || [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ],
    []
  )
  const getEditorReducer = useSelector((state) => state.getEditorReducer);
  console.log("🚀 ~ file: index.jsx:49 ~ IEditor ~ getEditorReducer:", getEditorReducer)

  const {
    webHeader,
    content,
    tags,
    classifications,
    media,
    setTop,
    hide,
    returnMessage
  } = getEditorReducer

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [tagArray, setTagArray] = useState([]);
  const [classArray, setClassArray] = useState([]);

  const bannerRef = useRef();
  const thumbnailRef = useRef();
  const imageAltTextRef = useRef();
  const imageUrlRef = useRef(undefined);
  const imageNameRef = useRef(undefined);
  const customUrlRef = useRef();
  const newTitleRef = useRef('');
  const editorContentRef = useRef(initialValue)

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
  useMemo(() => {
    console.log("🚀 ~ file: IEditor.jsx:75 ContentEditorForm ~ useMemo:", {
      content
    })

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

  }, [content])


  //*  set default value for DetailForm
  useMemo(() => {
    console.log("🚀 ~ file: IEditor.jsx:88 DetailForm ~ useMemo:", {
      webHeader, tags, classifications, media, setTop, hide
    })

    webHeaderID.map(id => setDefaultValueById(id, webHeader))
    customUrlRef.current = webHeader.customUrl

    if (media && media.altText) {
      setDefaultValueById('altText', media)
    }

    if (media && media.banner) {
      imageUrlRef.current = media.banner
      bannerRef.current = media.banner
      imageNameRef.current = media.banner.substring(media.banner.lastIndexOf('/') + 1)
    }

    if (tags && tags.length > 0) {
      setTagArray(tags)
    }
    if (classifications) {
      setClassArray([classifications])
    }
    setDefaultValueById('setTop', setTop)
    setDefaultValueById('hide', hide)
  }, [webHeader, tags, classifications, media, setTop, hide])



  useEffect(() => {


    if (
      returnMessage &&
      (returnMessage.indexOf('get successfully') !== -1 ||
        returnMessage.indexOf('add successfully') !== -1)
    ) {
      setIsModalOpen(false);
      setIsAddModalOpen(false);
    }

  }, [returnMessage]);

  function onEditorSave(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    console.log(newTitleRef.current.value);
    console.log(editorContentRef.current);

    // return
    // Object.fromEntries(formData)
    const formDataObject = Object.fromEntries(formData)
    console.log("🚀 ~ file: NewIEditor.jsx:66 ~ onEditorSave ~ formDataObject:", formDataObject)

    let tempData = Object.assign(
      {},
      // formDataObject,
      {
        tags: tagArray,
        classification: classArray,
        webHeader: {
          title: formDataObject.title,
          description: formDataObject.description,
          keywords: formDataObject.keywords,
          href: formDataObject.customUrl,
        },
        content: {
          title: newTitleRef.current.value,   //文章標題
          content: editorContentRef.current   //文章內容
        },
        media: {
          banner: bannerRef.current,        // main-image
          thumbnail: thumbnailRef.current,  // thumbnail
          altText: imageAltTextRef.current.value === ''
            ? newTitleRef.current.value
            : imageAltTextRef.current.value,  // alt-text
        },
        setTop: formDataObject['set-to-top-checkbox']
          ? true
          : false,
        hide: formDataObject['hide-switch-checkbox']
          ? true
          : false,
      }
    )

    delete tempData['upload-image'];

    console.log('🚀 ~ file: NewIEditor.jsx:84 ~ onEditorSave ~ tempData:', tempData);

    // return
    dispatch({
      type: GetEditorAction.ADD_EDITOR,
      payload: {
        data: tempData
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
            onEditorSave={onEditorSave}
            setTagArray={setTagArray}
            selectedTags={tags}
            setClassArray={setClassArray}
            selectedClassifications={classifications}
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

