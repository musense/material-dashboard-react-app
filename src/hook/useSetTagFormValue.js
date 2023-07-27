import React, { useEffect ,useState} from "react";

export default function useSetTagFormValue(tag, formRef) {

    const [isEditing, setIsEditing] = useState(false);
    const [manualUrl, setManualUrl] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const [popularTag, setPopularTag] = useState(false);

    function setEditingValue(tag, form) {
        console.log("🚀 ~ file: TagLeftWrapper.jsx:74 ~ setEditingValue ~ tag:", tag)
        if (tag && tag._id !== '') {
            setIsEditing(true)
        }
        form.reset()
        setManualUrl('')
        setCustomUrl('')

        form._id.value = tag._id
        form.name.value = tag.name
        form.title.value = tag.webHeader.headTitle
        form.description.value = tag.webHeader.description
        form.keywords.value = tag.webHeader.keywords
        setCustomUrl(tag.webHeader.customUrl)
        if (tag.sorting) {
            setPopularTag(true)
            form.sorting.value = tag.sorting
        }
    }

    useEffect(() => {
        if (!formRef.current) return
        if (!tag) return


        setEditingValue(tag, formRef.current)

        return () => {
            setIsEditing(false)
            setManualUrl('')
            setCustomUrl('')
            setPopularTag(false)
        }
    }, [tag, formRef]);


    return { 
        customUrl, 
        setCustomUrl,
        manualUrl, 
        setManualUrl,
        popularTag, 
        setPopularTag,
        isEditing ,
        setIsEditing
    }
}
