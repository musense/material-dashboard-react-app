import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
} from '../actions/GetUserAction';
import { errorMessage } from './errorMessage';

const initialState = {
    email: null,
    username: null,
    password: null,
    errorMessage: null,
}

const getUserReducer = (state = initialState, action) => {
    // console.log(`action: ${JSON.stringify(action)}`)
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        case REGISTER_USER_FAIL:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        case LOGIN_USER_FAIL:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        default:
            return { ...state }
    }
}

export default getUserReducer
