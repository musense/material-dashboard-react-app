import { useEffect, useState } from "react";

export default function useSetSlateEditorHeight(toolbarRef, myScrollbarRef) {
    const [toolbar, setToolbar] = useState();
    const [myScrollbar, setMyScrollbar] = useState();

    const onResize = () => {
        if (!toolbar) return
        if (!myScrollbar) return

        const { height: toolbarHeight } = toolbar.getBoundingClientRect()
        myScrollbar.style.height = `calc(100% - ${toolbarHeight}px)`
    }

    useEffect(() => {
        if (toolbarRef.current === null || myScrollbarRef.current === null) {
            return
        } else {
            setToolbar(toolbarRef.current)
            setMyScrollbar(myScrollbarRef.current)
            window.addEventListener('resize', onResize)
            onResize()
        }

        return () => {
            console.log('$$$ unmount');
            window.removeEventListener('resize', onResize)
        }
    }, [toolbarRef, myScrollbarRef]);
}
