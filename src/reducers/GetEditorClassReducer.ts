import * as GetClassAction from '../actions/GetClassAction';
import { errorMessage } from './errorMessage';
import sha256 from 'crypto-js/sha256'

export interface EditorClass {
    _id: string;
    classification: string;
    'parent-class': string | undefined;
    title: string | undefined;
    description: string | undefined;
    keywords: string | undefined;
    'custom-url': string | undefined;
}

const defaultEditorClass: EditorClass = {
    _id: sha256('uncategorized').toString(),
    classification: 'uncategorized',
    'parent-class': undefined,
    title: undefined,
    description: undefined,
    keywords: undefined,
    'custom-url': undefined,
}

const editorClassList = [
    {
        _id: sha256('test-class-1').toString(),
        classification: 'test-class-1',
        'parent-class': undefined,
        title: undefined,
        description: undefined,
        keywords: undefined,
        'custom-url': undefined,
    },
    {
        _id: sha256('test-class-class-2-2').toString(),
        classification: 'test-class-class-2-2',
        'parent-class': 'hot',
        title: undefined,
        description: undefined,
        keywords: undefined,
        'custom-url': undefined,
    },
    {
        _id: sha256('test-class2-class-2-2').toString(),
        classification: 'test-class2-class-2-2',
        'parent-class': 'hot',
        title: undefined,
        description: undefined,
        keywords: undefined,
        'custom-url': undefined,
    },
    {
        _id: sha256('test-class5-class-2-5').toString(),
        classification: 'test-class5-class-2-5',
        'parent-class': 'recommend',
        title: undefined,
        description: undefined,
        keywords: undefined,
        'custom-url': undefined,
    },
]

const emptyEditorClass = {
    _id: '',
    classification: '',
    'parent-class': '',
    title: '',
    description: '',
    keywords: '',
    'custom-url': '',
}

const initialState: {
    editorClassList: EditorClass[];
    editorClass: EditorClass;
    errorMessage: String | null;
} = {
    editorClassList: [
        defaultEditorClass,
        ...editorClassList
    ],
    editorClass: emptyEditorClass,
    errorMessage: null
}
const getEditorClassReducer = (state = initialState, action: { type: any; payload: { data: any; }; }) => {
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
                        .map(editorClass => {
                            if (editorClass._id !== action.payload.data._id) return editorClass
                            return {
                                ...editorClass,
                                ...action.payload.data
                            }
                        })
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
