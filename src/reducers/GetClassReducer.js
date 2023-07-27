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
    editorClass: null,
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
                sortingMap: {
                    ...state.sortingMap,
                    [key]: state.sortingMap[key] === 'asc' ? 'desc' : 'asc',
                },
                showList: state.editorClassList.sort((class1, class2) => {
                    let typeOf
                    let c1, c2,
                        k1, k2;

                    if (key.indexOf('.') !== -1) {
                        k1 = key.split('.')[0]
                        k2 = key.split('.')[1]
                        c1 = class1[k1][k2]
                        c2 = class2[k1][k2]
                        typeOf = typeof class1[k1][k2]
                    } else {
                        c1 = class1[key]
                        c2 = class2[key]
                        typeOf = typeof class1[key]
                    }
                    const sorting = state.sortingMap[key]
                    switch (typeOf) {
                        case 'string': {
                            if (sorting === 'asc') {
                                return c1.localeCompare(c2)
                            } else {
                                return c2.localeCompare(c1)
                            }
                        }
                        case 'boolean': {
                            if (sorting === 'asc') {
                                return c2.toString().localeCompare(c1.toString())
                            } else {
                                return c1.toString().localeCompare(c2.toString())
                            }
                        }
                        case 'number': {
                            if (sorting === 'asc') {
                                return parseInt(c2 ? c2 : 0) - parseInt(c1 ? c1 : 0)
                            } else {
                                return parseInt(c1 ? c1 : 0) - parseInt(c2 ? c2 : 0)
                            }
                        }
                        case 'object': {
                            if (sorting === 'asc') {
                                return (new Date(c2)).getTime() - (new Date(c1)).getTime()
                            } else {
                                return (new Date(c1)).getTime() - (new Date(c1)).getTime()
                            }
                        }

                    }
                }).slice(0, 10),
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
            return {
                ...state,
                errorMessage: action.payload.errorMessage,
            }
        }
        case GetClassAction.EDITING_CLASS:
            return {
                ...state,
                editorClass: action.payload.editorClass,
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
        default:
            return { ...state }
    }
}

export default getClassReducer
