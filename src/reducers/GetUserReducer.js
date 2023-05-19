import * as GetUserAction from '../actions/GetUserAction';

const initialState = {
    email: null,
    username: null,
    errorMessage: null,
}

const getUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetUserAction.REGISTER_USER_SUCCESS:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        case GetUserAction.REGISTER_USER_ERROR_RESET:
            return {
                ...state,
                errorMessage: null
            }
        case GetUserAction.REGISTER_USER_FAIL:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        case GetUserAction.LOGIN_USER_SUCCESS:
            return {
                ...state,
                username: action.payload.username,
                email: action.payload.email,
                errorMessage: action.errorMessage
            }
        case GetUserAction.LOGIN_USER_FAIL:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        default:
            return { ...state }
    }
}

export default getUserReducer
