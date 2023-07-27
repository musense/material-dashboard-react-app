import React, { useCallback, useState } from "react";

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

const DetailForm = ({ onEditorSave }) => {

    const dispatch = useDispatch();
    const detailForm = useSelector((state) => state.getSlateReducer.detailForm);

    const { webHeader, media, publishInfo, ...props } = detailForm;
    const {
        headTitle,
        headDescription,
        headKeyword,
        manualUrl,
        sitemapUrl: customUrl
    } = webHeader;

    const {
        tags,
        categories
    } = props
    console.log("🚀 ~ file: DetailForm.jsx:37 ~ DetailForm ~ categories:", categories)
    console.log("🚀 ~ file: DetailForm.jsx:37 ~ DetailForm ~ tags:", tags)

    const {
        contentImagePath,
        homeImagePath,
        altText
    } = media

    const {
        hide,
        isScheduled,
        scheduledAt
    } = publishInfo

    const [isError, setIsError] = useState(false);

    const { isImage, iframeUrl } = useIsImageOrVideo(contentImagePath)

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
                onPropertyChange(URL.createObjectURL(image), 'contentImagePath', 'media')
                onPropertyChange('', 'homeImagePath', 'media')
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
                onPropertyChange(youtubeInfo.html, 'contentImagePath', 'media')
                onPropertyChange(youtubeInfo.thumbnail_url, 'homeImagePath', 'media')
            }
        },
        removeFilm() {
            onPropertyChange('', 'contentImagePath', 'media')
            onPropertyChange('', 'homeImagePath', 'media')
        },
    }

    return (
        <form name='ieditor-detail-form' >
            <WebHeader headTitle={headTitle}
                onPropertyChange={onPropertyChange}
                headDescription={headDescription}
                headKeyword={headKeyword}
                manualUrl={manualUrl}
                customUrl={customUrl} />
            <Tags
                tags={tags}
                onPropertyChange={onPropertyChange} />
            <Classification
                categories={categories}
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
                hide={hide}
                onPropertyChange={onPropertyChange}
                isScheduled={isScheduled}
                scheduledAt={scheduledAt} />
            <DetailFormButtonList
                styles={styles}
                onEditorSave={onEditorSave}
            />
        </form >
    );
}

export default DetailForm;














