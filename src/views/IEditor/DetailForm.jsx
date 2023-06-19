import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import CustomRadio from '../../components/CustomRadio/CustomRadio';


import { fetchYoutubeInfo } from './youtube';
import styles from './IEditor.module.css';
import { css, cx } from '@emotion/css';
import MultiTagSelectSort from '../../components/Select/MultiTagSelectSort';
import SingleClassificationSelect from "../../components/Select/SingleClassificationSelect";
import Iframe from "react-iframe";

const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];

const DetailForm = React.forwardRef(({    
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
    setPreview,
}, ref) => {


    useImperativeHandle(ref, () => {
        return {
            getFormData: (editor) => {
                const form = detailFormRef.current;
                const formData = new FormData(form);
                const formDataObject = Object.fromEntries(formData)
                const tData = new Map()

                if (editor) {
                    const webHeader = new Map()
                    formDataObject.title !== editor.webHeader.title && (webHeader.set('title', formDataObject.title));
                    formDataObject.description !== editor.webHeader.description && (webHeader.set('description', formDataObject.description))
                    formDataObject.keywords !== editor.webHeader.keywords && (webHeader.set('keywords', formDataObject.keywords))
                    formDataObject.manualUrl.length > 0 && (webHeader.set('manualUrl', formDataObject.manualUrl))
                    webHeader.size !== 0 && tData.set('webHeader', webHeader)
                    console.log("🚀 ~ file: index.jsx:145 ~ onEditorSave ~ webHeader:", webHeader)

                    const media = new Map()
                    bannerRef.current !== editor.media.banner && (media.set('banner', bannerRef.current))
                    thumbnailRef.current && thumbnailRef.current !== editor.media.thumbnail && (media.set('thumbnail', thumbnailRef.current))
                    console.log("🚀 ~ file: index.jsx:150 ~ onEditorSave ~ editor.media.thumbnail:", editor.media.thumbnail)
                    imageAltTextRef.current.value !== editor.media.altText && (media.set('altText', imageAltTextRef.current.value))
                    media.size !== 0 && tData.set('media', media)
                    console.log("🚀 ~ file: index.jsx:152 ~ onEditorSave ~ media:", media)

                    !!formDataObject.hideSwitch !== editor.hide && (tData.set('hide', !!formDataObject.hideSwitch))

                    JSON.stringify(tagArrayRef.current) !== JSON.stringify(editor.tags) && (tData.set('tags', tagArrayRef.current))

                    JSON.stringify(classRef.current) !== JSON.stringify(editor.classifications) && (tData.set('classifications', classRef.current ? [classRef.current] : null))
                } else {
                    const webHeader = new Map()
                    formDataObject.title !== '' && webHeader.set('title', formDataObject.title)
                    formDataObject.description !== '' && webHeader.set('description', formDataObject.description)
                    formDataObject.keywords !== '' && webHeader.set('keywords', formDataObject.keywords)
                    formDataObject.manualUrl !== '' && formDataObject.manualUrl.length > 0 && webHeader.set('manualUrl', formDataObject.manualUrl)
                    webHeader.size !== 0 && tData.set('webHeader', webHeader)

                    const media = new Map()
                    bannerRef.current && media.set('banner', bannerRef.current)
                    thumbnailRef.current && media.set('thumbnail', thumbnailRef.current)
                    imageAltTextRef.current.value !== '' && media.set('altText', imageAltTextRef.current.value)
                    media.size !== 0 && tData.set('media', media)

                    hideSwitchRef.current.checkHistory.length > 0 && tData.set('hide', !!formDataObject.hideSwitch)
                    console.log("🚀 ~ file: DetailForm.jsx:52 ~ useImperativeHandle ~ hideSwitchRef.current.checkHistory:", hideSwitchRef.current.checkHistory)

                    tagArrayRef.current.length > 0 && tData.set('tags', tagArrayRef.current)

                    classRef.current && tData.set('classifications', classRef.current ? [classRef.current] : null)

                }
                return tData
            }
        }
    })
    const detailFormRef = useRef(null);
    console.log("🚀 ~ file: DetailForm.jsx:30 ~ formRef:", ref)
    console.log("🚀 ~ file: DetailForm.jsx:27 ~ tagArrayRef:", tagArrayRef)
    console.log("🚀 ~ file: DetailForm.jsx:29 ~ customUrlRef:", customUrlRef)
    const [formData, setFormData] = useState(null);
    const [isImage, setIsImage] = useState(true);
    const [iframeUrl, setIframeUrl] = useState(undefined);
    const getProperty = useCallback((propertyName) => {
        const indexOf = bannerRef.current.indexOf(`${propertyName}="`) + `${propertyName}="`.length;
        const endIndexOf = bannerRef.current.indexOf(`"`, indexOf);

        console.log("🚀 ~ file: MediaModal.jsx:32 ~ useEffect ~ indexOf:", indexOf);
        console.log("🚀 ~ file: MediaModal.jsx:32 ~ useEffect ~ endIndexOf:", endIndexOf);
        const property = bannerRef.current.substr(indexOf, endIndexOf - indexOf);
        console.log("🚀 ~ file: MediaModal.jsx:32 ~ useEffect ~ property:", property);
        return property
    }, [bannerRef])

    const [manualUrl, setManualUrl] = useState(undefined);
    const [isError, setIsError] = useState(false);

    const [imageUrl, setImageUrl] = useState();
    const [imageName, setImageName] = useState();
    const uploadImageRef = React.useRef(null);
    const hideSwitchRef = React.useRef();

    useEffect(() => {
        if (!bannerRef.current || typeof bannerRef.current !== 'string') return
        if (bannerRef.current.indexOf('<iframe') !== -1) {
            const src = getProperty('src');
            console.log("🚀 ~ file: MediaModal.jsx:41 ~ useEffect ~ src:", src)
            setIsImage(false)
            setIframeUrl(src)
        } else {
            setIsImage(true)
            setIframeUrl(bannerRef.current)
        }
    }, [bannerRef.current]);

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
                }>
                {
                    isImage
                        ? <img src={iframeUrl} style={{ width: '100%' }} />
                        : <Iframe
                            url={iframeUrl}
                            loading='lazy'
                            width="100%"
                            height="100%"
                            display="block"
                            position="relative"
                        />
                }
            </div>


        );
    }

    return (
        <>
            <form ref={detailFormRef} name='ieditor-detail-form' onSubmit={onEditorSave}>

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
                    <MultiTagSelectSort
                        creatable
                        tagArrayRef={tagArrayRef}
                    />
                </div>
                <div className={styles['input-group']}>
                    <label htmlFor='classification'>分類</label>
                    <SingleClassificationSelect
                        classRef={classRef}
                    />
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

})

export default DetailForm;