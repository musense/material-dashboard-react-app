import * as GetClassAction from '../actions/GetClassAction';
import { errorMessage } from './errorMessage';
import { createSelector } from 'reselect'

const initialState = {
    sortingMap: {
        name: 'asc',
        customUrl: 'asc',
        keyName: 'asc',
        parentClass: 'asc',
    },
    selectedPatchKey: null,
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
    },
    isEditing: false,
    selectedID: -1,
    currentPage: null,
    totalCount: null,
    errorMessage: null
}
const getClassReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetClassAction.CANCEL_EDITING_CLASS:
            return {
                ...state,
                editorClass: {
                    ...initialState.editorClass,
                },
                isEditing: false
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
                editorClassList: action.payload.editorClassList,
                currentPage: action.payload.currentPage,
                totalCount: action.payload.totalCount,
                errorMessage: errorMessage.getFinish
            }
        case GetClassAction.REQUEST_CLASS_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            }
        case GetClassAction.SHOW_CLASS_LIST_SORTING:
            const { key } = action.payload;
            const sortedEditorClassList = state.editorClassList.sort((class1, class2) => {
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
                const testDateValue = new Date(e1)
                typeOf = testDateValue instanceof Date && !isNaN(testDateValue) ? 'date' : typeOf
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
                            return (new Date(e1)).getTime() - (new Date(e2)).getTime()
                        } else {
                            return (new Date(e2)).getTime() - (new Date(e1)).getTime()
                        }
                    }
                }
            })
            return {
                ...state,
                editorClassList: sortedEditorClassList,
                sortingMap: {
                    ...state.sortingMap,
                    [key]: state.sortingMap[key] === 'asc' ? 'desc' : 'asc',
                },
                selectedPatchKey: key,
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
                },
                isEditing: true
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

const getEditorClassList = state => state.getClassReducer.editorClassList && [...state.getClassReducer.editorClassList]
const getCurrentPage = state => state.getClassReducer.currentPage

const getTotalPage = state => Math.ceil(state.getClassReducer.totalCount / 10)
const getTotalCount = state => state.getClassReducer.totalCount

const getSelectedPatchKey = state => state.getClassReducer.selectedPatchKey
const getClassErrorMessage = state => state.getClassReducer.errorMessage
const getIsEditing = state => state.getClassReducer.isEditing

const getClassShowList = createSelector(
    [getEditorClassList, getCurrentPage],
    (editorClassList, currentPage) => {
        const start = (currentPage - 1) * 10;
        const end = start + 10
        return editorClassList?.slice(start, end)
    })

export default getClassReducer

export {
    getCurrentPage,
    getTotalPage,
    getTotalCount,
    getSelectedPatchKey,
    getIsEditing,
    getClassErrorMessage,
    getClassShowList,
}