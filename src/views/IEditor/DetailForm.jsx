import React, { useEffect, useState } from "react";
import CustomRadio from '../../components/CustomRadio/CustomRadio';


import { fetchYoutubeInfo } from './youtube';
import styles from './IEditor.module.css';
import { css, cx } from '@emotion/css';
import MultiTagSelectSort from '../../components/Select/Multi/MultiTagSelectSort';
import SingleClassificationSelect from "../../components/Select/Single/SingleClassificationSelect";


const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];

export default function DetailForm({
    bannerRef,
    thumbnailRef,
    imageAltTextRef,
    imageUrlRef,
    imageNameRef,
    customUrlRef,
    manualUrlRef,
    tagArrayRef,
    classRef,
    onEditorSave,
    // onPreviewButtonClick,

    setPreview,
}) {
    console.log("🚀 ~ file: DetailForm.jsx:29 ~ customUrlRef:", customUrlRef)

    const [manualUrl, setManualUrl] = useState(undefined);
    const [isError, setIsError] = useState(false);

    const [imageUrl, setImageUrl] = useState();
    const [imageName, setImageName] = useState();
    const uploadImageRef = React.useRef(null);
    const hideSwitchRef = React.useRef();

    useEffect(() => {
        if (!bannerRef.current || typeof bannerRef.current !== 'string') return
        if (bannerRef.current.indexOf('<iframe') !== -1) {
            const imageWrapper = document.getElementById('preview-image-wrapper');
            imageWrapper.innerHTML = bannerRef.current;
        }
    }, [bannerRef.current, uploadImageRef]);

    useEffect(() => {
        hideSwitchRef.current.id = 'detail-form-hide'

    }, [hideSwitchRef.current]);
    const mediaHelperFunc = {
        previewImage(e) {
            this.removeFilm();
            const image = e.target.files[0];
            const allAllowed = allowedFileTypes.includes(image.type)
            if (!allAllowed) {
                setIsError(true)
                return
            }
            setIsError(false)
            if (image) {
                setImageName(image.name)
                setImageUrl(URL.createObjectURL(image))

                bannerRef.current = image;
                // bannerRef.current = URL.createObjectURL(image);
                thumbnailRef.current = null;
            }
        },
        removeImage() {
            setImageName('')
            setImageUrl('')
            bannerRef.current = undefined
            thumbnailRef.current = undefined
            imageUrlRef.current = undefined
            imageNameRef.current = undefined
        },
        async previewFilm() {
            this.removeImage();

            const filmUrl = document.getElementsByName('filmUrl')[0].value;

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
                // bannerRef.current = filmUrl;
                thumbnailRef.current = youtubeInfo.thumbnail_url;
            }
        },
        removeFilm() {
            document.getElementsByName('filmUrl')[0].value = null;
            const imageWrapper = document.getElementById('preview-image-wrapper');
            imageWrapper.innerHTML = null;
        },
    }

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
                    <label htmlFor='manualUrl'>自訂網址</label>
                    <input
                        ref={manualUrlRef}
                        type='text'
                        name='manualUrl'
                        onChange={e => setManualUrl(e.target.value)}
                    />
                </div>
                <div className={styles['input-group']}>
                    <label htmlFor='real-url'>前台顯示網址</label>
                    {manualUrl && manualUrl.length > 0
                        ? < input
                            type='text'
                            name='real-url'
                            value={manualUrl}
                            readOnly
                            disabled
                        />
                        : <div><a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={customUrlRef.current}
                        >{customUrlRef.current}</a></div>
                    }

                </div>
                <div className={styles['input-group']}>
                    <label htmlFor='tags'>新增標籤</label>
                    <MultiTagSelectSort tagArrayRef={tagArrayRef} />
                </div>
                <div className={styles['input-group']}>
                    <label htmlFor='classification'>分類</label>
                    <SingleClassificationSelect classRef={classRef} />
                </div>
                <div className={styles['image-upload-container']}>

                    {/* <UploadImage styles={styles} /> */}
                    <div className={`${styles['upload-wrapper']}`}>
                        <div>
                            <label htmlFor='altText'>選取圖片</label>
                            <span className={
                                isError
                                    ? css`
                                    display:block;
                                    color: red;
                                    font-size: 12px;
                                    `
                                    : css`display:none`
                            }>請選取圖片!!! (jpeg, png, gif)</span>
                            <input
                                ref={imageAltTextRef}
                                type='text' name='altText'
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
                            <label htmlFor='uploadImage'>
                                上傳圖片
                                <input
                                    ref={uploadImageRef}
                                    id='uploadImage'
                                    type='file'
                                    name='uploadImage'
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
                            <label htmlFor='filmUrl'>影片連結</label>
                            <input
                                type='text'
                                name='filmUrl'
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
                    <CustomRadio
                        ref={hideSwitchRef}
                        label={'將這篇文章「隱藏」'}
                        name={'hideSwitch'}
                    />
                </div>
                <div className={styles['button-wrapper']}>
                    <input type='submit' onClick={() => setPreview(false)} value='確認' />
                    <input type='submit' onClick={() => setPreview(true)} value='預覽' />
                </div>
            </form >
        </>
    );

}