import React, { useState } from "react";
import MultiTagSelectSort from '../../components/MultiSelectSort/MultiTagSelectSort';
import MultiClassSelectSort from '../../components/MultiSelectSort/MultiClassSelectSort';
import { fetchYoutubeInfo } from './youtube';
import styles from './IEditor.module.css';

export default function DetailForm({
    bannerRef,
    thumbnailRef,
    onEditorSave,
    setTagArray,
    setClassArray
}) {


    const [imageUrl, setImageUrl] = useState(undefined);
    const [imageName, setImageName] = useState(undefined);
    const [customUrl, setCustomUrl] = useState('');

    const mediaHelperFunc = {
        async previewFilm() {
            this.removeImage();
            const filmUrl = document.getElementsByName('film-url')[0].value;

            // https://www.youtube.com/watch?v=n-WbAWqZ7t4
            const youtubeID = filmUrl.substring(
                filmUrl.indexOf('?v=') + 3,
                filmUrl.length
            );
            const youtubeInfo = await fetchYoutubeInfo(youtubeID);

            if (youtubeInfo) {
                const imageWrapper = document.getElementById('preview-image-wrapper');
                imageWrapper.innerHTML = youtubeInfo.html;
                // setFilmHTML(youtubeInfo.html)
                // setFilmThumbnail(youtubeInfo.thumbnail_url)
                bannerRef.current = youtubeInfo.html;
                thumbnailRef.current = youtubeInfo.thumbnail_url;
            }
        },
        removeFilm() {
            // setFilmUrl(undefined);
            // setFilmName(undefined)
            // setFilmThumbnail(undefined)
            // setFilmHTML(undefined)
            document.getElementsByName('film-url')[0].value = null;
            const imageWrapper = document.getElementById('preview-image-wrapper');
            imageWrapper.innerHTML = null;
        },
        removeImage() {
            setImageUrl(undefined);
            setImageName(undefined);
        },
        previewImage(e) {
            this.removeFilm();
            const image = e.target.files[0];
            if (image) {
                setImageName(image.name);
                setImageUrl(URL.createObjectURL(image));
                bannerRef.current = URL.createObjectURL(image);
                thumbnailRef.current = null;
            }
        }
    }


    function UploadImage({ styles }) {
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
                            onChange={(e) => mediaHelperFunc.previewImage(e)}
                            className='image-group'
                        />
                    </label>
                    <input
                        type='button'
                        name='remove-image'
                        value='刪除圖片'
                        onClick={() => mediaHelperFunc.removeImage()}
                        className='image-group'
                    />
                </div>
            </div>
        );
    }
    function UploadYoutube({ styles }) {
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
                            onClick={() => mediaHelperFunc.previewFilm()}
                            className='film-group'
                        />
                    </label>
                    <input
                        type='button'
                        name='remove-image'
                        value='刪除影片'
                        onClick={() => mediaHelperFunc.removeFilm()}
                        className='film-group'
                    />
                </div>
            </div>
        );
    }
    function PreviewMedia({ styles }) {
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
        <>
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

                    <UploadImage styles={styles} />

                    <UploadYoutube styles={styles} />

                    <PreviewMedia styles={styles} />
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
        </>
    );
}
