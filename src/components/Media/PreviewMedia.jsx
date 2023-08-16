import React from "react";
import Iframe from "react-iframe";

export default function PreviewMedia({ styles, isImage, iframeUrl }) {
    return (
        <div className={styles['preview-image-wrapper']}>
            {
                isImage
                    ? (iframeUrl !== '' && <img src={iframeUrl}
                        style={{
                            width: 'auto',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            aspectRatio: '16/9',
                        }}
                    />)
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