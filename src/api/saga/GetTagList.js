import {
    REQUEST_TAG,
    REQUEST_TAG_SUCCESS,
    ADD_TAG,
    ADD_TAG_SUCCESS,
    ADD_TAG_FAIL,
    GET_TAG_REQUEST,
    GET_TAG_SUCCESS,
    GET_TAG_FAIL,
    GET_SELECTED_TAG_SUCCESS
} from "../../actions/GetTagsAction";
import * as APIList from './../apiList'
import { call, put, select, takeEvery, take } from 'redux-saga/effects'
import { headers } from "../../model/header"
import Pagination from '../../model/pagination'
import { LOGGER_CATCHERROR } from "../../actions/LoggerAction";
import TAG from "../../model/tags";

import axios from "axios";
import { TAG_CATCHERROR } from './../../actions/GetTagsAction';

const apiUrl = `${APIList.getTagList}`

function* GetTagList() {
    try {
        // console.log(`GetTagList!!! YA!!`)

        const response = yield axios.get("http://localhost:4200/tags");
        const tagList = yield response.data;
        yield put({
            type: REQUEST_TAG_SUCCESS,
            payload: tagList
        })
    } catch (error) {
        yield put({
            type: GET_TAG_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}


function* AddTag(tag) {
    try {
        console.log(`AddTag!!! YA!! `)
        const response = yield axios.post(`http://localhost:4200/tags/`, tag);
        const responseData = yield response.data;
        console.log(`AddTag responseData: ${JSON.stringify(responseData)}`)
        yield put({
            type: ADD_TAG_SUCCESS,
            payload: null
        })
        // yield put({
        //     type: REQUEST_TAG
        // })
    } catch (error) {
        yield put({
            type: ADD_TAG_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}
// function* watchSelectedTagClick() {
//     yield takeEvery(GET_SELECTED_TAG_SUCCESS)
//     yield put({
//         type: TAG_UPDATE_PANEL_SHOW
//     })

// }
function* reGetTagList() {
    yield GetTagList()
}

function* mySaga() {
    yield takeEvery(ADD_TAG_SUCCESS, reGetTagList)
    yield takeEvery(REQUEST_TAG, GetTagList)
    while (true) {
        const { tag } = yield take(ADD_TAG)
        console.log(`mySaga take(ADD_TAG): ${JSON.stringify(tag)}`)
        yield AddTag(tag)
    }
}

export default mySaga;