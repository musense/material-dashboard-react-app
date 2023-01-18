import {
    ADD_EDITOR_SUCCESS,
    ADD_EDITOR_FAIL,
    UPDATE_EDITOR_SUCCESS,
    UPDATE_EDITOR_FAIL,
    DELETE_EDITOR_SUCCESS,
    DELETE_EDITOR_FAIL,
    REQUEST_EDITOR_SUCCESS,
    REQUEST_EDITOR_FAIL,
    REQUEST_EDITOR_TITLE_LIST_SUCCESS,
    REQUEST_EDITOR_TITLE_LIST_FAIL,
} from '../actions/GetEditorAction';
import { errorMessage } from './errorMessage';

const initialState = {
    _id         : null,
    id          : null,
    title       : null,
    content     : null,
    errorMessage: null,
    titleList   : []
}
const getEditorReducer = (state = initialState, action) => {
    console.log(`action: ${JSON.stringify(action)}`)
    switch (action.type) {
        case ADD_EDITOR_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.addSuccess
            }
        case ADD_EDITOR_FAIL:
            return {
                ...state,
                errorMessage: errorMessage.addFail
            }
        case REQUEST_EDITOR_TITLE_LIST_SUCCESS:
            return {
                ...state,
                titleList   : action.payload,
                // errorMessage: errorMessage.getFinish
                errorMessage: 'get editor finish'
            }
        case REQUEST_EDITOR_TITLE_LIST_FAIL:
            return {
                ...state,
                errorMessage: errorMessage.getFinish
            }
        case REQUEST_EDITOR_SUCCESS:
            return {
                ...state,
                id: action.payload.id,
                title: action.payload.title,
                content: action.payload.content,
                errorMessage: errorMessage.getFinish
            }
        case REQUEST_EDITOR_FAIL:
            return {
                ...state,
                errorMessage: errorMessage.getFinish
            }
        default:
            return { ...state }
    }
}

export default getEditorReducer
