import { useCallback, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';

export default function useEditorModal(data) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = useCallback(() => {
    setOpen(false)
    dispatch({
      type: "SET_ERROR_MESSAGE",
      payload: {
        errorMessage: '--reset-error-message',
      }
    })
  }, [dispatch, setOpen])

  useEffect(() => {
    if (data) handleOpen()
  }, [data]);

  return { open, handleOpen, handleClose };
}
