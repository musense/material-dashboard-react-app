import { useEffect } from "react";

export default function usePreview(previewID, isPreview) {
    const previewURL = process.env.REACT_APP_PREVIEW_URL

    useEffect(() => {
        if (!isPreview) return
        if (!previewID) return
        window.open(`${previewURL}/preview/${previewID}`, '_blank')
    }, [isPreview, previewID, previewURL]);
}
