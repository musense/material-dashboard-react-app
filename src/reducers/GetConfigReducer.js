import * as GetConfigAction from './../actions/GetConfigAction';

const initialState = {
    sidebarOpen: true,
    maxSizeClassName: '',
    errorMessage: null,
}

const getConfigReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetConfigAction.TOGGLE_SIDEBAR_OPEN: {
            return {
                ...state,
                sidebarOpen: !state.sidebarOpen,
                maxSizeClassName: state.sidebarOpen ? 'main-panel-max-size' : ''
            }
        }
        default:
            return { ...state }
    }

}

export default getConfigReducer

const getMaxSizeClassName = state => state.getConfigReducer.maxSizeClassName

export {
    getMaxSizeClassName
}