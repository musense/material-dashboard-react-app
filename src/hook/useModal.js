import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useModal(data) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = useCallback(() => {
        setOpen(false)
        dispatch({
            type: "SET_ERROR_MESSAGE",
            payload: {
                message: '--reset-error-message',
            }
        })
    }, [setOpen, dispatch]);

    useEffect(() => {
        console.log("🚀 ~ file: useModal.js:10 ~ useEffect ~ data:", data)
        if (data) handleOpen()
    }, [data]);

    return { open, handleOpen, handleClose };
}
