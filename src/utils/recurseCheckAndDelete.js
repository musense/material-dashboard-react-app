export default function recurseCheckAndDelete(state, initialState, createType) {
    if (createType === "add_new") {
        for (const key in initialState) {
            const value = initialState[key];
            if (key.toLowerCase().includes('image')) {
                if (state[key] === '') {
                    delete state[key]
                }
            } else if (Array.isArray(value)) {
                if (JSON.stringify(value) === JSON.stringify(state[key])) {
                    delete state[key]
                }
            } else if (value && typeof value === 'object') {
                const trimmedState = recurseCheckAndDelete(state[key], value, createType)
                if (trimmedState && Object.values(trimmedState).length === 0) {
                    delete state[key]
                }
            }
            if (JSON.stringify(value) === JSON.stringify(state[key])) {
                delete state[key]
            }
        }
    } else if (createType === "update") {
        for (const key in initialState) {
            const value = initialState[key];
            if (typeof value === 'object' && Array.isArray(value)) {
                if (JSON.stringify(value) === JSON.stringify(state[key])) {
                    delete state[key]
                }
            } else if (typeof value === 'object') {
                const trimmedState = recurseCheckAndDelete(state[key], value, createType)
                if (trimmedState && Object.values(trimmedState).length === 0) {
                    delete state[key]
                }
            }
            if (JSON.stringify(value) === JSON.stringify(state[key])) {
                delete state[key]
            }
        }
    }

    return state
}