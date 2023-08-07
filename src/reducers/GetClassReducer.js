import * as GetClassAction from '../actions/GetClassAction';
import { errorMessage } from './errorMessage';

const initialState = {
    sortingMap: {
        name: 'asc',
        customUrl: 'asc',
        keyName: 'asc',
        parentClass: 'asc',
    },
    showList: null,
    parentClassOptions: null,
    categories: null,
    classList: new Map(),
    editorClassList: null,
    editorClass: {
        id: '',
        name: '',
        keyName: '',
        title: '',
        description: '',
        keywords: '',
        manualUrl: '',
        customUrl: '',
        parentClass: '',
        isEditing: false,
    },
    errorMessage: null,
    currentPage: null,
    totalCount: null,
    totalPage: null,
    reset: null,
    editorStatus: [
        { _id: 0, name: '全部' },
        { _id: 1, name: '草稿' },
        { _id: 2, name: '已排程' },
        { _id: 3, name: '隱藏文章' },
        { _id: 4, name: '已發布' },
    ]
}
const getClassReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetClassAction.CANCEL_EDITING_CLASS:
            return {
                ...state,
                editorClass: {
                    ...initialState.editorClass,
                    isEditing: false
                }
            }
        case GetClassAction.SET_CLASS_PROPERTY: {
            const { property, value } = action.payload.allProps
            return {
                ...state,
                editorClass: {
                    ...state.editorClass,
                    [property]: value
                },
            }
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
                showList: action.payload.editorClassList.slice(0, 10),
                editorClassList: action.payload.editorClassList,
                currentPage: action.payload.currentPage,
                totalCount: action.payload.totalCount,
                totalPage: Math.ceil(action.payload.totalCount / 10),
                errorMessage: errorMessage.getFinish
            }
        case GetClassAction.REQUEST_CLASS_PAGE:
            const start = (action.payload - 1) * 10;
            const end = start + 10
            return {
                ...state,
                showList: state.editorClassList.slice(start, end),
                currentPage: action.payload,
            }
        case GetClassAction.SHOW_CLASS_LIST_SORTING:
            const { key } = action.payload;
            return {
                ...state,
                showList: state.editorClassList.sort((class1, class2) => {
                    let typeOf
                    let e1, e2,
                        k1, k2;

                    if (key.indexOf('.') !== -1) {
                        k1 = key.split('.')[0]
                        k2 = key.split('.')[1]
                        e1 = class1[k1][k2]
                        e2 = class2[k1][k2]
                        typeOf = typeof class1[k1][k2]
                    } else {
                        e1 = class1[key]
                        e2 = class2[key]
                        typeOf = typeof class1[key]
                    }
                    typeOf = typeof new Date(e1).getMonth === 'function' ? 'date' : typeOf
                    const sorting = state.sortingMap[key]
                    switch (typeOf) {
                        case 'string': {
                            if (sorting === 'asc') {
                                return e1.localeCompare(e2)
                            } else {
                                return e2.localeCompare(e1)
                            }
                        }
                        case 'boolean': {
                            if (sorting === 'asc') {
                                return e1.toString().localeCompare(e2.toString())
                            } else {
                                return e2.toString().localeCompare(e1.toString())
                            }
                        }
                        case 'number': {
                            if (sorting === 'asc') {
                                return parseInt(e1) - parseInt(e2)
                            } else {
                                return parseInt(e2) - parseInt(e1)
                            }
                        }
                        case 'date': {
                            if (sorting === 'asc') {
                                return (new Date(e1)).getTime() - (new Date(e1)).getTime()
                            } else {
                                return (new Date(e2)).getTime() - (new Date(e1)).getTime()
                            }
                        }
                    }
                }).slice(0, 10),
                sortingMap: {
                    ...state.sortingMap,
                    [key]: state.sortingMap[key] === 'asc' ? 'desc' : 'asc',
                },
                currentPage: 1
            }
        case GetClassAction.REQUEST_CLASS:
            return {
                ...state,
                categories: state.classList.get(action.payload),
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
        case GetClassAction.ADD_CLASS_FAIL:
        case GetClassAction.EDIT_CLASS_FAIL:
        case GetClassAction.DELETE_CLASS_FAIL:
        case GetClassAction.REQUEST_CLASS_LIST_FAIL:
        case GetClassAction.REQUEST_CLASS_FAIL: {
            let errorMessage;
            if (action.payload.errorMessage.indexOf('E11000 duplicate key error') !== -1) {
                errorMessage = 'duplicate key error'
            } else {
                errorMessage = action.payload.errorMessage
            }
            return {
                ...state,
                errorMessage: errorMessage,
            }
        }
        case GetClassAction.EDITING_CLASS:
            const editorClass = action.payload.data;
            return {
                ...state,
                editorClass: action.payload.editorClass,
                editorClass: {
                    id: editorClass._id,
                    name: editorClass.name,
                    keyName: editorClass.keyName,
                    title: editorClass.title,
                    description: editorClass.description,
                    keywords: editorClass.keywords,
                    manualUrl: editorClass.manualUrl,
                    customUrl: editorClass.customUrl,
                    parentClass: editorClass.parentClass,
                    isEditing: true
                }
            }
        case GetClassAction.EDIT_CLASS_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.updateSuccess
            }
        case GetClassAction.DELETE_CLASS_SUCCESS:
            return {
                ...state,
                editorClassList: action.payload,
                errorMessage: errorMessage.deleteSuccess
            }
        case GetClassAction.SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload.message
            }
        case "RESET_STATE_DATA": {
            return {
                ...initialState,
                errorMessage: '--reset-error-message'
            }
        }
        default:
            return { ...state }
    }
}

export default getClassReducer
