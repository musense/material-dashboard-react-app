import {
    REQUEST_EDITOR,
    REQUEST_EDITOR_SUCCESS,
    REQUEST_EDITOR_FAIL,
    ADD_EDITOR,
    ADD_EDITOR_SUCCESS,
    ADD_EDITOR_FAIL,
    UPDATE_EDITOR,
    UPDATE_EDITOR_SUCCESS,
    UPDATE_EDITOR_FAIL,
    DELETE_EDITOR,
    DELETE_EDITOR_SUCCESS,
    DELETE_EDITOR_FAIL,
    REQUEST_EDITOR_BY_TITLE,
    REQUEST_EDITOR_TITLE_LIST_SUCCESS,
    REQUEST_EDITOR_TITLE_LIST_FAIL
} from "../../actions/GetEditorAction";
import * as APIList from '../apiList'
import { call, put, select, takeEvery, take, all } from 'redux-saga/effects'
import { headers } from "../../model/header"
import Pagination from '../../model/pagination'
import axios from "axios";

// const apiUrl = `${APIList.getEditorList}`

// GET
function* GetEditorTitleList() {
    try {
        console.log(`GetEditorList!!! YA!!`)

        const response   = yield axios.get("http://localhost:4200/editor/title");
        const titleList = yield response.data;
        yield put({
            type   : REQUEST_EDITOR_TITLE_LIST_SUCCESS,
            payload: titleList,
        })
    } catch (error) {
        yield put({
            type        : REQUEST_EDITOR_TITLE_LIST_FAIL,
            errorMessage: error.message,
            payload     : null
        })
    }
}
function* GetEditorByID(dispatch) {
    const { id } = dispatch.payload
    try {
        const response = yield axios.get(`http://localhost:4200/editor/page?id=${id}`);
        const editor   = yield response.data;
        yield put({
            type   : REQUEST_EDITOR_SUCCESS,
            payload: editor,
        })
    } catch (error) {
        yield put({
            type        : REQUEST_EDITOR_FAIL,
            errorMessage: error.message,
            payload     : null
        })
    }
}

// POST
function* AddEditor(payload) {
    try {
        // console.group('AddEditor!!! YA!! payload.data')
        // console.table(payload.data);
        // console.groupEnd('AddEditor!!! YA!! payload.data');

        // const response = yield axios.post(`http://localhost:4200/editor/`, payload.data);
        // const responseData = yield response.data;
        // console.group('AddEditor responseData')
        // console.table(responseData)
        // console.groupEnd('AddEditor responseData')

        console.group('AddEditor responseData test')
        console.table(payload.data)
        console.groupEnd('AddEditor responseData test')
        yield put({
            type   : ADD_EDITOR_SUCCESS,
            payload: payload.data
        })
        
    } catch (error) {
        yield put({
            type        : ADD_EDITOR_FAIL,
            errorMessage: error.message,
            payload     : null
        })
    }
}

// PATCH
function* UpdateEditor(payload) {
    try {
        // console.group('UpdateEditor!!! YA!! payload.data')
        // console.table(payload.data);
        // console.groupEnd('UpdateEditor!!! YA!! payload.data');
        const response = yield axios.patch(`http://localhost:4200/editor/${payload.data.id}`, payload.data);
        const responseData = yield response.data;
        console.group('UpdateEditor responseData')
        console.table(responseData)
        console.groupEnd('UpdateEditor responseData')
        yield put({
            type: UPDATE_EDITOR_SUCCESS,
            payload: null
        })
    } catch (error) {
        yield put({
            type: UPDATE_EDITOR_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

// DELETE
function* DeleteEditor(payload) {
    try {
        console.group('DeleteEditor!!! YA!! payload.data')
        console.table(payload.data);
        console.groupEnd('DeleteEditor!!! YA!! payload.data');
        const response = yield axios.delete(`http://localhost:4200/editor/${payload.data}`);
        const responseData = yield response.data;
        console.group('DeleteEditor responseData')
        console.table(responseData)
        console.groupEnd('DeleteEditor responseData')
        yield put({
            type: DELETE_EDITOR_SUCCESS,
            payload: null
        })
    } catch (error) {
        yield put({
            type: DELETE_EDITOR_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

function* reGetEditorList() {
    yield GetEditorTitleList()
}


function* watchAddEditorSaga() {
    while (true) {
        const { payload } = yield take(ADD_EDITOR)
        yield AddEditor(payload)
    }
}

function* watchUpdateEditorSaga() {
    while (true) {
        const { payload } = yield take(UPDATE_EDITOR)
        yield UpdateEditor(payload)
    }
}

function* watchDeleteEditorSaga() {
    while (true) {
        const { payload } = yield take(DELETE_EDITOR)
        yield DeleteEditor(payload)
    }
}

function* mySaga() {
    yield all([
        takeEvery(ADD_EDITOR_SUCCESS, reGetEditorList),
        takeEvery(REQUEST_EDITOR, GetEditorTitleList),
        takeEvery(REQUEST_EDITOR_BY_TITLE, GetEditorByID),
        watchUpdateEditorSaga(),
        watchAddEditorSaga(),
        watchDeleteEditorSaga(),
    ])
}

export default mySaga;