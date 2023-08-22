import { useCallback, useEffect, useState } from "react";

export default function useGetToolbarHeight(toolbarRef) {
    const [toolbar, setToolbar] = useState();
    const [toolbarHeight, setToolbarHeight] = useState(37);

    const onResize = useCallback(() => {
        if (!toolbar) return
        const { height } = toolbar.getBoundingClientRect()
        setToolbarHeight(height)
    }, [setToolbarHeight])

    useEffect(() => {
        if (toolbarRef.current === null) {
            return
        } else {
            setToolbar(toolbarRef.current)
            window.addEventListener('resize', onResize)
            onResize()
        }

        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [toolbarRef]);

    return toolbarHeight
}
