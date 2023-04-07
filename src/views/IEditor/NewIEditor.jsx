import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../components/CustomModal/CustomModal.jsx';

import ContentEditorForm from "./ContentEditorForm"
import DetailForm from "./DetailForm"
import * as GetEditorAction from './../../actions/GetEditorAction.js';


function NewIEditor({ props }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValue = React.useMemo(
    () =>
      JSON.parse(localStorage.getItem('content')) || [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ],
    []
  )
  const newTitleRef = useRef('');
  const editorContentRef = React.useRef(initialValue)
  const returnMessage = useSelector(
    (state) => state.getEditorReducer.errorMessage
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [tagArray, setTagArray] = useState([]);
  const [classArray, setClassArray] = useState([]);

  const bannerRef = useRef();
  const thumbnailRef = useRef();

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
        'web-header': {
          title: formDataObject.title,
          description: formDataObject.description,
          keywords: formDataObject.keywords,
          href: formDataObject['custom-url'],
        },
        content: {
          title: newTitleRef.current.value,   //文章標題
          content: editorContentRef.current   //文章內容
        },
        media: {
          banner: bannerRef.current,        // main-image
          thumbnail: thumbnailRef.current,  // thumbnail
          // film: formDataObject['film-url'],
        },
        'set-top': formDataObject['set-to-top-checkbox'] ? true: false,
        hide: formDataObject['hide-switch-checkbox'] ? true: false,
      }
    )

    delete tempData['upload-image'];

    console.log(
      '🚀 ~ file: NewIEditor.jsx:84 ~ onEditorSave ~ tempData:',
      tempData
    );

      return
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

