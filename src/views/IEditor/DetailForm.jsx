import React, { useState } from "react";
import MultiTagSelectSort from '../../components/MultiSelectSort/MultiTagSelectSort';
import MultiClassSelectSort from '../../components/MultiSelectSort/MultiClassSelectSort';
import { fetchYoutubeInfo } from './youtube';
import styles from './IEditor.module.css';
import { css, cx } from '@emotion/css';

export default function DetailForm({
    bannerRef,
    thumbnailRef,
    imageAltTextRef,
    imageUrlRef,
    imageNameRef,
    customUrlRef,
    onEditorSave,
    setTagArray,
    setClassArray,
    selectedTags = [],
    selectedClassifications = []
}) {

    const [customUrl, setCustomUrl] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [imageName, setImageName] = useState();

    const mediaHelperFunc = {
        previewImage(e) {
            this.removeFilm();
            const image = e.target.files[0];
            if (image) {
                setImageName(image.name)
                setImageUrl(URL.createObjectURL(image))

                bannerRef.current = URL.createObjectURL(image);
                thumbnailRef.current = null;
            }
        },
        removeImage() {
            setImageUrl(undefined)
            setImageName(undefined)
            imageUrlRef.current = undefined
            imageNameRef.current = undefined
        },
        async previewFilm() {
            this.removeImage();
            const filmUrl = document.getElementsByName('film-url')[0].value;

            // https://www.youtube.com/watch?v=n-WbAWqZ7t4
            const youtubeID = filmUrl.substring(
                filmUrl.indexOf('?v=') + 3,
                filmUrl.length
            );
            const youtubeInfo = await fetchYoutubeInfo(youtubeID);
            console.log("🚀 ~ file: DetailForm.jsx:32 ~ previewFilm ~ youtubeInfo:", youtubeInfo)

            if (youtubeInfo) {
                const imageWrapper = document.getElementById('preview-image-wrapper');
                imageWrapper.innerHTML = youtubeInfo.html;
                bannerRef.current = youtubeInfo.html;
                thumbnailRef.current = youtubeInfo.thumbnail_url;
            }
        },
        removeFilm() {
            document.getElementsByName('film-url')[0].value = null;
            const imageWrapper = document.getElementById('preview-image-wrapper');
            imageWrapper.innerHTML = null;
        },
    }

    // function UploadImage({ styles }) {
    //     return (
    //         <div className={`${styles['upload-wrapper']}`}>
    //             <div>
    //                 <label htmlFor='alt-text'>選取圖片</label>
    //                 <input
    //                     ref={imageAltTextRef}
    //                     type='text' name='alt-text'
    //                     id='detail-form-alt-text'
    //                     placeholder={'替代文字'}
    //                     className={cx(
    //                         'image-group',
    //                         css`
    //                         ::placeholder{
    //                             color: lightgray;
    //                         }
    //                             `
    //                     )}
    //                 />
    //             </div>
    //             <div>
    //                 <label htmlFor='upload-image'>
    //                     上傳圖片
    //                     <input
    //                         id='upload-image'
    //                         type='file'
    //                         name='upload-image'
    //                         accept='image/png, image/jpeg'
    //                         onChange={(e) => mediaHelperFunc.previewImage(e)}
    //                         className='image-group'
    //                     />
    //                 </label>
    //                 <input
    //                     type='button'
    //                     name='remove-image'
    //                     value='刪除圖片'
    //                     onClick={() => mediaHelperFunc.removeImage()}
    //                     className='image-group'
    //                 />
    //             </div>
    //         </div>
    //     );
    // }
    // function UploadYoutube({ styles }) {
    //     return (
    //         <div className={`${styles['upload-wrapper']} `}>
    //             <div>
    //                 <label htmlFor='film-url'>影片連結</label>
    //                 <input
    //                     type='text'
    //                     name='film-url'
    //                     id='detail-form-film-url'
    //                     placeholder={'影片連結'}
    //                     className={cx(
    //                         'film-group',
    //                         css`
    //                         ::placeholder{
    //                             color: lightgray;
    //                         }
    //                             `
    //                     )} />
    //                 {/* <input type='text' name='alt-text-2' placeholder={'替代文字'}
    //                     className={cx(
    //                         'film-group',
    //                         css`
    //                         ::placeholder{
    //                             color: lightgray;
    //                         }
    //                             `
    //                     )} /> */}
    //             </div>
    //             <div>
    //                 <label htmlFor='film-url-preview'>
    //                     選取影片
    //                     <input
    //                         id='film-url-preview'
    //                         type='button'
    //                         name='film-url-preview'
    //                         onClick={() => mediaHelperFunc.previewFilm()}
    //                         className='film-group'
    //                     />
    //                 </label>
    //                 <input
    //                     type='button'
    //                     name='remove-image'
    //                     value='刪除影片'
    //                     onClick={() => mediaHelperFunc.removeFilm()}
    //                     className='film-group'
    //                 />
    //             </div>
    //         </div>
    //     );
    // }
    function PreviewMedia({ styles }) {
        return (
            <div
                id='preview-image-wrapper'
                className={styles['preview-image-wrapper']}
                data-attr={imageName || imageNameRef.current}
                style={
                    (imageUrl || imageUrlRef.current) && {
                        backgroundImage: `url(${imageUrl || imageUrlRef.current})`,
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
                    <input type='text' name='title' id='detail-form-title' />
                </div>
                <div className={styles['input-group']}>
                    <label htmlFor='description'>description</label>
                    <input type='text' name='description' id='detail-form-description' />
                </div>
                <div className={styles['input-group']}>
                    <label htmlFor='keywords'>keywords</label>
                    <input type='text' name='keywords' id='detail-form-keywords' />
                </div>
                <div className={styles['input-group']}>
                    <label htmlFor='custom-url'>自訂網址</label>
                    <input
                        type='text'
                        name='customUrl'
                        id='detail-form-customUrl'
                        onChange={(e) => {
                            setCustomUrl(e.target.value)
                            customUrlRef.current = e.target.value
                        }}
                    />
                </div>
                <div className={styles['input-group']}>
                    <label htmlFor='real-url'>前台顯示網址</label>
                    <input
                        type='text'
                        name='real-url'
                        value={`https://kashinobi.com/${customUrl || customUrlRef.current}`}
                        readOnly
                        disabled
                    />
                </div>
                <div className={styles['input-group']}>
                    <label htmlFor='tags'>新增標籤</label>
                    {!selectedTags && <MultiTagSelectSort setSelectedItems={setTagArray} />}
                    {selectedTags && <MultiTagSelectSort setSelectedItems={setTagArray} selectedItems={selectedTags} />}
                </div>
                <div className={styles['input-group']}>
                    <label htmlFor='classification'>分類</label>
                    {!selectedClassifications && <MultiClassSelectSort setSelectedItems={setClassArray} />}
                    {selectedClassifications && <MultiClassSelectSort setSelectedItems={setClassArray} selectedItems={selectedClassifications} />}
                </div>
                <div className={styles['image-upload-container']}>

                    {/* <UploadImage styles={styles} /> */}
                    <div className={`${styles['upload-wrapper']}`}>
                        <div>
                            <label htmlFor='alt-text'>選取圖片</label>
                            <input
                                ref={imageAltTextRef}
                                type='text' name='alt-text'
                                id='detail-form-altText'
                                placeholder={'替代文字'}
                                className={cx(
                                    'image-group',
                                    css`
                            ::placeholder{
                                color: lightgray;
                            }
                                `
                                )}
                            />
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
                    {/* <UploadYoutube styles={styles} /> */}
                    <div className={`${styles['upload-wrapper']} `}>
                        <div>
                            <label htmlFor='film-url'>影片連結</label>
                            <input
                                type='text'
                                name='film-url'
                                id='detail-form-film-url'
                                placeholder={'影片連結'}
                                className={cx(
                                    'film-group',
                                    css`
                            ::placeholder{
                                color: lightgray;
                            }
                                `
                                )} />
                            {/* <input type='text' name='alt-text-2' placeholder={'替代文字'}
                        className={cx(
                            'film-group',
                            css`
                            ::placeholder{
                                color: lightgray;
                            }
                                `
                        )} /> */}
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
                    <PreviewMedia styles={styles} />
                </div>
                <div className={styles['input-group']}>
                    <label htmlFor='set-to-top'>將這篇文章「置頂」</label>
                    <input
                        type='checkbox'
                        name='set-to-top-checkbox'
                        id='detail-form-setTop'
                        className={styles['custom-switch']}
                    />
                </div>
                <div className={styles['input-group']}>
                    <label htmlFor='hide-switch'>將這篇文章「隱藏」</label>
                    <input
                        type='checkbox'
                        name='hide-switch-checkbox'
                        id='detail-form-hide'
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
