import React, { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Iframe from "react-iframe";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    bgcolor: 'transparent',
    border: 'unset',
    boxShadow: 'unset',
    p: 0,
};

const imageDivStyle = {
    width: "768px",
    height: "384px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}
const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
}

export default function MediaModal({ open, handleClose, mediaInfo }) {

    const onClose = useCallback(() => {
        setIsImage(true)
        setIframeUrl(undefined)
        handleClose()
    }, [handleClose])
    const [isImage, setIsImage] = useState(true);
    const [iframeUrl, setIframeUrl] = useState(undefined);

    const getProperty = useCallback((propertyName) => {
        const indexOf = mediaInfo.banner.indexOf(`${propertyName}="`) + `${propertyName}="`.length;
        const endIndexOf = mediaInfo.banner.indexOf(`"`, indexOf);

        console.log("🚀 ~ file: MediaModal.jsx:32 ~ useEffect ~ indexOf:", indexOf);
        console.log("🚀 ~ file: MediaModal.jsx:32 ~ useEffect ~ endIndexOf:", endIndexOf);
        const property = mediaInfo.banner.substr(indexOf, endIndexOf - indexOf);
        console.log("🚀 ~ file: MediaModal.jsx:32 ~ useEffect ~ property:", property);
        return property
    }, [mediaInfo])

    // function getProperty(propertyName) {
    //     const indexOf = mediaInfo.banner.indexOf(`${propertyName}="`) + `${propertyName}="`.length;
    //     const endIndexOf = mediaInfo.banner.indexOf(`"`, indexOf);

    //     console.log("🚀 ~ file: MediaModal.jsx:32 ~ useEffect ~ indexOf:", indexOf);
    //     console.log("🚀 ~ file: MediaModal.jsx:32 ~ useEffect ~ endIndexOf:", endIndexOf);
    //     const property = mediaInfo.banner.substr(indexOf, endIndexOf - indexOf);
    //     console.log("🚀 ~ file: MediaModal.jsx:32 ~ useEffect ~ property:", property);
    //     return property
    // }
    useEffect(() => {
        if (!mediaInfo) return
        console.log("🚀 ~ file: MediaModal.jsx:32 ~ MediaModal ~ mediaInfo:", mediaInfo)
        if (mediaInfo.banner.indexOf('<iframe') !== -1) {
            const src = getProperty('src');
            console.log("🚀 ~ file: MediaModal.jsx:41 ~ useEffect ~ src:", src)
            setIsImage(false)
            setIframeUrl(src)
        } else {
            setIsImage(true)
            setIframeUrl(mediaInfo.banner)
        }

    }, [mediaInfo]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {isImage ?
                    <div style={imageDivStyle}>
                        <img src={iframeUrl} style={imageStyle} />
                    </div>
                    :
                    <Iframe
                        url={iframeUrl}
                        loading='lazy'
                        width="768px"
                        height="384px"
                        display="block"
                        position="relative"
                    />}
            </Box>
        </Modal>
    )
}
