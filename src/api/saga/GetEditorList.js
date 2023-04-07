import { all, put, take, takeEvery } from 'redux-saga/effects';
import {
    ADD_EDITOR, ADD_EDITOR_FAIL, ADD_EDITOR_SUCCESS, DELETE_EDITOR, DELETE_EDITOR_FAIL, DELETE_EDITOR_SUCCESS, REQUEST_EDITOR, REQUEST_EDITOR_BY_TITLE, REQUEST_EDITOR_FAIL, REQUEST_EDITOR_SUCCESS, REQUEST_EDITOR_TITLE_LIST_FAIL, REQUEST_EDITOR_TITLE_LIST_SUCCESS, UPDATE_EDITOR, UPDATE_EDITOR_FAIL, UPDATE_EDITOR_SUCCESS
} from "../../actions/GetEditorAction";
import { instance } from "./AxiosInstance";

// GET
function* GetEditorTitleList() {
    try {
        const response = yield instance.get(`/editor/title`);
        const titleList = yield response.data;
        yield put({
            type: REQUEST_EDITOR_TITLE_LIST_SUCCESS,
            payload: titleList,
        })
    } catch (error) {
        yield put({
            type: REQUEST_EDITOR_TITLE_LIST_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}
function* GetEditorByTitle(payload) {
    try {
        const response = yield instance.get(`/editor/${payload.data.id}`);
        const responseData = yield response.data;
        yield put({
            type: REQUEST_EDITOR_SUCCESS,
            payload: responseData,
        })
    } catch (error) {
        yield put({
            type: REQUEST_EDITOR_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

function* generateID() {
    let id = 0;
    while (true) {
        yield id++;
    }
}
const idGenerator = generateID();
// POST
function* AddEditor(payload) {

    try {
        const _id = idGenerator.next().value;
        console.log("🚀 ~ file: GetEditorList.js:53 ~ function*AddEditor ~ _id:", _id)
        // const response = yield instance.post(`/editor`, payload.data);
        localStorage.setItem(`content_${_id}`, JSON.stringify(payload.data));
        const response = localStorage.getItem(`content_${_id}`)
        // const responseData = yield response.data;
        yield put({
            type: ADD_EDITOR_SUCCESS,
            payload: response
        })

    } catch (error) {
        yield put({
            type: ADD_EDITOR_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

// PATCH
function* UpdateEditor(payload) {
    try {
        const response = yield instance.patch(`/editor/${payload.id}`, payload.data);
        const responseData = yield response.data;
        yield put({
            type: UPDATE_EDITOR_SUCCESS,
            payload: responseData
        })
    } catch (error) {
        yield put({
            type: UPDATE_EDITOR_FAIL,
            payload: null
        })
    }
}

// DELETE
function* DeleteEditor(payload) {
    try {
        const response = yield instance.delete(`/editor/bunchDeleteByIds`, {
            "ids": payload.data.ids
        });
        const responseData = yield response.data;
        yield put({
            type: DELETE_EDITOR_SUCCESS,
            payload: responseData
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

function* watchGetEditorByTitleSaga() {
    while (true) {
        const { payload } = yield take(REQUEST_EDITOR_BY_TITLE)
        yield GetEditorByTitle(payload)
    }
}

function* mySaga() {
    yield all([
        takeEvery(ADD_EDITOR_SUCCESS, reGetEditorList),
        takeEvery(REQUEST_EDITOR, GetEditorTitleList),
        watchUpdateEditorSaga(),
        watchAddEditorSaga(),
        watchDeleteEditorSaga(),
        watchGetEditorByTitleSaga()
    ])
}

export default mySaga;