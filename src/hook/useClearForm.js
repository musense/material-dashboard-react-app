import { useEffect } from "react";

export default function useClearForm(clearFunc) {
    useEffect(() => {
        return () => {
            clearFunc && clearFunc()
        };
    }, [clearFunc]);
}
