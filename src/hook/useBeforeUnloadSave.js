import React, { useCallback, useEffect } from "react";

export default function useBeforeUnloadSave(onEditorSave) {

  const handleBeforeUnload = useCallback((event) => {
    event.preventDefault();
    // onEditorSave()
    event.returnValue = 'beforeunload Hola!';
  }, [onEditorSave]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

}
