import { useCallback, useEffect, useMemo, useState } from "react";

export default function useSetSelectorValue(defaultSelected, isMulti) {

    const [selected, setSelected] = useState();
    const setTransform = useCallback((selectedValue) => {
        if (!selectedValue || selectedValue.length === 0) return;
        if (isMulti) {
            return selectedValue.map(selected => ({
                _id: selected.value,
                name: selected.label,
                [selected.__isNew__ ? '__isNew__' : '']: true
            }))
        }
        return {
            _id: selectedValue.value,
            name: selectedValue.label,
            [selectedValue.__isNew__ ? '__isNew__' : '']: true
        }
    }, [isMulti])

    const transformedSelected = useMemo(() => {
        if (!defaultSelected || defaultSelected.length === 0) return null;
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
        setSelected(transformedSelected)
    }, [transformedSelected]);

    return { selected, setSelected, setTransform }
}
