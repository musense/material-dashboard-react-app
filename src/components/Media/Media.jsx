import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import ImageSelector from "./ImageSelector";
import VideoSelector from "./VideoSelector";
import PreviewMedia from "./PreviewMedia";
import useIsImageOrVideo from "hook/useIsImageOrVideo";

export default function Media({
    styles,
    onPropertyChange,
    patchType,
    showUrl,
    altText,
}) {
    const dispatch = useDispatch();
 
    const { isImage, iframeUrl } = useIsImageOrVideo(showUrl)

    const onShowUrlChange = useCallback((value) => {
        dispatch({
            type: patchType,
            payload: {
                showUrl: value
            }
        })
    }, [dispatch])

    const onRemoveClick = useCallback(() => { 
        onShowUrlChange('')
        onPropertyChange('', 'contentImagePath', 'media')
        onPropertyChange('', 'homeImagePath', 'media')
    }, [onPropertyChange, onShowUrlChange])

    const onMediaAltTextChange = useCallback((value) => {
        onPropertyChange(value, 'altText', 'media')
    }, [onPropertyChange])

    const onImageChange = useCallback(({ imageContent, imageUrl }) => {
        onShowUrlChange(imageUrl)
        onPropertyChange(imageContent, 'contentImagePath', 'media')
        onPropertyChange('', 'homeImagePath', 'media')
    }, [onPropertyChange, onShowUrlChange])

    const onVideoChange = useCallback(({ iframeUrl, imageUrl }) => {
        onShowUrlChange(iframeUrl)
        onPropertyChange(iframeUrl, 'contentImagePath', 'media')
        onPropertyChange(imageUrl, 'homeImagePath', 'media')
    }, [onPropertyChange])

    return <section id="media">
        <div className={styles['image-upload-container']}>
            <ImageSelector
                styles={styles}
                altText={altText}
                onRemoveClick={onRemoveClick}
                onImageChange={onImageChange}
                onMediaAltTextChange={onMediaAltTextChange}
            />
            <VideoSelector
                styles={styles}
                onRemoveClick={onRemoveClick}
                onVideoChange={onVideoChange}
            />
            <PreviewMedia
                styles={styles}
                isImage={isImage}
                iframeUrl={iframeUrl}
            />
        </div>
    </section>;
}