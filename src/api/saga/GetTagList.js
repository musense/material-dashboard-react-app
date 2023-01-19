import axios from "axios";
import { all, put, take, takeEvery } from 'redux-saga/effects';
import {
    ADD_TAG, ADD_TAG_FAIL, ADD_TAG_SUCCESS, DELETE_TAG, DELETE_TAG_FAIL, DELETE_TAG_SUCCESS, GET_TAG_FAIL, REQUEST_TAG, REQUEST_TAG_STAGE, REQUEST_TAG_SUCCESS, UPDATE_TAG, UPDATE_TAG_FAIL, UPDATE_TAG_SUCCESS
} from "../../actions/GetTagsAction";
import * as APIList from './../apiList';

const apiUrl = `${APIList.getTagList}`

// GET
function* GetTagList() {
    try {
        // console.log(`GetTagList!!! YA!!`)

        const response = yield axios.get("http://localhost:4200/tags");
        const tagList = yield response.data;
        yield put({
            type: REQUEST_TAG_SUCCESS,
            payload: tagList,
        })
    } catch (error) {
        yield put({
            type: GET_TAG_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

// POST
function* AddTag(payload) {
    try {
        // console.group('AddTag!!! YA!! payload.data')
        // console.table(payload.data);
        // console.groupEnd('AddTag!!! YA!! payload.data');

        const response = yield axios.post(`http://localhost:4200/tags/`, payload.data);
        const responseData = yield response.data;
        console.group('AddTag responseData')
        console.table(responseData)
        console.groupEnd('AddTag responseData')
        yield put({
            type: ADD_TAG_SUCCESS,
            payload: null
        })
    } catch (error) {
        yield put({
            type: ADD_TAG_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

// PATCH
function* UpdateTag(payload) {
    try {
        // console.group('UpdateTag!!! YA!! payload.data')
        // console.table(payload.data);
        // console.groupEnd('UpdateTag!!! YA!! payload.data');
        const response = yield axios.patch(`http://localhost:4200/tags/${payload.data.id}`, payload.data);
        const tagList = yield response.data;
        console.group('UpdateTag responseData')
        console.table(tagList)
        console.groupEnd('UpdateTag responseData')
        yield put({
            type: UPDATE_TAG_SUCCESS,
            payload: tagList
        })
    } catch (error) {
        yield put({
            type: UPDATE_TAG_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

// DELETE
function* DeleteTag(payload) {
    try {
        console.group('DeleteTag!!! YA!! payload.data')
        console.table(payload.data);
        console.groupEnd('DeleteTag!!! YA!! payload.data');
        const response = yield axios.delete(`http://localhost:4200/tags/${payload.data}`);
        const tagList = yield response.data;
        console.group('DeleteTag responseData')
        console.table(tagList)
        console.groupEnd('DeleteTag responseData')
        yield put({
            type: DELETE_TAG_SUCCESS,
            payload: tagList
        })
    } catch (error) {
        yield put({
            type: DELETE_TAG_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

function* reGetTagList() {
    yield GetTagList()
}

function* setErrorMessageNull() {
    yield put({
        type: REQUEST_TAG_STAGE
    })
}

function* watchAddTagSaga() {
    while (true) {
        const { payload } = yield take(ADD_TAG)
        // yield setErrorMessageNull()
        yield AddTag(payload)
    }
}

function* watchUpdateTagSaga() {
    while (true) {
        const { payload } = yield take(UPDATE_TAG)
        // yield setErrorMessageNull()
        yield UpdateTag(payload)
    }
}

function* watchDeleteTagSaga() {
    while (true) {
        const { payload } = yield take(DELETE_TAG)
        // yield setErrorMessageNull()
        yield DeleteTag(payload)
    }
}

function* mySaga() {
    yield all([
        takeEvery(ADD_TAG_SUCCESS, reGetTagList),
        takeEvery(REQUEST_TAG, GetTagList),
        watchUpdateTagSaga(),
        watchAddTagSaga(),
        watchDeleteTagSaga(),
    ])
}

export default mySaga;