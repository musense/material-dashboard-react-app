import * as GetClassAction from '../actions/GetClassAction';
import { SelectProps } from '../components/MultiSelectSort/MultiSelectSort';
import { errorMessage } from './errorMessage';

export interface EditorClass {
    _id: string;
    classification: string;
    parentClass: string | undefined;
    title: string | undefined;
    description: string | undefined;
    keywords: string | undefined;
    customUrl: string | undefined;
}


const emptyEditorClass = {
    _id: '',
    classification: '',
    parentClass: '',
    title: '',
    description: '',
    keywords: '',
    customUrl: '',
}

const initialState: {
    parentClassOptions: SelectProps[],
    classifications: string[],
    classList: Map<any, any>;
    editorClassList: EditorClass[];
    editorClass: EditorClass;
    errorMessage: String | null;
} = {
    parentClassOptions: null,
    classifications: null,
    classList: new Map(),
    editorClassList: [emptyEditorClass],
    editorClass: emptyEditorClass,
    errorMessage: null
}
const getClassReducer = (state = initialState, action: { type: any; payload: { data: any; }; }) => {
    // console.log(action);

    switch (action.type) {
        case GetClassAction.SET_PARENT_CLASS_OPTIONS:
            return {
                ...state,
                parentClassOptions: action.payload,
                errorMessage: errorMessage.getFinish
            }
        case GetClassAction.REQUEST_CLASS_LIST_SUCCESS:
            return {
                ...state,
                editorClassList: action.payload,
                errorMessage: errorMessage.getFinish
            }
        case GetClassAction.REQUEST_ALL_CLASS_LIST_SUCCESS:
            return {
                ...state,
                classifications: action.payload,
                errorMessage: errorMessage.getFinish
            }
        case GetClassAction.REQUEST_CLASS:
            return {
                ...state,
                classifications: state.classList.get(action.payload),
                errorMessage: errorMessage.getFinish
            }
        case GetClassAction.REQUEST_CLASS_SUCCESS:
            return {
                ...state,
                classList: action.payload,
                errorMessage: errorMessage.getFinish
            }
        case GetClassAction.ADD_CLASS_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.addSuccess
            }
        case GetClassAction.EDITING_CLASS:
            return {
                ...state,
                editorClass: action.payload.data,
                errorMessage: errorMessage.updateSuccess
            }
        // case GetClassAction.EDIT_SAVING_CLASS:
        //     return {
        //         ...state,
        //         editorClassList:
        //             state.editorClassList
        //                 .map(editorClass => {
        //                     if (editorClass._id !== action.payload.data._id) return editorClass
        //                     return {
        //                         ...editorClass,
        //                         ...action.payload.data
        //                     }
        //                 })
        //         ,
        //         editorClass: emptyEditorClass,
        //         errorMessage: errorMessage.updateSuccess
        //     }
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

export default getClassReducer
