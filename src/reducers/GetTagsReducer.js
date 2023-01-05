import { GET_TAG_SUCCESS, GET_TAG_FAIL, GET_TAG_REQUEST } from '../actions/GetTagsAction';
import TAG from '../model/tags';

const initialState = {
    tagList: TAG,
    // tagList: null,
    errorMessage: null
}

const getTagReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TAG_SUCCESS:
            return { ...state, tagList: action.payload, errorMessage: null }
        case GET_TAG_FAIL:
            return { ...state, errorMessage: action.payload }
        case GET_TAG_REQUEST:
        default:
            return { ...state }
    }
}

export default getTagReducer
