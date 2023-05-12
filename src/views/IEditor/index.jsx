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

  const returnMessage = useSelector((state) => state.getEditorReducer.errorMessage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [tagArray, setTagArray] = useState([]);
  const [classArray, setClassArray] = useState([]);

  const bannerRef = useRef();
  const thumbnailRef = useRef();
  const imageAltTextRef = useRef();
  const imageUrlRef = useRef(undefined);
  const imageNameRef = useRef(undefined);
  const customUrlRef = useRef('');

  const idRef = useRef()
  const newTitleRef = useRef('');
  const editorContentRef = useRef(initialValue)

  const tagArrayRef = useRef(null);
  const classArrayRef = useRef(null);

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
    const formDataObject = Object.fromEntries(formData)

    const tData = new Map()

    const webHeader = new Map()
    webHeader.set('title', formDataObject.title)
    webHeader.set('description', formDataObject.description)
    webHeader.set('keywords', formDataObject.keywords)
    webHeader.set('customUrl', formDataObject.customUrl)
    tData.set('webHeader', webHeader)

    const content = new Map()
    content.set('title', newTitleRef.current.value)
    content.set('content', editorContentRef.current)
    tData.set('content', content)
    if (content.get('title') === '') {
      console.log('please add title!!!');
      return
    }

    const media = new Map()
    media.set('banner', bannerRef.current)
    media.set('thumbnail', thumbnailRef.current)
    media.set('altText', imageAltTextRef.current.value)
    tData.set('media', media)

    tData.set('hide', !!formDataObject.hideSwitch)

    tData.set('tags', tagArrayRef.current)

    tData.set('classifications', classArrayRef.current)

    console.log("🚀 ~ file: index.jsx:66 ~ onEditorSave ~ tData:", tData)
    // return
    dispatch({
      type: GetEditorAction.ADD_EDITOR,
      payload: {
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

export default NewIEditor;

