import { useEffect } from "react";
import { useDispatch } from 'react-redux';

export default function usePreview(previewID, isPreview) {
    const previewURL = process.env.REACT_APP_PREVIEW_URL
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isPreview) return
        if (!previewID) return
        window.open(`${previewURL}/preview/${previewID}`, '_blank')
        dispatch({ type: "PREVIEW_FINISHED" })
    }, [isPreview, previewID, previewURL]);
}
