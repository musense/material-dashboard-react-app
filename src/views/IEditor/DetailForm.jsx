import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import CustomRadio from '../../components/CustomRadio/CustomRadio';


import { fetchYoutubeInfo } from './youtube';
import styles from './IEditor.module.css';
import { css, cx } from '@emotion/css';
import MultiTagSelectSort from '../../components/Select/MultiTagSelectSort';
import SingleClassificationSelect from "../../components/Select/SingleClassificationSelect";
import Iframe from "react-iframe";
import DateTimeSelector from "../../components/DateSelector/DateTimeSelector";
import { Stack } from "@mui/system";

const webHeaderID = [
    'title', 'description', 'keywords', 'customUrl'
]
const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];

const DetailForm = React.forwardRef(({
    editor, // defaultValue
    onEditorSave, // saveValue
}, ref) => {

    console.log("🚀 ~ file: DetailForm.jsx:441 ~ editor:", editor)
    const detailFormRef = useRef(null);
    const [preview, setPreview] = useState(false);
    const bannerRef = useRef();
    const thumbnailRef = useRef();
    const imageAltTextRef = useRef();
    const imageUrlRef = useRef(undefined);
    const imageNameRef = useRef(undefined);
    const customUrlRef = useRef(undefined);
    const tagArrayRef = useRef([]);
    const classRef = useRef(null);
    const [isImage, setIsImage] = useState(true);
    const [iframeUrl, setIframeUrl] = useState(undefined);
    const [manualUrl, setManualUrl] = useState(undefined);
    const [isError, setIsError] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [imageName, setImageName] = useState();
    const uploadImageRef = useRef(null);
    const hideSwitchRef = useRef();
    const isScheduledSwitchRef = useRef();
    const scheduledDateTimeRef = useRef(null);
    const [hideSwitch, setHideSwitch] = useState();
    const [scheduledSwitch, setScheduledSwitch] = useState();

    useMemo(() => {
        if (!editor) return
        tagArrayRef.current = editor.tags
        console.log("🚀 ~ file: index.jsx:178 ~ useMemo ~ tagArrayRef.current:", tagArrayRef.current)
        classRef.current = editor.classifications ? editor.classifications : null
    }, [editor])

    useEffect(() => {
        if (!editor) return
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
    }, [editor, bannerRef.current]);

    useImperativeHandle(ref, () => {
        return {
            getFormData: (editor) => {
                const form = detailFormRef.current;
                const formData = new FormData(form);
                const formDataObject = Object.fromEntries(formData)
                const tData = new Map()
                console.log("🚀 ~ file: DetailForm.jsx:74 ~ useEffect ~ hideSwitchRef:", hideSwitchRef)
                console.log("🚀 ~ file: DetailForm.jsx:74 ~ useEffect ~ hideSwitchRef.current.checkHistory():", hideSwitchRef.current.checkHistory())
                console.log("🚀 ~ file: DetailForm.jsx:74 ~ useEffect ~ hideSwitchRef.current.current():", hideSwitchRef.current.current())
                // console.log("🚀 ~ file: DetailForm.jsx:144 ~ useImperativeHandle ~ dateTimeRef.current.current():", scheduledDateTimeRef.current.current())
                // return
                if (editor) {
                    const webHeader = new Map()
                    formDataObject.title !== editor.webHeader.title && (webHeader.set('title', formDataObject.title));
                    formDataObject.description !== editor.webHeader.description && (webHeader.set('description', formDataObject.description))
                    formDataObject.keywords !== editor.webHeader.keywords && (webHeader.set('keywords', formDataObject.keywords))
                    formDataObject.manualUrl !== '' && (webHeader.set('manualUrl', formDataObject.manualUrl))
                    webHeader.size !== 0 && tData.set('webHeader', webHeader)
                    console.log("🚀 ~ file: index.jsx:145 ~ onEditorSave ~ webHeader:", webHeader)

                    const media = new Map()
                    thumbnailRef.current && bannerRef.current !== editor.media.banner && (media.set('banner', bannerRef.current))
                    thumbnailRef.current && thumbnailRef.current !== editor.media.thumbnail && (media.set('thumbnail', thumbnailRef.current))
                    console.log("🚀 ~ file: index.jsx:150 ~ onEditorSave ~ editor.media.thumbnail:", editor.media.thumbnail)
                    imageAltTextRef.current.value !== editor.media.altText && (media.set('altText', imageAltTextRef.current.value))
                    media.size !== 0 && tData.set('media', media)
                    console.log("🚀 ~ file: index.jsx:152 ~ onEditorSave ~ media:", media)

                    !!formDataObject.hideSwitch !== editor.hide && (tData.set('hide', !!formDataObject.hideSwitch))

                    JSON.stringify(tagArrayRef.current) !== JSON.stringify(editor.tags) && (tData.set('tags', tagArrayRef.current))

                    JSON.stringify(classRef.current) !== JSON.stringify(editor.classifications) && (tData.set('classifications', classRef.current ? [classRef.current] : null))
                    // scheduledDateTimeRef.current &&
                    scheduledDateTimeRef.current && tData.set('scheduleTime', scheduledDateTimeRef.current.current())

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

                    hideSwitchRef.current.checkHistory().length > 1 && tData.set('hide', hideSwitchRef.current.current())
                    // isScheduledSwitchRef.current.checkHistory.length > 0 && tData.set('hide', !!formDataObject.isScheduledSwitchRef)
                    // console.log("🚀 ~ file: DetailForm.jsx:52 ~ useImperativeHandle ~ hideSwitchRef.current.checkHistory:", hideSwitchRef.current.checkHistory)

                    tagArrayRef.current.length > 0 && tData.set('tags', tagArrayRef.current)

                    classRef.current && tData.set('classifications', classRef.current ? [classRef.current] : null)
                    scheduledDateTimeRef.current && tData.set('scheduleTime', scheduledDateTimeRef.current.current())

                }          
                return tData
            }

        }
    })

    function setDefaultValueById(id, obj) {
        const item = document.getElementById(`detail-form-${id}`)
        if (!item) return
        switch (item.type) {
            case 'checkbox': {
                item.checked = obj
                break;
            }
            case 'text':
            default: {
                item.value = obj[id]
                break;
            }
        }
    }

    console.log("🚀 ~ file: DetailForm.jsx:55 ~ setDetailDefaultValue ~ bannerRef.current:", bannerRef.current)
    console.log("🚀 ~ file: DetailForm.jsx:55 ~ setDetailDefaultValue ~ imageUrlRef.current:", imageUrlRef.current)
    //*  set default value for DetailForm
    function setDetailDefaultValue(editor) {
        if (!editor) return
        const { webHeader, media, hide } = editor

        webHeaderID.map(id => setDefaultValueById(id, webHeader))
        customUrlRef.current = webHeader.customUrl

        if (media && media.altText) {
            setDefaultValueById('altText', media)
        }

        if (media && media.banner) {
            imageUrlRef.current = media.banner
            bannerRef.current = media.banner
            // * 圖片才要取檔名
            if (media.banner.indexOf('<iframe') === -1) {
                if (imageNameRef && imageNameRef.current) {
                    imageNameRef.current = media.banner.substring(media.banner.lastIndexOf('/') + 1)
                }
            }
        }

        setDefaultValueById('hide', hide)
        // console.log("🚀 ~ file: index.jsx:108 ~ setDetailDefaultValue ~ hide:", hide)
    }
    setDetailDefaultValue(editor)

    const getProperty = useCallback((propertyName) => {
        const indexOf = bannerRef.current.indexOf(`${propertyName}="`) + `${propertyName}="`.length;
        const endIndexOf = bannerRef.current.indexOf(`"`, indexOf);
        const property = bannerRef.current.substr(indexOf, endIndexOf - indexOf);
        return property
    }, [bannerRef])

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

    const displayScheduleTime = (scheduledSwitch) => ({
        display: scheduledSwitch ? 'block' : 'none'
    })
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
                            value={`p_${manualUrl}.html`}
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
                    <Stack direction={"column"} spacing={2}>
                        <CustomRadio
                            ref={hideSwitchRef}
                            defaultValue={editor && editor.hide}
                            label={'將這篇文章「隱藏」'}
                            name={'hideSwitch'}
                            setState={setHideSwitch}
                        />
                        {hideSwitch && <CustomRadio
                            defaultValue={editor && editor.isScheduled}
                            label={'是否排程上版'}
                            name={'scheduledSwitch'}
                            setState={setScheduledSwitch}
                        />}
                    </Stack>
                </div>
                <div >
                    {hideSwitch && scheduledSwitch && <div className={styles['input-group']}>
                        <DateTimeSelector
                            defaultValue={editor && editor.scheduleTime}
                            width={'250px'}
                            title={'排程日期'}
                            ref={scheduledDateTimeRef} />
                    </div>}
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