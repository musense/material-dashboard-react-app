import { useCallback, useEffect, useState } from "react";

export default function useUploadImage(imageUploadRef, onImageChange = null) {

    const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];

    const [isError, setIsError] = useState(false);
    const [imageContent, setImageContent] = useState();
    const [imageUrl, setImageUrl] = useState();

    const fileReader = useCallback((e) => {
        const imageUpload = e.target
        const selectedFile = imageUpload.files[0];
        const allAllowed = allowedFileTypes.includes(selectedFile.type)
        if (!allAllowed) {
            setIsError(true)
            return
        }
        setIsError(false)
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
            const imageContent = event.target.result;
            const imageUrl = URL.createObjectURL(selectedFile);
            if (!onImageChange) {
                setImageContent(imageContent)
                setImageUrl(imageUrl)
                return
            }
            onImageChange({
                imageContent: imageContent,
                imageUrl: imageUrl
            })
        };

        fileReader.readAsDataURL(selectedFile); // Reads the file content as a data URL

    }, [onImageChange])
    useEffect(() => {
        if (imageUploadRef.current === null) {
            return
        } else {
            const imageUpload = imageUploadRef.current
            imageUpload.addEventListener('change', fileReader)
        }
        const myImageUpload = imageUploadRef.current
        return () => {
            myImageUpload.removeEventListener('change', fileReader)
        }
    }, [imageUploadRef]);

    return { isError, imageContent, imageUrl }

}
