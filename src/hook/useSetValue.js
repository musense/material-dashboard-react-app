import { useEffect, useState } from "react";

export default function useSetValue(defaultSelected) {
    const [selected, setSelected] = useState();

    useEffect(() => {
        console.log("🚀 ~ file: Selector.jsx:33 ~ useEffect ~ defaultSelected:", defaultSelected)
        setSelected(defaultSelected)
    }, [defaultSelected]);

    return { selected, setSelected }
}
