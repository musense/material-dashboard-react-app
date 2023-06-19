import { all, put, take, takeEvery } from 'redux-saga/effects';
import * as GetEditorAction from "../../actions/GetEditorAction";
import { formInstance, instance } from "./AxiosInstance";
import { toBackendData, toBackendFormData, toFrontendData } from "./../apiHelperFunc";
import { errorMessage } from '../../reducers/errorMessage';

// GET
function* GetEditorTitleList(payload = 1) {
    const nowTime = new Date();

    try {
        const response = yield instance.get(`/editor?limit=10000&pageNumber=${payload}`);
        const { currentPage, totalCount, data: responseData } = yield response.data
        console.log("🚀 ~ file: GetEditorList.js:13 ~ function*GetEditorTitleList ~ currentPage, totalCount, data: responseData:", { currentPage, totalCount, responseData })

        // const titleList = toFrontendData(titleViewListFakeData)
        const titleList = toFrontendData(responseData)
        console.log("🚀 ~ file: GetEditorList.js:422 ~ function*GetEditorTitleList ~ titleList:", titleList)
        yield put({
            type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_SUCCESS,
            payload: {
                titleList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(currentPage),
            }
        })
    } catch (error) {
        yield put({
            type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

function* GetEditorTitleListByPageNumber(payload) {
    const nowTime = new Date();

    try {
        const response = yield instance.get(`/editor?limit=10&pageNumber=${payload}`);
        const { currentPage, totalCount, data: responseData } = yield response.data
        console.log("🚀 ~ file: GetEditorList.js:13 ~ function*GetEditorTitleList ~ currentPage, totalCount, data: responseData:", { currentPage, totalCount, responseData })

        // const titleList = toFrontendData(titleViewListFakeData)
        const titleList = toFrontendData(responseData)
        console.log("🚀 ~ file: GetEditorList.js:422 ~ function*GetEditorTitleList ~ titleList:", titleList)
        yield put({
            type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_SUCCESS,
            payload: {
                titleList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(currentPage),
            }
        })
    } catch (error) {
        yield put({
            type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

// GET :_id
function* GetEditorByID(_id) {
    try {

        // const response = yield instance.get(`/editor/${payload.data._id}`);
        const response = yield instance.get(`/editor/${_id}`);
        const responseData = yield response.data;
        // console.log("🚀 ~ file: GetEditorList.js:30 ~ function*GetEditorByID ~ responseData:", responseData)
        // return
        const mappedEditorData = toFrontendData(responseData)
        // console.log("🚀 ~ file: GetEditorList.js:53 ~ function*GetEditorByID ~ mappedEditorData:", mappedEditorData)
        // return
        yield put({
            type: GetEditorAction.REQUEST_EDITOR_SUCCESS,
            payload: mappedEditorData,
        })
    } catch (error) {
        yield put({
            type: GetEditorAction.REQUEST_EDITOR_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

/// /editor?
/// title=${title}
/// category=${category}
/// startDate=${startDate}
/// endDate=${endDate}
function* SearchEditor(payload) {
    try {

        const titleString = payload.title ? `title=${payload.title}&` : ''
        const categoryString = payload.classification ? `category=${payload.classification}&` : ''
        const startDateString = payload.createDate
            ? payload.createDate.startDate
                ? `startDate=${payload.createDate.startDate}&`
                : ''
            : ''
        const endDateString = payload.createDate
            ? payload.createDate.endDate
                ? `endDate=${payload.createDate.endDate}&`
                : ''
            : ''
        const response = yield instance.get(`/editor?${titleString}${categoryString}${startDateString}${endDateString}limit=10000&pageNumber=1`);
        console.log("🚀 ~ file: GetEditorList.js:72 ~ function*SearchEditor ~ response:", response)
        const { currentPage, totalCount, data: responseData } = yield response.data
        console.log("🚀 ~ file: GetEditorList.js:72 ~ function*SearchEditor ~ responseData:", responseData)
        const titleList = toFrontendData(responseData)
        // return
        yield put({
            type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_SUCCESS,
            payload: {
                titleList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(currentPage),
            }
        })
    } catch (error) {
        yield put({
            type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

// POST
function* AddEditor(payload) {
    try {
        console.log("🚀 ~ file: GetEditorList.js:940 ~ function*AddEditor ~ payload:", payload)
        const requestFormData = toBackendFormData(payload.data)
        console.log("🚀 ~ file: GetEditorList.js:943 ~ function*AddEditor ~ requestData:", requestFormData)
        // return
        let response
        if (typeof requestFormData.get('contentImagePath') === 'object') {
            response = yield formInstance.post(`/editor`, requestFormData);
        } else if (typeof requestFormData.get('contentImagePath') === 'string') {
            response = yield instance.post(`/editor`, requestFormData);
        }
        const editor = yield response.data;
        const mappedEditorData = toFrontendData(editor)

        yield put({
            type: GetEditorAction.ADD_EDITOR_SUCCESS,
            payload:{
                editor: mappedEditorData,
            }
        })

    } catch (error) {
        yield put({
            type: GetEditorAction.ADD_EDITOR_FAIL,
            errorMessage: error.message,
        })
    }
}

// POST
function* PreviewEditor(payload) {
    try {
        console.log("🚀 ~ file: GetEditorList.js:940 ~ function*PreviewEditor ~ payload:", payload)
        const requestFormData = toBackendFormData(payload.data)
        console.log("🚀 ~ file: GetEditorList.js:943 ~ function*PreviewEditor ~ requestData:", requestFormData)
        // return
        let response
        if (typeof requestFormData.get('contentImagePath') === 'object') {
            response = yield formInstance.post(`/tempEditor`, requestFormData);
        } else if (typeof requestFormData.get('contentImagePath') === 'string') {
            response = yield instance.post(`/tempEditor`, requestFormData);
        }
        const { id: previewID } = yield response.data.data;
        console.log("🚀 ~ file: GetEditorList.js:173 ~ function*PreviewEditor ~ previewID:", previewID)

        // return
        yield put({
            type: GetEditorAction.PREVIEW_EDITOR_SUCCESS,
            payload: { previewID },
            errorMessage: errorMessage.addSuccess
        })

    } catch (error) {
        yield put({
            type: GetEditorAction.PREVIEW_EDITOR_FAIL,
            errorMessage: error.message,
        })
    }
}

// PATCH
function* UpdateEditor(payload) {
    console.log("🚀 ~ file: GetEditorList.js:72 ~ function*UpdateEditor ~ payload:", payload)
    // return

    try {
        console.log("🚀 ~ file: GetEditorList.js:117 ~ function*UpdateEditor ~ payload:", payload)
        const requestFormData = toBackendFormData(payload.data)
        console.log("🚀 ~ file: GetEditorList.js:123 ~ function*UpdateEditor ~ requestFormData:", Object.fromEntries(requestFormData))
        // return
        let response
        if (typeof requestFormData.get('contentImagePath') === 'object') {
            response = yield formInstance.patch(`/editor/${payload.id}`, requestFormData);
        } else if (typeof requestFormData.get('contentImagePath') === 'string') {
            response = yield instance.patch(`/editor/${payload.id}`, requestFormData);
        }
        const { message } = yield response.data;
        console.log("🚀 ~ file: GetEditorList.js:177 ~ function*UpdateEditor ~ message:", message)
        yield put({
            type: GetEditorAction.UPDATE_EDITOR_SUCCESS,
            payload: { message }
        })
    } catch (error) {
        yield put({
            type: GetEditorAction.UPDATE_EDITOR_FAIL,
            errorMessage: error.message,
        })
    }
}

// DELETE
function* DeleteEditor(payload) {
    try {
        console.log("🚀 ~ file: GetEditorList.js:172 ~ function*DeleteEditor ~ payload:", payload)
        const data = {
            'ids': payload
        }
        const response = yield instance.delete(`/editor/bunchDeleteByIds`, {
            "data": data
        });
        const responseData = yield response.data.data;
        yield put({
            type: GetEditorAction.DELETE_EDITOR_SUCCESS,
            payload: responseData
        })
    } catch (error) {
        yield put({
            type: GetEditorAction.DELETE_EDITOR_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

function* watchAddEditorSaga() {
    while (true) {
        const { payload } = yield take(GetEditorAction.ADD_EDITOR)
        yield AddEditor(payload)
    }
}

function* watchPreviewEditorSaga() {
    while (true) {
        const { payload } = yield take(GetEditorAction.PREVIEW_EDITOR)
        yield PreviewEditor(payload)
    }
}
function* watchGetEditorTitleListSaga() {
    while (true) {
        const { payload } = yield take(GetEditorAction.REQUEST_EDITOR)
        yield GetEditorTitleList(payload)
    }
}

function* watchUpdateEditorSaga() {
    while (true) {
        const { payload } = yield take(GetEditorAction.UPDATE_EDITOR)
        yield UpdateEditor(payload)
    }
}

function* watchSearchEditorSaga() {
    while (true) {
        const { payload } = yield take(GetEditorAction.SEARCH_EDITOR_LIST)
        yield SearchEditor(payload)
    }
}

function* watchDeleteEditorSaga() {
    while (true) {
        const { payload } = yield take(GetEditorAction.BUNCH_DELETE_EDITOR)
        yield DeleteEditor(payload)
    }
}

function* watchGetEditorByIDSaga() {
    while (true) {
        const { payload } = yield take(GetEditorAction.REQUEST_EDITOR_BY_ID)
        yield GetEditorByID(payload.data._id)
    }
}

function* mySaga() {
    yield all([
        // takeEvery(GetEditorAction.ADD_EDITOR_SUCCESS, reGetEditorList),
        // takeEvery(GetEditorAction.REQUEST_EDITOR, GetEditorTitleList),
        watchUpdateEditorSaga(),
        watchPreviewEditorSaga(),
        watchGetEditorTitleListSaga(),
        watchSearchEditorSaga(),
        watchAddEditorSaga(),
        watchDeleteEditorSaga(),
        watchGetEditorByIDSaga()
    ])
}

export default mySaga;