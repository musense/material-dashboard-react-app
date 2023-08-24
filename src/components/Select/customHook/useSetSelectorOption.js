import { useEffect, useMemo, useState } from "react";

export default function useSetSelectorOption(defaultOptions) {
    const [options, setOptions] = useState();

    const transformedOptions = useMemo(() => {
        if (!defaultOptions || defaultOptions.length === 0) return [];
        return defaultOptions.map((option) => {
            return {
                value: option._id,
                label: option.name
            }
        })
    }, [defaultOptions])

    useEffect(() => {
        setOptions(transformedOptions);
    }, [transformedOptions]);

    return options
}
