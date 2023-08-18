import *  as GetTagsAction from '../actions/GetTagsAction';
import { errorMessage } from './errorMessage';
import { createSelector } from 'reselect'

const initialState = {
    sortingMap: {
        sorting: 'asc',
        name: 'asc',
        createDate: 'asc',
        isHot: 'asc',
    },
    tagList: null,
    selectedTag: {
        id: '',
        tagName: '',
        title: '',
        description: '',
        keywords: '',
        manualUrl: '',
        customUrl: '',
        popular: false,
        sorting: '',
    },
    isEditing: false,
    selectedID: -1,
    currentPage: 1,
    totalCount: null,
    nextSorting: null,
    errorMessage: null,
}

const getTagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetTagsAction.CANCEL_EDITING_TAG: {
            return {
                ...state,
                selectedTag: {
                    ...initialState.selectedTag,
                },
                isEditing: false
            }
        }
        case GetTagsAction.SET_TAG_PROPERTY: {
            const { property, value } = action.payload.allProps
            return {
                ...state,
                selectedTag: {
                    ...state.selectedTag,
                    [property]: value
                },
            }
        }
        case GetTagsAction.EDITING_TAG:
            const { data } = action.payload
            console.log("🚀 ~ file: GetTagsReducer.js:55 ~ getTagsReducer ~ data:", data)
            return {
                ...state,
                selectedTag: {
                    id: data._id,
                    tagName: data.name,
                    title: data.webHeader.title,
                    description: data.webHeader.description,
                    keywords: data.webHeader.keywords,
                    manualUrl: data.webHeader.manualUrl,
                    customUrl: data.webHeader.customUrl,
                    popular: data.popular,
                    sorting: data.sorting,
                },
                selectedID: data._id,
                isEditing: true,
            }
        case GetTagsAction.ADD_TAG_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.addSuccess
            }
        case GetTagsAction.UPDATE_TAG_SUCCESS:
            const { _id } = action.payload.updateTag
            let updatedTagList
            Array.from(state.tagList).forEach((tag, index) => {
                if (tag._id === _id) {
                    updatedTagList =
                        [
                            ...state.tagList.slice(0, index),
                            action.payload.updateTag,
                            ...state.tagList.slice(index + 1, state.tagList.length),
                        ]
                    return
                }
            })
            console.log("🚀 ~ file: GetTagsReducer.js:87 ~ updatedTagList ~ updatedTagList:", updatedTagList)
            return {
                ...state,
                tagList: updatedTagList,
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
                currentPage: action.payload.currentPage,
                totalCount: action.payload.totalCount,
                nextSorting: action.payload.nextSorting,
                errorMessage: errorMessage.getFinish
            }
        case GetTagsAction.REQUEST_TAG_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case GetTagsAction.SHOW_TAG_LIST_SORTING:
            const { key } = action.payload;
            let sortedTagList = state.tagList.sort((tag1, tag2) => {
                let typeOf = typeof tag1[key]
                let e1, e2
                e1 = tag1[key]
                e2 = tag2[key]
                // typeOf = typeof new Date(tag1[key]).getMonth === 'function' ? 'date' : typeOf
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
            if (key === 'sorting') {
                const popularTagList = sortedTagList.filter(tag => tag.popular === true)
                const unpopularTagList = sortedTagList.filter(tag => tag.popular === false)
                sortedTagList = [
                    ...popularTagList,
                    ...unpopularTagList
                ]
            }
            return {
                ...state,
                tagList: sortedTagList,
                sortingMap: {
                    ...state.sortingMap,
                    [key]: state.sortingMap[key] === 'asc' ? 'desc' : 'asc',
                },
                currentPage: 1
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
                sortingMap: {
                    ...initialState.sortingMap
                },
                selectedTag: {
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

const getTagList = state => state.getTagsReducer.tagList && [...state.getTagsReducer.tagList]
const getCurrentPage = state => state.getTagsReducer.currentPage

const getTotalPage = state => Math.ceil(state.getTagsReducer.totalCount / 10)
const getTotalCount = state => state.getTagsReducer.totalCount
const getTagErrorMessage = state => state.getTagsReducer.errorMessage
const getNextSorting = state => state.getTagsReducer.nextSorting
const getIsEditing = state => state.getTagsReducer.isEditing


const getTagShowList = createSelector(
    [getTagList, getCurrentPage],
    (tagList, currentPage) => {
        console.log("🚀 ~ file: GetTagsReducer.js:237 ~ tagList:", tagList)
        const start = (currentPage - 1) * 10;
        const end = start + 10
        return tagList?.slice(start, end)
    })

// const getSelectedID = state => state.getTagsReducer.selectedID
// export const getSelectedTag = createSelector(
//     getTagShowList,
//     getSelectedID,
//     (showList, selectedID) => {
//         return showList?.find(tag => tag._id === selectedID)
//     }
// )

export default getTagsReducer

export {
    getCurrentPage,
    getTotalPage,
    getTotalCount,
    getNextSorting,
    getIsEditing,
    getTagErrorMessage,
    getTagShowList,
}