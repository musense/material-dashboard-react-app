import { useEffect, useState } from "react";

export default function useSetEditorClassValue(editorClass) {

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [keyName, setKeyName] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [keywords, setKeywords] = useState();
    const [manualUrl, setManualUrl] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    function setEditorClassValue(editorClass) {
        console.log("🚀 ~ file: setEditorClassValue.jsx:74 ~ setEditingValue ~ editorClass:", editorClass)

        setId(editorClass._id)
        setName(editorClass.name)
        setKeyName(editorClass.keyName)
        setTitle(editorClass.title)
        setDescription(editorClass.description)
        setKeywords(editorClass.keywords)
        setManualUrl(editorClass.manualUrl)
        setCustomUrl(editorClass.customUrl)
        setIsEditing(editorClass.isEditing)
    }

    useEffect(() => {
        if (!editorClass) return
        setEditorClassValue(editorClass)
    }, [editorClass])


    return {
        id,
        name,
        keyName,
        title,
        description,
        keywords,
        manualUrl,
        customUrl,
        isEditing,
    }
}
