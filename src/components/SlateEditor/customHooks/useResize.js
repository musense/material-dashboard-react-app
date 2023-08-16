import { useState, useCallback } from 'react';

const useResize = () => {
    const [size, setSize] = useState({ width: 50, height: 50 });
    const [resizing, setResizing] = useState(false);

    const preventDrag = useCallback((e) => {
        e.preventDefault();
    }, [resizing]);

    const onMouseDown = useCallback(() => {
        document.addEventListener("dragstart", preventDrag);
        // document.querySelector("[data-slate-editor]>table").classList.add('resizing');
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        setResizing(true);
    }, [setResizing, onMouseMove, onMouseUp])
    const onMouseUp = useCallback(() => {
        // document.querySelector("[data-slate-editor]>table").classList.remove('resizing');
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("dragstart", preventDrag);
        setResizing(false);
    }, [setResizing, onMouseMove, onMouseUp])
    const onMouseMove = useCallback((e) => {
        setSize(currentSize => ({
            width: currentSize.width + e.movementX,
            height: currentSize.height + e.movementY
        }));
    }, [setSize])

    return [size, onMouseDown, resizing];
}


export default useResize;