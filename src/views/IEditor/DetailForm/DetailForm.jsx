import React, { useCallback, useEffect, useRef, useState } from "react";

import { fetchYoutubeInfo } from '../youtube';
import styles from '../IEditor.module.css';

import { useDispatch, useSelector } from "react-redux";
import * as GetSlateAction from 'actions/GetSlateAction';

import WebHeader from "./WebHeader";
import Tags from "./Tags";
import Classification from "./Classification";
import Media from "./Media";
import PublishInfo from "./PublishInfo";
import DetailFormButtonList from "./DetailFormButtonList";

import useIsImageOrVideo from "../../../hook/useIsImageOrVideo";
const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];

const DetailForm = () => {

    const dispatch = useDispatch();
    const detailForm = useSelector((state) => state.getSlateReducer.detailForm);

    const { webHeader, media, publishInfo, ...props } = detailForm;
    const {
        title,
        description,
        keywords,
        manualUrl,
        sitemapUrl: customUrl
    } = webHeader;

    const {
        tags,
        classifications
    } = props
    console.log("🚀 ~ file: DetailForm.jsx:37 ~ DetailForm ~ classifications:", classifications)
    console.log("🚀 ~ file: DetailForm.jsx:37 ~ DetailForm ~ tags:", tags)

    const {
        banner,
        thumbnail,
        altText
    } = media

    const {
        hidden,
        isScheduled,
        reservedPublishDateTime
    } = publishInfo
    const detailFormRef = useRef(null);

    const [isError, setIsError] = useState(false);

    const { isImage, iframeUrl } = useIsImageOrVideo(banner)

    const onPropertyChange = useCallback((value, property, info) => {
        dispatch({
            type: GetSlateAction.SET_PROPERTY,
            payload: {
                allProps: {
                    form: 'detailForm',
                    info: info,
                    property: property,
                    value: value
                }
            }
        })
    }, [dispatch])

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
                onPropertyChange(URL.createObjectURL(image), 'banner', 'media')
                onPropertyChange('', 'thumbnail', 'media')
            }
        },
        removeImage() {
            this.removeFilm()
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
            if (youtubeInfo) {
                onPropertyChange(youtubeInfo.html, 'banner', 'media')
                onPropertyChange(youtubeInfo.thumbnail_url, 'thumbnail', 'media')
            }
        },
        removeFilm() {
            onPropertyChange('', 'banner', 'media')
            onPropertyChange('', 'thumbnail', 'media')
        },
    }

    return (
        <form name='ieditor-detail-form' >
            <WebHeader title={title}
                onPropertyChange={onPropertyChange}
                description={description}
                keywords={keywords}
                manualUrl={manualUrl}
                customUrl={customUrl} />
            <Tags
                tags={tags}
                onPropertyChange={onPropertyChange} />
            <Classification
                classifications={classifications}
                onPropertyChange={onPropertyChange} />
            <Media
                styles={styles}
                onPropertyChange={onPropertyChange}
                isError={isError}
                altText={altText}
                mediaHelperFunc={mediaHelperFunc}
                isImage={isImage}
                iframeUrl={iframeUrl} />
            <PublishInfo
                styles={styles}
                hidden={hidden}
                onPropertyChange={onPropertyChange}
                isScheduled={isScheduled}
                reservedPublishDateTime={reservedPublishDateTime} />
            <DetailFormButtonList styles={styles} />
        </form >
    );
}

export default DetailForm;














