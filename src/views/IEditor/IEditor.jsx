import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import { useDispatch, useSelector } from 'react-redux';
import {
  REQUEST_EDITOR_BY_TITLE,
  UPDATE_EDITOR,
} from '../../actions/GetEditorAction';
import { useParams, useNavigate } from 'react-router-dom';
import CustomModal from '../../components/CustomModal/CustomModal.jsx';
import styles from './IEditor.module.css';

function IEditor({ props }) {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const title = useSelector((state) => state.getEditorReducer.title);
  const content = useSelector((state) => state.getEditorReducer.content);
  const tags = useSelector((state) => state.getEditorReducer.tags);
  const tagList = useSelector((state) => state.getTagReducer.tagList);

  const returnMessage = useSelector(
    (state) => state.getEditorReducer.errorMessage
  );
  const [contentData, setContentData] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [chosenTags, setChosenTags] = useState('');
  const [defaultTags, setDefaultTags] = useState(null);

  const options =
    tagList && tagList.map((tag) => ({ value: tag._id, label: tag.name }));

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
    if (tags) {
      mapTagNameToTags(tags, tagList);
    }

    return () => {};
  }, [title, returnMessage]);

  function mapTagNameToTags(tagNames, tagList) {
    const mappedTags = tagList
      .filter((tag) => {
        if (tagNames.includes(tag.name)) {
          return true;
        } else {
          return false;
        }
      })
      .map((tag) => ({ value: tag._id, label: tag.name }));

    setDefaultTags(mappedTags);
  }
  function handleUpdateData() {
    const tagChanged =
      JSON.stringify(chosenTags) === JSON.stringify(defaultTags);
    const contentChanged =
      JSON.stringify(contentData) === JSON.stringify(content);
    const titleChanged = title === newTitle;

    if (tagChanged && contentChanged && titleChanged) {
      console.log('nothing changed!!!');
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
          tags: chosenTags,
        },
      },
    });
  }

  function handleGoBack() {
    navigate('/admin/editorList');
  }
  function handleItemsChosen(itemArray) {
    const chosenTagNames = itemArray.map((item) => item.label);
    setChosenTags(chosenTagNames);
  }
  return (
    <div className='App'>
      {defaultTags ? (
        <Select
          options={options}
          onChange={(itemArray) => handleItemsChosen(itemArray)}
          isMulti={true}
          closeMenuOnSelect={false}
          defaultValue={defaultTags}
          className={styles['editor-select']}
        />
      ) : null}
      <div className='iEditor-Title-Container' key={id}>
        <label htmlFor='title'>Title</label>
        <input
          name='title'
          type='text'
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
        />
      </div>
      {/* <CKEditor
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
      /> */}
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
