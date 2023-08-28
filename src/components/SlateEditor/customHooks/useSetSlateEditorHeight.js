import { useEffect, useRef } from "react";

export default function useSetSlateEditorHeight(toolbarRef, myScrollbarRef) {
    console.log("$$$ ~ file: useSetSlateEditorHeight.js:4 ~ useSetSlateEditorHeight ~ myScrollbarRef:", myScrollbarRef)
    console.log("$$$ ~ file: useSetSlateEditorHeight.js:4 ~ useSetSlateEditorHeight ~ toolbarRef:", toolbarRef)
    const effectRan = useRef(false);
    let toolbar, myScrollbar

    const onResize = () => {
        console.log('$$$ onResize');

        if (!toolbar) toolbar = toolbarRef.current
        if (!myScrollbar) myScrollbar = myScrollbarRef.current
        console.log("$$$ ~ file: useSetSlateEditorHeight.js:15 ~ onResize ~ toolbar:", toolbar)
        console.log("$$$ ~ file: useSetSlateEditorHeight.js:15 ~ onResize ~ myScrollbar:", myScrollbar)

        const {
            height: toolbarHeight = 37
        } = toolbar.getBoundingClientRect()
        myScrollbar.style.height = `calc(100% - ${toolbarHeight}px)`
    }

    useEffect(() => {
        if (effectRan.current === true) {
            console.log('$$$ effect ran');
            window.addEventListener('resize', onResize)
            onResize()
        }
        return () => {
            console.log('$$$ unmount');
            effectRan.current = true
            window.removeEventListener('resize', onResize)
        }
    }, []);
}
