export default function generateErrorMessage(state, initialState = null) {
    if (Object.keys(state).length === 0) {
        return 'nothing to update!'
    }
    if (!initialState) return
    if (`${JSON.stringify(state.contentForm)}${JSON.stringify(state.detailForm)}`
        === `${JSON.stringify(initialState.contentForm)}${JSON.stringify(initialState.detailForm)}`) {
        return 'nothing to add!'
    }
    if (state.contentForm.title === '' && JSON.stringify(state.contentForm.content) === '[{"type":"paragraph","children":[{"text":""}]}]') {
        return 'content title required!'
    }
    if (state.contentForm.title === '') {
        return 'title required!'
    }
    if (JSON.stringify(state.contentForm.content) === '[{"type":"paragraph","children":[{"text":""}]}]') {
        return 'content required!'
    }
    return undefined
}