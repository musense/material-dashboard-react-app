import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { editorConfig } from './editorConfig.js';

import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_EDITOR,
  REQUEST_EDITOR_BY_TITLE,
  UPDATE_EDITOR,
} from '../../actions/GetEditorAction';
import { useParams, useNavigate } from 'react-router-dom';
import CustomModal from '../../components/CustomModal/CustomModal.jsx';

function IEditor({ props }) {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const title = useSelector((state) => state.getEditorReducer.title);
  const content = useSelector((state) => state.getEditorReducer.content);
  const returnMessage = useSelector(
    (state) => state.getEditorReducer.errorMessage
  );
  const [contentData, setContentData] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    setNewTitle(title);
    if (
      returnMessage &&
      (returnMessage.indexOf('get successfully') !== -1 ||
        returnMessage.indexOf('update successfully') !== -1)
    ) {
      setIsModalOpen(false);
      setIsUpdateModalOpen(false);
    }
    if (id) {
      dispatch({
        type: REQUEST_EDITOR_BY_TITLE,
        payload: {
          data: {
            id,
          },
        },
      });
    }
  }, [title, returnMessage]);

  function handleUpdateData() {
    if (contentData === '' || newTitle === '') {
      return;
    }
    if (
      JSON.stringify(contentData) === JSON.stringify(content) &&
      title === newTitle
    ) {
      return;
    }
    setIsUpdateModalOpen(true);
    dispatch({
      type: UPDATE_EDITOR,
      payload: {
        id,
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
      <div className='iEditor-Title-Container' key={id}>
        <label htmlFor='title'>Title</label>
        <input
          name='title'
          type='text'
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
        />
      </div>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfig}
        data={content}
        onReady={(editor) => {
          const data = editor.getData();
          setContentData(data);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContentData(data);
        }}
      />
      <button onClick={() => handleUpdateData()}>Update Data</button>
      <button onClick={() => handleGoBack()}>Go Back</button>
      <CustomModal ariaHideApp={false} isModalOpen={isModalOpen} />
      <CustomModal
        ariaHideApp={false}
        isModalOpen={isUpdateModalOpen}
        text={'update successfully'}
      />
    </div>
  );
}

export default IEditor;
