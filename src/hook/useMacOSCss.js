import { useEffect, useState } from "react";

export default function useSetMacOSCssReset(className) {
    const [classList, setClassList] = useState(className);
    useEffect(() => {
        const navigator = window.navigator
        console.log("🚀 ~ file: useSetMacOSCssReset.js:7 ~ useEffect ~ navigator.platform:", navigator.platform)
        if (navigator.platform.indexOf('Mac') !== -1) {
            setClassList(`${className} OSX`);
        }
    }, []);

    return classList
}
