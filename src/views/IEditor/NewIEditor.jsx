import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { editorConfig } from './editorConfig.js';

import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { ADD_EDITOR } from '../../actions/GetEditorAction';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../components/CustomModal/CustomModal.jsx';

function NewIEditor({ props }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const _id = useSelector((state) => state.getEditorReducer._id);
  const returnMessage = useSelector(
    (state) => state.getEditorReducer.errorMessage
  );
  const [contentData, setContentData] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newID, setNewID] = useState('');
  const editorRef = useRef();
  useEffect(() => {
    if (editorRef.current === null) {
      editorRef.current = 1;
    } else {
      if (
        returnMessage &&
        (returnMessage.indexOf('get successfully') !== -1 ||
          returnMessage.indexOf('add successfully') !== -1)
      ) {
        setIsModalOpen(false);
        setIsAddModalOpen(false);
      }
      setNewID(_id);
      if (newID) {
        navigate(`/admin/editorList/edit/${_id}`);
      }
    }
  }, [newID, returnMessage]);

  function handleAddData() {
    if (contentData === '' || newTitle === '') {
      return;
    }
    setIsAddModalOpen(true);
    dispatch({
      type: ADD_EDITOR,
      payload: {
        data: {
          title: newTitle,
          content: contentData,
        },
      },
    });
  }

  function handleGoBack() {
    setContentData('');
    setNewTitle('');
    navigate('/admin/editorList');
  }

  return (
    <div className='App'>
      <div className='iEditor-Title-Container'>
        <label htmlFor='title'>Title</label>
        <input
          name='title'
          type='text'
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
        />
      </div>
      <CKEditor
        ref={editorRef}
        editor={ClassicEditor}
        config={editorConfig}
        data={contentData}
        onReady={(editor) => {
          // console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContentData(data);
        }}
      />
      <button onClick={() => handleAddData()}>Add Data</button>
      <button onClick={() => handleGoBack()}>Go Back</button>
      <CustomModal ariaHideApp={false} isModalOpen={isModalOpen} />
      <CustomModal
        ariaHideApp={false}
        isModalOpen={isAddModalOpen}
        text={'add successfully'}
      />
    </div>
  );
}

export default NewIEditor;
