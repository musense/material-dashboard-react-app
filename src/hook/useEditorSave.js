import React from "react";

export default function useEditorSave(message, submitState, isPreview, id = null) {

    useEffect(() => {
        if (message !== 'check__OK!') return
        if (!isPreview) {
            onEditorSave(submitState)
            return
        }
        onPreviewSave(submitState)
    }, [message, submitState, isPreview]);

    return <div>useEditorSave</div>;
}
