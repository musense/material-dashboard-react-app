import { useCallback, useEffect, useMemo, useState } from "react";

export default function useSetSelectorValue(defaultSelected, isMulti) {

    const [selected, setSelected] = useState();
    const setTransform = useCallback((selectedValue) => {
        if (isMulti) {
            return selectedValue.map(selected => ({
                _id: selected.value,
                name: selected.label
            }))
        }
        return {
            _id: selectedValue.value,
            name: selectedValue.label
        }
    }, [isMulti])

    const transformedSelected = useMemo(() => {
        if (!defaultSelected || defaultSelected.length === 0) return null;
        console.log("🚀 ~ file: useSetSelectorValue.js:31 ~ returndefaultSelected.map ~ defaultSelected:", defaultSelected)
        if (isMulti) {
            return defaultSelected.map((selected) => {
                return {
                    value: selected._id,
                    label: selected.name
                }
            })
        }
        return {
            value: defaultSelected._id,
            label: defaultSelected.name
        }


    }, [defaultSelected, isMulti])

    useEffect(() => {
        console.log("🚀 ~ file: Selector.jsx:33 ~ useEffect ~ defaultSelected:", defaultSelected)
        setSelected(transformedSelected)
    }, [transformedSelected]);

    return { selected, setSelected, setTransform }
}
