import {
    ADD_EDITOR_FAIL, ADD_EDITOR_SUCCESS, DELETE_EDITOR, REQUEST_EDITOR, REQUEST_EDITOR_FAIL, REQUEST_EDITOR_SUCCESS, REQUEST_EDITOR_TITLE_LIST_FAIL, REQUEST_EDITOR_TITLE_LIST_SUCCESS, UPDATE_EDITOR
} from '../actions/GetEditorAction';
import { errorMessage } from './errorMessage';

const initialState = {
    _id: null,
    id: null,
    title: null,
    content: null,
    errorMessage: null,
    titleList: []
}
const getEditorReducer = (state = initialState, action) => {
    console.group(`getEditorReducer action`)
    console.table(action)
    console.groupEnd(`getEditorReducer action`)
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
                titleList: action.payload,
                errorMessage: errorMessage.getFinish
            }
        case REQUEST_EDITOR_TITLE_LIST_FAIL:
            return {
                ...state,
                errorMessage: errorMessage.getFail
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
        case REQUEST_EDITOR:
        case UPDATE_EDITOR:
        case DELETE_EDITOR:
            return {
                ...state,
                errorMessage: null
            }
        default:
            return { ...state }
    }
}

export default getEditorReducer