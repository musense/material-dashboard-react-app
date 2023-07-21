import { all, put, take, takeEvery } from 'redux-saga/effects';
import * as GetEditorAction from "../../actions/GetEditorAction";
import { formInstance, instance } from "./AxiosInstance";
import { toBackendData, toBackendFormData, toFrontendData } from "./../apiHelperFunc";
import { errorMessage } from '../../reducers/errorMessage';

// GET
function* GetEditorTitleList(payload = 1) {
    const nowTime = new Date();

    try {
        const response = instance.get(`/editor?limit=10000&pageNumber=${payload}`);
        const responseDraft = instance.get(encodeURI(`/editor?limit=10000&pageNumber=${payload}&status=草稿`));
        const responseData = yield Promise.all([response, responseDraft]).then(res => {
            const resData = res.reduce((acc, curr) => {
                return [...acc, curr.data.data]
            }, [])
            return resData.flat()
        })
        console.log("🚀 ~ file: GetEditorList.js:15 ~ function*GetEditorTitleList ~ responseData:", responseData)
        responseData.sort((data1, data2) => new Date(data2.updatedAt) - new Date(data1.updatedAt))
        const totalCount = parseInt(responseData.length)

        const titleList = toFrontendData(responseData)
        console.log("🚀 ~ file: GetEditorList.js:422 ~ function*GetEditorTitleList ~ titleList:", titleList)
        yield put({
            type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_SUCCESS,
            payload: {
                titleList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(1),
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
        // const titleList = toFrontendData(titleViewListFakeData)
        const titleList = toFrontendData(responseData)
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
        // return
        const mappedEditorData = toFrontendData(responseData)
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
        const status = payload.status ? `status=${payload.status}&` : ''
        const response = yield instance.get(encodeURI(`/editor?${titleString}${categoryString}${startDateString}${endDateString}${status}limit=10000&pageNumber=1`));
        const { currentPage, totalCount, data: responseData } = yield response.data
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
        const { draft } = payload
        let response
        const requestFormData = toBackendFormData(payload.data)
        if (!draft) {
            //* 不是草稿時執行以下程式
            if (typeof requestFormData.get('contentImagePath') === 'object') {
                response = yield formInstance.post(`/editor`, requestFormData);
            } else if (typeof requestFormData.get('contentImagePath') === 'string') {
                response = yield instance.post(`/editor`, requestFormData);
            }
        } else {
            //* 是草稿時執行以下程式
            if (typeof requestFormData.get('contentImagePath') === 'object') {
                response = yield formInstance.post(`/draftEditor`, requestFormData);
            } else if (typeof requestFormData.get('contentImagePath') === 'string') {
                response = yield instance.post(`/draftEditor`, requestFormData);
            }
        }

        const editor = yield response.data;
        const mappedEditorData = toFrontendData(editor)

        yield put({
            type: GetEditorAction.ADD_EDITOR_SUCCESS,
            payload: {
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
        const requestFormData = toBackendFormData(payload.data)
        // return
        let response
        if (typeof requestFormData.get('contentImagePath') === 'object') {
            response = yield formInstance.post(`/tempEditor`, requestFormData);
        } else if (typeof requestFormData.get('contentImagePath') === 'string') {
            response = yield instance.post(`/tempEditor`, requestFormData);
        }
        const { id: previewID } = yield response.data.data;
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
    // return

    try {
        const requestFormData = toBackendFormData(payload.data)
        // return
        let response
        if (typeof requestFormData.get('contentImagePath') === 'object') {
            response = yield formInstance.patch(`/editor/${payload.id}`, requestFormData);
        } else if (typeof requestFormData.get('contentImagePath') === 'string') {
            response = yield instance.patch(`/editor/${payload.id}`, requestFormData);
        }
        const { message } = yield response.data;
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
        const data = {
            'ids': payload
        }
        const response = yield instance.delete(`/editor/bunchDeleteByIds`, {
            "data": data
        });
        const responseData = yield response.data.data;
        yield put({
            type   : GetEditorAction.DELETE_EDITOR_SUCCESS,
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