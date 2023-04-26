import *  as GetTagsAction from '../actions/GetTagsAction';
import { errorMessage } from './errorMessage';

const initialState = {
    tagList: null,
    showTagList: null,
    selectedTag: null,
    selectedIndex: -1,
    currentPage: null,
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
                errorMessage: errorMessage.getFinish
            }
        case GetTagsAction.REQUEST_PAGE_TAG:
            const start = (action.payload - 1) * 10;
            const end = start + 10
            return {
                ...state,
                showTagList: state.tagList.slice(start, end),
                currentPage: action.payload
            }

        // case GetTagsAction.GET_SELECTED_TAG_SUCCESS:
        //     return {
        //         ...state,
        //         selectedIndex: action.payload.selectedIndex,
        //         selectedTag: state.tagList.filter((t, index) =>
        //             index == action.payload.selectedIndex
        //         ).flat(),
        //         errorMessage: null
        //     }
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
        // case GetTagsAction.GET_TAG_REQUEST:

        case GetTagsAction.UPDATE_TAG:
        case GetTagsAction.DELETE_TAG:
            return {
                ...state,
                errorMessage: null
            }
        default:
            return { ...state }
    }
}

export default getTagsReducer
