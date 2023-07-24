import *  as GetTagsAction from '../actions/GetTagsAction';
import { errorMessage } from './errorMessage';

const initialState = {
    sortingMap: {
        sorting: 'asc',
        name: 'asc',
        createDate: 'asc',
        isHot: 'asc',
    },
    tagList: null,
    showTagList: null,
    selectedTag: null,
    selectedIndex: -1,
    currentPage: null,
    totalPage: null,
    totalCount: null,
    errorMessage: null,
}

const getTagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetTagsAction.EDITING_TAG:
            return {
                ...state,
                selectedTag: action.payload.data,
            }
        case GetTagsAction.ADD_TAG_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.addSuccess
            }
        case GetTagsAction.UPDATE_TAG_SUCCESS:
            return {
                ...state,
                tagList: action.payload,
                errorMessage: errorMessage.updateSuccess
            }
        case GetTagsAction.DELETE_TAG_SUCCESS:
            return {
                ...state,
                tagList: action.payload,
                errorMessage: errorMessage.deleteSuccess
            }
        case GetTagsAction.ADD_TAG_FAIL:
            return {
                ...state,
                errorMessage: errorMessage.addFail
            }
        case GetTagsAction.UPDATE_TAG_FAIL:
            return {
                ...state,
                errorMessage: errorMessage.updateFail
            }
        case GetTagsAction.DELETE_TAG_FAIL:
            return {
                ...state,
                errorMessage: errorMessage.deleteFail
            }
        case GetTagsAction.REQUEST_TAG_SUCCESS:
            return {
                ...state,
                tagList: action.payload.tagList,
                showTagList: action.payload.tagList.slice(0, 10),
                currentPage: action.payload.currentPage,
                totalCount: action.payload.totalCount,
                totalPage: Math.ceil(action.payload.totalCount / 10),
                errorMessage: errorMessage.getFinish
            }
        case GetTagsAction.REQUEST_TAG_PAGE:
            const start = (action.payload - 1) * 10;
            const end = start + 10
            return {
                ...state,
                showTagList: state.tagList.slice(start, end),
                currentPage: action.payload
            }
        case GetTagsAction.SHOW_TAG_LIST_SORTING:
            const { key } = action.payload;
            return {
                ...state,
                sortingMap: {
                    ...state.sortingMap,
                    [key]: state.sortingMap[key] === 'asc' ? 'desc' : 'asc',
                },
                showTagList: state.tagList
                    ? state.tagList.sort((tag1, tag2) => {
                        const typeOf = typeof tag1[key]
                        const sorting = state.sortingMap[key]
                        switch (typeOf) {
                            case 'string': {
                                if (sorting === 'asc') {
                                    return tag2[key].localeCompare(tag1[key])
                                } else {
                                    return tag1[key].localeCompare(tag2[key])
                                }
                            }
                            case 'boolean': {
                                if (sorting === 'asc') {
                                    return tag2[key].toString().localeCompare(tag1[key].toString())
                                } else {
                                    return tag1[key].toString().localeCompare(tag2[key].toString())
                                }
                            }
                            case 'number': {
                                if (sorting === 'asc') {
                                    return parseInt(tag2[key] ? tag2[key] : 0) - parseInt(tag1[key] ? tag1[key] : 0)
                                } else {
                                    return parseInt(tag1[key] ? tag1[key] : 0) - parseInt(tag2[key] ? tag2[key] : 0)

                                }
                            }
                            case 'object': {
                                if (sorting === 'asc') {
                                    return (new Date(tag2[key])).getTime() - (new Date(tag1[key])).getTime()
                                } else {
                                    return (new Date(tag1[key])).getTime() - (new Date(tag1[key])).getTime()
                                }
                            }

                        }
                    }).slice(0, 10)
                    : null,
                currentPage: 1
            }
        case GetTagsAction.GET_TAG_SUCCESS:
            return {
                ...state,
                tagList: action.payload,
                errorMessage: null
            }
        case GetTagsAction.GET_TAG_FAIL:
            return {
                ...state,
                errorMessage: action.payload
            }
        case GetTagsAction.SET_ERROR_MESSAGE:{
            return {
                ...state,
                errorMessage: action.payload.message
            }
        }
        case GetTagsAction.UPDATE_TAG:
        case GetTagsAction.DELETE_TAG:
            return {
                ...state,
                errorMessage: null
            }
        default: {
            return {
                ...state,
            }
        }
            
    }
}

export default getTagsReducer
