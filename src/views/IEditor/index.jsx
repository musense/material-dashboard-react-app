import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../../components/CustomModal/CustomModal.jsx';

import ContentEditorForm from "./ContentEditorForm.jsx"
import DetailForm from "./DetailForm.jsx"
import * as GetEditorAction from '../../actions/GetEditorAction.js';


function NewIEditor({ props }) {

  const dispatch = useDispatch();

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]

  const returnMessage = useSelector(
    (state) => state.getEditorReducer.errorMessage
  );

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
            setClassArray={setClassArray}
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

export default NewIEditor;

