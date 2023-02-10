import {
    ADD_EDITOR_FAIL, ADD_EDITOR_SUCCESS, DELETE_EDITOR, INITIAL_EDITOR, REQUEST_EDITOR, REQUEST_EDITOR_FAIL, REQUEST_EDITOR_SUCCESS, REQUEST_EDITOR_TITLE_LIST_FAIL, REQUEST_EDITOR_TITLE_LIST_SUCCESS, UPDATE_EDITOR, UPDATE_EDITOR_FAIL, UPDATE_EDITOR_SUCCESS
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
    switch (action.type) {
        case INITIAL_EDITOR:
            return {
                ...state,
                _id: null,
                id: null,
                title: null,
                content: null,
                errorMessage: null,
            }

        case ADD_EDITOR_SUCCESS:
            return {
                ...state,
                _id: action.payload._id,
                id: action.payload.id,
                title: action.payload.title,
                content: action.payload.content,
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
        case UPDATE_EDITOR_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.updateSuccess
            }
        case UPDATE_EDITOR_FAIL:
            return {
                ...state,
                errorMessage: errorMessage.updateFail
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