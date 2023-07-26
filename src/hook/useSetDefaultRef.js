import { useEffect, useRef } from "react";

export default function useSetDefaultRef(array) {
    const ref = useRef(null);
    useEffect(() => {
        if (array === null) return;
        ref.current = array;
    }, [array]);

    return { ref }
}