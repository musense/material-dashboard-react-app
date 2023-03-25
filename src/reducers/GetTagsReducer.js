import {
    ADD_TAG_FAIL, ADD_TAG_SUCCESS, DELETED_SELECTED_TAG_SUCCESS, DELETE_TAG, DELETE_TAG_FAIL, DELETE_TAG_SUCCESS, GET_SELECTED_TAG_SUCCESS, GET_TAG_FAIL, GET_TAG_SUCCESS, REQUEST_TAG, REQUEST_TAG_SUCCESS, UPDATE_SELECTED_TAG_SUCCESS, UPDATE_TAG, UPDATE_TAG_FAIL, UPDATE_TAG_SUCCESS
} from '../actions/GetTagsAction';
import { errorMessage } from './errorMessage';

const nullTag = {
    name: "-1",
    createdAt: "",
    taggedNumber: "false",
    forceTrend: "0",
};

const initialState = {
    tagList: null,
    selectedTag: null,
    selectedIndex: -1,
    errorMessage: null
}

const getTagReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TAG_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.addSuccess
            }
        case UPDATE_TAG_SUCCESS:
            return {
                ...state,
                tagList: action.payload,
                errorMessage: errorMessage.updateSuccess
            }
        case DELETE_TAG_SUCCESS:
            return {
                ...state,
                tagList: action.payload,
                errorMessage: errorMessage.deleteSuccess
            }
        case ADD_TAG_FAIL:
            return {
                ...state,
                errorMessage: errorMessage.addFail
            }
        case UPDATE_TAG_FAIL:
            return {
                ...state,
                errorMessage: errorMessage.updateFail
            }
        case DELETE_TAG_FAIL:
            return {
                ...state,
                errorMessage: errorMessage.deleteFail
            }
        case REQUEST_TAG_SUCCESS:
            return {
                ...state,
                tagList: action.payload,
                errorMessage: errorMessage.getFinish
            }
        case GET_SELECTED_TAG_SUCCESS:
            return {
                ...state,
                selectedIndex: action.payload.selectedIndex,
                selectedTag: state.tagList.filter((t, index) =>
                    index == action.payload.selectedIndex
                ).flat(),
                errorMessage: null
            }
        case UPDATE_SELECTED_TAG_SUCCESS:
            {
                const sTag = state.tagList.filter((t, index) =>
                    index == state.selectedIndex
                ).flat()
                if (JSON.stringify(sTag) === JSON.stringify(action.payload.selectedTag)) {
                    return {
                        ...state,
                        errorMessage: 'nothing to update!!!'
                    }
                }

                const uTagList = state.tagList.map((t, index) =>
                    index == state.selectedIndex ?
                        [
                            ...action.payload.selectedTag
                        ]
                        : t
                )
                return {
                    ...state,
                    tagList: uTagList,
                    selectedTag: nullTag,
                    selectedIndex: state.selectedIndex,
                    errorMessage: 'updated successfully'
                }
            }
        case DELETED_SELECTED_TAG_SUCCESS:
            {
                const oTagList = state.tagList;
                oTagList.splice(state.selectedIndex, 1)
                return {
                    ...state,
                    tagList: oTagList,
                    selectedTag: nullTag,
                    selectedIndex: -1,
                    errorMessage: 'deleted sucecssfully'
                }
            }
        case GET_TAG_SUCCESS:
            return { ...state, tagList: action.payload, errorMessage: null }
        case GET_TAG_FAIL:
            return { ...state, errorMessage: action.payload }
        // case GET_TAG_REQUEST:

        case REQUEST_TAG:
        case UPDATE_TAG:
        case DELETE_TAG:
            return {
                ...state,
                errorMessage: null
            }
        default:
            return { ...state }
    }
}

export default getTagReducer
