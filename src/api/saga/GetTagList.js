import {
    REQUEST_TAG,
    REQUEST_TAG_SUCCESS,
    ADD_TAG,
    ADD_TAG_SUCCESS,
    ADD_TAG_FAIL,
    UPDATE_TAG,
    UPDATE_TAG_SUCCESS,
    UPDATE_TAG_FAIL,
    DELETE_TAG,
    DELETE_TAG_SUCCESS,
    DELETE_TAG_FAIL,
    GET_TAG_REQUEST,
    GET_TAG_SUCCESS,
    GET_TAG_FAIL,
    GET_SELECTED_TAG_SUCCESS
} from "../../actions/GetTagsAction";
import * as APIList from './../apiList'
import { call, put, select, takeEvery, take, all } from 'redux-saga/effects'
import { headers } from "../../model/header"
import Pagination from '../../model/pagination'
import { LOGGER_CATCHERROR } from "../../actions/LoggerAction";
import TAG from "../../model/tags";
import axios from "axios";
import { TAG_CATCHERROR } from './../../actions/GetTagsAction';

const apiUrl = `${APIList.getTagList}`

// GET
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
        const responseData = yield response.data;
        console.group('UpdateTag responseData')
        console.table(responseData)
        console.groupEnd('UpdateTag responseData')
        yield put({
            type: UPDATE_TAG_SUCCESS,
            payload: null
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
        const responseData = yield response.data;
        console.group('DeleteTag responseData')
        console.table(responseData)
        console.groupEnd('DeleteTag responseData')
        yield put({
            type: DELETE_TAG_SUCCESS,
            payload: null
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


function* watchAddTagSaga() {
    while (true) {
        const { payload } = yield take(ADD_TAG)
        yield AddTag(payload)
    }
}

function* watchUpdateTagSaga() {
    while (true) {
        const { payload } = yield take(UPDATE_TAG)
        yield UpdateTag(payload)
    }
}

function* watchDeleteTagSaga() {
    while (true) {
        const { payload } = yield take(DELETE_TAG)
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