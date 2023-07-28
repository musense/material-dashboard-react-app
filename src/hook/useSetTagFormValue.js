import React, { useEffect, useState } from "react";

export default function useSetTagFormValue(tag, formRef) {

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [keywords, setKeywords] = useState();
    const [manualUrl, setManualUrl] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const [isPopularTag, setIsPopularTag] = useState();
    const [sorting, setSorting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);




    function setEditingValue(tag, form) {
        console.log("🚀 ~ file: TagLeftWrapper.jsx:74 ~ setEditingValue ~ tag:", tag)
        if (tag && tag._id !== '') {
            setIsEditing(true)
        }
        setId(tag._id)
        setName(tag.tagName)
        setTitle(tag.title)
        setDescription(tag.description)
        setKeywords(tag.keywords)
        setManualUrl(tag.manualUrl)
        setCustomUrl(tag.customUrl)
        setIsPopularTag(tag.isPopularTag)
        setSorting(tag.sorting)
        setIsEditing(tag.isEditing)
    }

    useEffect(() => {
        if (!formRef.current) return
        if (!tag) return


        setEditingValue(tag, formRef.current)

        return () => {
            setIsEditing(false)
            setManualUrl('')
            setCustomUrl('')
            // setPopularTag(false)
        }
    }, [tag, formRef]);


    return {
        id,
        name,
        title,
        description,
        keywords,
        manualUrl,
        customUrl,
        isPopularTag,
        sorting,
        isEditing,
    }
}
