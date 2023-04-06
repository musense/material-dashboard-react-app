// Import the Slate editor.
import React, { useEffect, useRef, useState, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { ADD_EDITOR } from '../../actions/GetEditorAction';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../components/CustomModal/CustomModal.jsx';
import MultiTagSelectSort from './MultiTagSelectSort';
import MultiClassSelectSort from './MultiClassSelectSort';
import styles from './IEditor.module.css';
import { fetchYoutubeInfo } from './youtube';
import SlateEditor from './slateEditor';


function NewIEditor({ props }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const _id = useSelector((state) => state.getEditorReducer._id);
  const tagList = useSelector((state) => state.getTagReducer.tagList);
  const editorClassList = useSelector(
    (state) => state.getEditorClassReducer.editorClassList
  );
  const returnMessage = useSelector(
    (state) => state.getEditorReducer.errorMessage
  );
  const [newTitle, setNewTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newID, setNewID] = useState('');
  const [chosenTags, setChosenTags] = useState([]);
  const [chosenEditorClass, setChosenEditorClass] = useState([]);
  const editorRef = useRef();

  const [tagArray, setTagArray] = useState([]);
  const [classArray, setClassArray] = useState([]);

  const bannerRef = useRef();
  const thumbnailRef = useRef();

  const classOptions =
    editorClassList &&
    editorClassList.map((editorClass) => ({
      value: editorClass._id,
      label: editorClass.classification,
    }));
  const tagOptions =
    tagList && tagList.map((tag) => ({ value: tag._id, label: tag.name }));

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

  function handleTagItemChosen(itemArray) {
    const chosenTagNames = itemArray.map((item) => item.label);
    setChosenTags(chosenTagNames);
  }
  function handleEditorClassItemChosen(itemArray) {
    const chosenEditorClassNames = itemArray.map((item) => item.label);
    setChosenEditorClass(chosenEditorClassNames);
  }

  function onEditorSave(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    // Object.fromEntries(formData)
    let tempData = Object.fromEntries(formData);
    tempData = Object.assign(
      tempData,
      { tags: tagArray },
      { classification: classArray }
    );

    tempData = Object.assign(tempData, {
      media: {
        banner: bannerRef.current, // main-image
        thumbnail: thumbnailRef.current, // thumbnail
      },
    });

    delete tempData['upload-image'];

    console.log(
      '🚀 ~ file: NewIEditor.jsx:84 ~ onEditorSave ~ tempData:',
      tempData
    );
  }

  return (
    <div className={'container'}>
      <div className={'wrapper'}>
        {ContentEditorForm(
          setNewTitle,
          newTitle,
          editorRef,
          isModalOpen,
          isAddModalOpen
        )}
        {DetailForm(
          bannerRef,
          thumbnailRef,
          onEditorSave,
          setTagArray,
          setClassArray
        )}
      </div>
    </div>
  );
}

export default NewIEditor;


function ContentEditorForm(
  setNewTitle,
  newTitle,
  editorRef,
  isModalOpen,
  isAddModalOpen
) {
  function handleAddData() { }

  function handleGoBack() { }

 

  return (
    <div className={'left-side'}>
      <div className='iEditor-Title-Container'>
        <label htmlFor='title'>Title</label>
        <input
          name='title'
          type='text'
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
        />
      </div>
      <SlateEditor />
      <CustomModal ariaHideApp={false} isModalOpen={isModalOpen} />
      <CustomModal
        ariaHideApp={false}
        isModalOpen={isAddModalOpen}
        text={'add successfully'}
      />
    </div>
  );
}

function DetailForm(
  bannerRef,
  thumbnailRef,
  onEditorSave,
  setTagArray,
  setClassArray
) {
  const [imageUrl, setImageUrl] = useState(undefined);
  const [imageName, setImageName] = useState(undefined);
  // const [filmThumbnail, setFilmThumbnail] = useState(undefined);
  // const [filmHTML, setFilmHTML] = useState(undefined);
  const [customUrl, setCustomUrl] = useState('');
  async function previewFilm() {
    removeImage();
    const filmUrl = document.getElementsByName('film-url')[0].value;
    console.log(
      '🚀 ~ file: NewIEditor.jsx:154 ~ previewFilm ~ filmUrl:',
      filmUrl
    );
    // https://www.youtube.com/watch?v=n-WbAWqZ7t4
    const youtubeID = filmUrl.substring(
      filmUrl.indexOf('?v=') + 3,
      filmUrl.length
    );
    const youtubeInfo = await fetchYoutubeInfo(youtubeID);
    console.log(
      '🚀 ~ file: NewIEditor.jsx:129 ~ previewFilm ~ youtubeInfo:',
      youtubeInfo
    );
    if (youtubeInfo) {
      const imageWrapper = document.getElementById('preview-image-wrapper');
      imageWrapper.innerHTML = youtubeInfo.html;
      // setFilmHTML(youtubeInfo.html)
      // setFilmThumbnail(youtubeInfo.thumbnail_url)
      bannerRef.current = youtubeInfo.html;
      thumbnailRef.current = youtubeInfo.thumbnail_url;
    }
  }

  function removeFilm() {
    // setFilmUrl(undefined);
    // setFilmName(undefined)
    // setFilmThumbnail(undefined)
    // setFilmHTML(undefined)
    document.getElementsByName('film-url')[0].value = null;
    const imageWrapper = document.getElementById('preview-image-wrapper');
    imageWrapper.innerHTML = null;
  }
  function removeImage() {
    setImageUrl(undefined);
    setImageName(undefined);
  }
  function previewImage(e) {
    removeFilm();
    const image = e.target.files[0];
    console.log('🚀 ~ file: NewIEditor.jsx:95 ~ previewImage ~ image:', image);
    if (image) {
      setImageName(image.name);
      setImageUrl(URL.createObjectURL(image));
      bannerRef.current = URL.createObjectURL(image);
      thumbnailRef.current = null;
      console.log(
        '🚀 ~ file: NewIEditor.jsx:98 ~ previewImage ~ URL.createObjectURL(image):',
        URL.createObjectURL(image)
      );
    }
  }
  function UploadImage() {
    return (
      <div className={`${styles['upload-wrapper']}`}>
        <div>
          <label htmlFor='alt-text'>選取圖片</label>
          {/* <input type='text' name='alt-text' className='image-group' /> */}
        </div>
        <div>
          <label htmlFor='upload-image'>
            上傳圖片
            <input
              id='upload-image'
              type='file'
              name='upload-image'
              accept='image/png, image/jpeg'
              onChange={previewImage}
              className='image-group'
            />
          </label>
          <input
            type='button'
            name='remove-image'
            value='刪除圖片'
            onClick={removeImage}
            className='image-group'
          />
        </div>
      </div>
    );
  }
  function UploadYoutube() {
    return (
      <div className={`${styles['upload-wrapper']} `}>
        <div>
          <label htmlFor='film-url'>影片連結</label>
          <input
            type='text'
            name='film-url'
            className='film-group'
          />
        </div>
        <div>
          <label htmlFor='film-url-preview'>
            選取影片
            <input
              id='film-url-preview'
              type='button'
              name='film-url-preview'
              onClick={previewFilm}
              className='film-group'
            />
          </label>
          <input
            type='button'
            name='remove-image'
            value='刪除影片'
            onClick={removeFilm}
            className='film-group'
          />
        </div>
      </div>
    );
  }
  function previewMedia() {
    return (
      <div
        id='preview-image-wrapper'
        className={styles['preview-image-wrapper']}
        data-attr={imageName}
        style={
          imageUrl && {
            backgroundImage: `url(${imageUrl})`,
            backgroundColor: 'initial',
          }
        }
      />
    );
  }
  return (
    <div className={'right-side'}>
      <form name='ieditor-detail-form' onSubmit={onEditorSave}>
        <div className={styles['input-group']}>
          <label htmlFor='title'>title</label>
          <input type='text' name='title' />
        </div>
        <div className={styles['input-group']}>
          <label htmlFor='description'>description</label>
          <input type='text' name='description' />
        </div>
        <div className={styles['input-group']}>
          <label htmlFor='keywords'>keywords</label>
          <input type='text' name='keywords' />
        </div>
        <div className={styles['input-group']}>
          <label htmlFor='custom-url'>自訂網址</label>
          <input
            type='text'
            name='custom-url'
            onChange={(e) => setCustomUrl(e.target.value)}
          />
        </div>
        <div className={styles['input-group']}>
          <label htmlFor='real-url'>前台顯示網址</label>
          <input
            type='text'
            name='real-url'
            value={`https://kashinobi.com/${customUrl}`}
            readOnly
            disabled
          />
        </div>
        <div className={styles['input-group']}>
          <label htmlFor='tags'>新增標籤</label>
          <MultiTagSelectSort setSelectedItems={setTagArray} />
        </div>
        <div className={styles['input-group']}>
          <label htmlFor='classification'>分類</label>
          <MultiClassSelectSort setSelectedItems={setClassArray} />
        </div>
        <div className={styles['image-upload-container']}>
          {/* <div className={styles['image-wrapper']}>
          <label htmlFor="image">文章圖片</label>
          <input type='checkbox' name='image-checkbox' onChange={onImageCheck} />
        </div> */}
          {UploadImage()}
          {/* <div className={styles['film-wrapper']}>
          <label htmlFor="film">連結影片</label>
          <input type='checkbox' name='film-checkbox' onChange={onFilmCheck} />
        </div> */}
          {UploadYoutube()}

          {previewMedia()}
        </div>
        <div className={styles['input-group']}>
          <label htmlFor='set-to-top'>將這篇文章「置頂」</label>
          <input
            type='checkbox'
            name='set-to-top-checkbox'
            className={styles['custom-switch']}
          />
        </div>
        <div className={styles['input-group']}>
          <label htmlFor='hide-switch'>將這篇文章「隱藏」</label>
          <input
            type='checkbox'
            name='hide-switch-checkbox'
            className={styles['custom-switch']}
          />
        </div>
        <div className={styles['button-wrapper']}>
          <input type='submit' value='確認' />
          <input type='button' value='預覽' />
        </div>
      </form>
    </div>
  );
}
