import * as GetClassAction from '../actions/GetClassAction';
import { errorMessage } from './errorMessage';
import sha256 from 'crypto-js/sha256'

const defaultEditorClass = {
    _id: sha256('defaultEditorClass.title').toString(),
    classification: 'default-class',
    'parent-class': '',
    title: 'default-class',
    description: 'default-class',
    keyword: 'default-class',
    'custom-url': 'default-class',
}

const emptyEditorClass = {
    _id: '',
    classification: '',
    'parent-class': '',
    title: '',
    description: '',
    keyword: '',
    'custom-url': '',
}

const initialState = {
    editorClassList: [],
    editorClass: emptyEditorClass,
    errorMessage: null
}
const getEditorClassReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case GetClassAction.ADD_CLASS:
            return {
                ...state,
                editorClassList: state.editorClassList.concat(action.payload.data),
                editorClass: emptyEditorClass,
                errorMessage: errorMessage.addSuccess
            }
        case GetClassAction.ADD_CLASS_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.addSuccess
            }
        case GetClassAction.EDITING_CLASS:
            return {
                ...state,
                editorClass: action.payload.data.editorClass,
                errorMessage: errorMessage.updateSuccess
            }
        case GetClassAction.EDIT_SAVING_CLASS:
            return {
                ...state,
                editorClassList:
                    state.editorClassList
                        .filter(editorClass => editorClass._id === action.payload.data._id)
                        .map(editorClass => ({
                            ...editorClass,
                            ...action.payload.data
                        }))
                ,
                editorClass: emptyEditorClass,
                errorMessage: errorMessage.updateSuccess
            }
        case GetClassAction.EDIT_CLASS_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.updateSuccess
            }
        case GetClassAction.BUNCH_DELETE_CLASS:
            return {
                ...state,
                editorClassList:
                    state.editorClassList
                        .filter(editorClass => !action.payload.data.includes(editorClass._id)),
                errorMessage: errorMessage.deleteSuccess
            }
        case GetClassAction.DELETE_CLASS:
            return {
                ...state,
                editorClassList:
                    state.editorClassList
                        .filter(editorClass => editorClass._id !== action.payload.data._id),
                errorMessage: errorMessage.deleteSuccess
            }
        case GetClassAction.DELETE_CLASS_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.deleteSuccess
            }

        default:
            return { ...state }
    }
}

export default getEditorClassReducer
