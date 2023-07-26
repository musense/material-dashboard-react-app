import React, { useCallback } from "react";
import ImageSelector from "./ImageSelector";
import VideoSelector from "./VideoSelector";
import PreviewMedia from "./PreviewMedia";

export default function Media({
    styles,
    onPropertyChange,
    isError,
    altText,
    mediaHelperFunc,
    isImage,
    iframeUrl
}) {
    const onRemoveClick = useCallback(() => {
        onPropertyChange('', 'banner', 'media')
        onPropertyChange('', 'thumbnail', 'media')
    }, [onPropertyChange])
    const onMediaAltTextChange = useCallback((value) => {
        onPropertyChange(value, 'altText', 'media')
    }, [onPropertyChange])
    return <section id="media">
        <div className={styles['image-upload-container']}>
            <ImageSelector
                styles={styles}
                onRemoveClick={onRemoveClick}
                onMediaAltTextChange={onMediaAltTextChange}
                isError={isError}
                altText={altText}
                mediaHelperFunc={mediaHelperFunc}
            />
            <VideoSelector styles={styles} onRemoveClick={onRemoveClick} mediaHelperFunc={mediaHelperFunc} />
            <PreviewMedia styles={styles} isImage={isImage} iframeUrl={iframeUrl} />
        </div>
    </section>;
}