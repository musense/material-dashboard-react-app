import { useCallback, useEffect, useState } from "react";

export default function useIsImageOrVideo(url) {

    const [isImage, setIsImage] = useState(true);
    const [iframeUrl, setIframeUrl] = useState();

    const getProperty = useCallback((propertyName) => {
        const indexOf = url.indexOf(`${propertyName}="`) + `${propertyName}="`.length;
        const endIndexOf = url.indexOf(`"`, indexOf);
        const property = url.substr(indexOf, endIndexOf - indexOf);
        return property
    }, [url])

    useEffect(() => {
        if (!url || typeof url !== 'string') {
            setIsImage(true)
            setIframeUrl('')
            return
        }
        if (url.indexOf('<iframe') !== -1) {
            const src = getProperty('src');
            setIsImage(false)
            setIframeUrl(src)
        } else {
            setIsImage(true)
            setIframeUrl(url)
        }
    }, [url]);

    return { isImage, iframeUrl };
}
