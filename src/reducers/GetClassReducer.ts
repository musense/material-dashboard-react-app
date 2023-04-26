import * as GetClassAction from '../actions/GetClassAction';
import { SelectProps } from '../components/Select/data';
import { errorMessage } from './errorMessage';

export interface EditorClass {
    _id: string;
    name: string;
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
    reset: string | null;
    currentPage: number | null,
    totalCount: number | null,
} = {
    parentClassOptions: null,
    classifications: null,
    classList: new Map(),
    editorClassList: null,
    editorClass: null,
    errorMessage: null,
    currentPage: null,
    totalCount: null,
    reset: null
}
const getClassReducer = (state = initialState, action: { type: any; payload: { editorClassList: any; currentPage: any; totalCount: any; data: { _id: string; }; }; }) => {
    // console.log(action);

    switch (action.type) {
        case GetClassAction.RESET_SELECTED_CLASS:
            return {
                ...state,
                reset: action.payload,
            }
        case GetClassAction.SET_PARENT_CLASS_OPTIONS:
            return {
                ...state,
                parentClassOptions: action.payload,
                errorMessage: errorMessage.getFinish
            }
        case GetClassAction.REQUEST_CLASS_LIST_SUCCESS:
            return {
                ...state,
                editorClassList: action.payload.editorClassList,
                currentPage: action.payload.currentPage,
                totalCount: action.payload.totalCount,
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
