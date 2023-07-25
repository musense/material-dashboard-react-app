import React, { useEffect ,useState} from "react";

export default function useSetEditorClassValue(selectedEditorClass, formRef) {
    const [isEditing, setIsEditing] = useState(false);
    const [manualUrl, setManualUrl] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const [popularTag, setPopularTag] = useState(false);

    function setEditorClassValue(editorClass, form) {
        console.log("🚀 ~ file: TagLeftWrapper.jsx:74 ~ setEditingValue ~ tag:", editorClass)
        if (editorClass && editorClass._id !== '') {
            setIsEditing(true)
        }
        form.reset()
        setManualUrl('')
        setCustomUrl('')

        form._id.value = editorClass._id
        form.classification.value = editorClass.name
        form.keyname.value = editorClass.keyName
        form.title.value = editorClass.title
        form.description.value = editorClass.description
        form.keywords.value = editorClass.keywords

        setManualUrl(editorClass.manualUrl)
        setCustomUrl(editorClass.customUrl)
    }

    useEffect(() => {
        if (!formRef.current) return
        if (!selectedEditorClass) return

        setEditorClassValue(selectedEditorClass, formRef.current)

        return () => {
            setIsEditing(false)
            setManualUrl('')
            setCustomUrl('')
            setPopularTag(false)
        }
    }, [selectedEditorClass])


    return {
        customUrl,
        setCustomUrl,
        manualUrl,
        setManualUrl,
        popularTag,
        setPopularTag,
        isEditing,
        setIsEditing
    }
}
