import { useMemo } from "react"

export default function useSelectorCreatableProps({
    name
}) {

    const props = useMemo(() => ({
        formatCreateLabel: (value) => `新增${name}： ${value}`,
        // styles: {
        //     option: (provided, state) =>
        //         state.data.__isNew__ ? { ...provided, color: "pink" } : provided,
        // }
    }), [name])

    return props
}
