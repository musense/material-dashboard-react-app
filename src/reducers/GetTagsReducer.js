import {
    ADD_TAG_SUCCESS,
    ADD_TAG_FAIL,
    UPDATE_TAG_SUCCESS,
    UPDATE_TAG_FAIL,
    DELETE_TAG_SUCCESS,
    DELETE_TAG_FAIL,
    REQUEST_TAG_SUCCESS,
    GET_TAG_SUCCESS,
    GET_TAG_FAIL,
    GET_TAG_REQUEST,
    GET_SELECTED_TAG_SUCCESS,
    UPDATE_SELECTED_TAG_SUCCESS,
    DELETED_SELECTED_TAG_SUCCESS,
} from '../actions/GetTagsAction';
import { errorMessage } from './errorMessage';

const nullTag = {
    id: "-1",
    name: "",
    showOnPage: "false",
    taggedNumber: "0",
};

const initialState = {
    tagList: null,
    selectedTag: null,
    selectedIndex: -1,
    errorMessage: null
}

const getTagReducer = (state = initialState, action) => {
    // console.log(`action: ${JSON.stringify(action)}`)
    switch (action.type) {
        case ADD_TAG_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.addSuccess
            }
        case UPDATE_TAG_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.updateSuccess
            }
        case DELETE_TAG_SUCCESS:
            return {
                ...state,
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
                errorMessage: errorMessage.deletefail
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
                console.log(`=======UPDATE_SELECTED_TAG_SUCCESS=======`)
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
                console.log(`UPDATE_SELECTED_TAG_SUCCESS oTagList: ${JSON.stringify(uTagList)}`)
                return {
                    ...state,
                    tagList: uTagList,
                    selectedTag: nullTag,
                    selectedIndex: state.selectedIndex,
                    errorMessage: 'updated sucessfully'
                }
            }
        case DELETED_SELECTED_TAG_SUCCESS:
            {
                const oTagList = state.tagList;
                oTagList.splice(state.selectedIndex, 1)
                console.log(`DELETED_SELECTED_TAG_SUCCESS oTagList: ${oTagList}`)
                return {
                    ...state,
                    tagList: oTagList,
                    selectedTag: nullTag,
                    selectedIndex: -1,
                    errorMessage: 'deleted sucessfully'
                }
            }
        case GET_TAG_SUCCESS:
            return { ...state, tagList: action.payload, errorMessage: null }
        case GET_TAG_FAIL:
            return { ...state, errorMessage: action.payload }
        // case GET_TAG_REQUEST:
        default:
            return { ...state }
    }
}

export default getTagReducer
