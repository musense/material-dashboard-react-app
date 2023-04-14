import { all, put, take, takeEvery } from 'redux-saga/effects';
import * as GetTagsAction from "../../actions/GetTagsAction";
import { instance } from "./AxiosInstance";



// GET
function* GetTagList() {
    try {
        const response = yield instance.get(`/tags`);
        const tagList = yield response.data.data;
        // console.log("🚀 ~ file: GetTagList.js:14 ~ function*GetTagList ~ tagList:", tagList)
        const tagMapped = tagList.map(tag => ({
            _id: tag._id,
            name: tag.name,
        }))
        // console.log("🚀 ~ file: GetTagList.js:19 ~ tagMapped ~ tagMapped:", tagMapped)
        // return
        yield put({
            type: GetTagsAction.REQUEST_TAG_SUCCESS,
            payload: tagMapped,
        })
    } catch (error) {
        yield put({
            type: GetTagsAction.GET_TAG_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

// POST
function* AddTag(payload) {
    try {

        const response = yield instance.post(`/tags/`, payload.data);
        const responseData = yield response.data.data;
        yield put({
            type: GetTagsAction.ADD_TAG_SUCCESS,
            payload: null
        })
    } catch (error) {
        yield put({
            type: GetTagsAction.ADD_TAG_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

// PATCH
function* UpdateTag(payload) {
    try {
        const response = yield instance.patch(`/tags/${payload.data.id}`, payload.data);
        const tagList = yield response.data.data;
        yield put({
            type: GetTagsAction.UPDATE_TAG_SUCCESS,
            payload: tagList
        })
    } catch (error) {
        yield put({
            type: GetTagsAction.UPDATE_TAG_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

// DELETE
function* DeleteTag(payload) {
    try {
        const response = yield instance.delete(`/tags/${payload.data}`);
        const tagList = yield response.data.data;
        yield put({
            type: GetTagsAction.DELETE_TAG_SUCCESS,
            payload: tagList
        })
    } catch (error) {
        yield put({
            type: GetTagsAction.DELETE_TAG_FAIL,
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
        type: GetTagsAction.REQUEST_TAG_STAGE
    })
}

function* watchAddTagSaga() {
    while (true) {
        const { payload } = yield take(GetTagsAction.ADD_TAG)
        // yield setErrorMessageNull()
        yield AddTag(payload)
    }
}

function* watchUpdateTagSaga() {
    while (true) {
        const { payload } = yield take(GetTagsAction.UPDATE_TAG)
        // yield setErrorMessageNull()
        yield UpdateTag(payload)
    }
}

function* watchDeleteTagSaga() {
    while (true) {
        const { payload } = yield take(GetTagsAction.DELETE_TAG)
        // yield setErrorMessageNull()
        yield DeleteTag(payload)
    }
}

function* mySaga() {
    yield all([
        takeEvery(GetTagsAction.ADD_TAG_SUCCESS, reGetTagList),
        takeEvery(GetTagsAction.REQUEST_TAG, GetTagList),
        watchUpdateTagSaga(),
        watchAddTagSaga(),
        watchDeleteTagSaga(),
    ])
}

export default mySaga;