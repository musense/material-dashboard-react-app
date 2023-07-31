import { useEffect, useState } from "react";

export default function useSetTagFormValue(tag) {

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [keywords, setKeywords] = useState();
    const [manualUrl, setManualUrl] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const [isPopularTag, setIsPopularTag] = useState(false);
    const [sorting, setSorting] = useState(0);
    const [isEditing, setIsEditing] = useState(false);


    function setEditingValue(tag) {
        console.log("🚀 ~ file: setEditingValue.jsx:74 ~ setEditingValue ~ tag:", tag)
      
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
        if (!tag) return
        setEditingValue(tag)
    }, [tag]);


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
