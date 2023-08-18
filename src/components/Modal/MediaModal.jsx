import React, { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Iframe from "react-iframe";
import CloseIcon from "../Icon/CloseIcon";
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
    width: "auto",
    height: "500px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}
const imageStyle = {
    width: 'auto',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
}

export default function MediaModal({ open, handleClose, mediaInfo }) {

    const onClose = useCallback((event, reason) => {
        if (reason === 'backdropClick') return
        handleClose()
    }, [handleClose])
    const [isImage, setIsImage] = useState(true);
    const [iframeUrl, setIframeUrl] = useState(undefined);

    const getProperty = useCallback((propertyName) => {
        const indexOf = mediaInfo.contentImagePath.indexOf(`${propertyName}="`) + `${propertyName}="`.length;
        const endIndexOf = mediaInfo.contentImagePath.indexOf(`"`, indexOf);
        const property = mediaInfo.contentImagePath.substr(indexOf, endIndexOf - indexOf);
        return property
    }, [mediaInfo])

    useEffect(() => {
        if (!mediaInfo) return
        if (mediaInfo.contentImagePath.indexOf('<iframe') !== -1) {
            const src = getProperty('src');
            setIsImage(false)
            setIframeUrl(src)
        } else {
            setIsImage(true)
            setIframeUrl(mediaInfo.contentImagePath)
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
                <CloseIcon
                    color="white"
                    onClose={onClose}
                    distance={-30} />
                {isImage ?
                    <div style={imageDivStyle}>
                        <img src={iframeUrl} style={imageStyle} />
                    </div>
                    :
                    <Iframe
                        url={iframeUrl}
                        loading='lazy'
                        width="888px"
                        height="500PX"
                        display="block"
                        position="relative"
                    />}
            </Box>
        </Modal >
    )
}
