import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { editorConfig } from './editorConfig.js';

import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  REQUEST_EDITOR_BY_TITLE,
  UPDATE_EDITOR,
} from '../../actions/GetEditorAction';
import { useParams, useNavigate } from 'react-router-dom';

function IEditor({ props }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const title = useSelector((state) => state.getEditorReducer.title);
  const content = useSelector((state) => state.getEditorReducer.content);

  const [contentData, setContentData] = useState(null);

  function handleUpdateData() {
    if (contentData === null) {
      console.log(`nothing to update!!!`);
      return;
    }
    console.group(`handleUpdateData`);
    console.log(id);
    console.log(contentData);
    console.groupEnd(`handleUpdateData`);
    dispatch({
      type: UPDATE_EDITOR,
      payload: {
        id,
        data: {
          content: contentData,
        },
      },
    });
  }

  function handleGoBack() {
    setContentData(null);
    navigate(-1);
  }

  // const setDataContent = `<h1>${title}</h1>${content}`;

  // console.log(title);
  console.log(content);
  useEffect(() => {
    dispatch({
      type: REQUEST_EDITOR_BY_TITLE,
      payload: {
        id,
      },
    });
  }, [id]);
  return (
    <div className='App'>
      <h2>Using CKEditor 5 build in React</h2>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfig}
        data={content}
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContentData(data);
        }}
      />
      <button onClick={() => handleUpdateData()}>Update Data</button>
      <button onClick={() => handleGoBack()}>Go Back</button>
    </div>
  );
}

export default IEditor;
