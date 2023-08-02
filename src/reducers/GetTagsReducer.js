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
    selectedTag: {
        id: '',
        tagName: '',
        title: '',
        description: '',
        keywords: '',
        manualUrl: '',
        customUrl: '',
        popular: false,
        sorting: 0,
        isEditing: false,
    },
    selectedIndex: -1,
    currentPage: null,
    totalPage: null,
    totalCount: null,
    errorMessage: null,
}

const getTagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetTagsAction.CANCEL_EDITING_TAG: {
            return {
                ...state,
                selectedTag: {
                    ...initialState.selectedTag,
                    isEditing: false
                },
            }
        }
        case GetTagsAction.SET_TAG_PROPERTY: {
            const { property, value } = action.payload.allProps
            console.log("🚀 ~ file: GetSlateReducer.js:80 ~ getSlateReducer ~ property:", property)
            console.log("🚀 ~ file: GetSlateReducer.js:80 ~ getSlateReducer ~ value:", value)

            return {
                ...state,
                selectedTag: {
                    ...state.selectedTag,
                    [property]: value
                },
            }
        }
        case GetTagsAction.EDITING_TAG:
            const tag = action.payload.data
            return {
                ...state,
                selectedTag: {
                    id: tag._id,
                    tagName: tag.name,
                    title: tag.webHeader.title,
                    description: tag.webHeader.description,
                    keywords: tag.webHeader.keywords,
                    manualUrl: tag.webHeader.manualUrl,
                    customUrl: tag.webHeader.customUrl,
                    popular: tag.popular,
                    sorting: tag.sorting,
                    isEditing: true,
                },
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
        case GetTagsAction.UPDATE_TAG_FAIL:
        case GetTagsAction.DELETE_TAG_FAIL: {
            let errorMessage;
            if (action.payload.errorMessage.indexOf('E11000 duplicate key error') !== -1) {
                errorMessage = 'duplicate key error'
            } else {
                errorMessage = action.payload.errorMessage
            }
            return {
                ...state,
                errorMessage: errorMessage
            }
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
        case GetTagsAction.REQUEST_POPULAR_TAG_FAIL: {
            return {
                ...state,
                errorMessage: action.payload.errorMessage
            }
        }
        case GetTagsAction.SET_ERROR_MESSAGE: {
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
        case "RESET_STATE_DATA": {
            return {
                ...initialState,
                sortingMap:{
                    ...initialState.sortingMap
                },
                selectedTag:{
                    ...initialState.selectedTag
                }
            }
        }
        default: {
            return {
                ...state,
            }
        }

    }
}

export default getTagsReducer
