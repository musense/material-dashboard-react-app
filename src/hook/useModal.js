import { useEffect, useState } from "react";

export default function useModal(data) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        console.log("🚀 ~ file: useModal.js:10 ~ useEffect ~ data:", data)
        if (data) handleOpen()
    }, [data]);
    
    return { open, handleOpen, handleClose };
}
