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
import { REQUEST_TAG_STAGE } from '../actions/GetTagsAction';
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
                errorMessage: errorMessage.addSuccess
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
