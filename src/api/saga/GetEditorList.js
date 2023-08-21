import { all, put, take, takeEvery } from 'redux-saga/effects';
import * as GetEditorAction from "../../actions/GetEditorAction";
import * as GetSlateAction from "../../actions/GetSlateAction";
import { formInstance, instance } from "./AxiosInstance";
import { toBackendFormData, toFrontendData } from "./../apiHelperFunc";
import { errorMessage } from '../../reducers/errorMessage';
import dayjs from 'dayjs';
import { getErrorMessage, getGetErrorMessage } from '../apiHelperFunc';

// GET
function* GetEditorTitleList(payload = 1) {
    try {
        const startDate = new Date(`${dayjs().subtract(3, 'month').format('YYYY-MM-DD')} 00:00:00`).getTime()
        const endDate = new Date(`${dayjs().format('YYYY-MM-DD')} 23:59:59`).getTime()
        const response = instance.get(encodeURI(`/editor?limit=10000&startDate=${startDate}&endDate=${endDate}&pageNumber=${payload}&status=全部`));
        const responseDraft = instance.get(encodeURI(`/editor?limit=10000&startDate=${startDate}&endDate=${endDate}&pageNumber=${payload}&status=草稿`));
        const responseData = yield Promise.all([response, responseDraft]).then(res => {
            const resData = res.reduce((acc, curr) => {
                return [...acc, curr.data.data]
            }, [])
            return resData.flat()
        })
        responseData.sort((data1, data2) => new Date(data2.updatedAt) - new Date(data1.updatedAt))
        const totalCount = parseInt(responseData.length)

        const titleList = toFrontendData(responseData)
        yield put({
            type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_SUCCESS,
            payload: {
                titleList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(1),
            }
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetEditorAction.REQUEST_EDITOR_TITLE_LIST_FAIL)
    }
}

// GET :_id
function* GetEditorByID(payload) {
    const { data } = payload
    try {
        // const response = yield instance.get(`/editor/${payload.data._id}`);

        const response = yield instance.get(`/editor/${data}`);
        const responseData = yield response.data;
        // return
        const mappedEditorData = toFrontendData(responseData)
        // return
        yield put({
            type: GetEditorAction.REQUEST_EDITOR_SUCCESS,
            payload: mappedEditorData,
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetEditorAction.REQUEST_EDITOR_FAIL)
    }
}

/// /editor?
/// title=${title}
/// category=${category}
/// startDate=${startDate}
/// endDate=${endDate}
// GET
function* SearchEditor(payload) {
    const {
        title,
        categories: categoryName,
        status: statusName,
        createDate,
    } = payload

    const {
        startDate,
        endDate
    } = createDate

    try {
        const startDateToSeconds = new Date(`${dayjs(startDate).format('YYYY-MM-DD')} 00:00:00`).getTime()
        const endDateToSeconds = new Date(`${dayjs(endDate).format('YYYY-MM-DD')} 23:59:59`).getTime()

        const titleString = title ? `title=${title}&` : ''
        const categoryString = categoryName ? `category=${categoryName}&` : ''
        const status = statusName ? `status=${statusName}&` : ''
        const startDateString = `startDate=${startDateToSeconds}&`
        const endDateString = `endDate=${endDateToSeconds}&`


        const response = yield instance.get(encodeURI(`/editor?${titleString}${categoryString}${startDateString}${endDateString}${status}limit=10000&pageNumber=1`));
        let promiseArray = [response]
        if (statusName === '草稿' || statusName === '全部') {
            const responseDraft = instance.get(encodeURI(`/editor?${titleString}${categoryString}${startDateString}${endDateString}status=草稿&limit=10000&pageNumber=1`));
            promiseArray = [
                ...promiseArray,
                responseDraft
            ]
        }

        const responseData = yield Promise.all(promiseArray).then(res => {
            const resData = res.reduce((acc, curr) => {
                return [...acc, curr.data.data]
            }, [])
            return resData.flat()
        })

        responseData.sort((data1, data2) => new Date(data2.updatedAt) - new Date(data1.updatedAt))
        const totalCount = parseInt(responseData.length)

        const titleList = toFrontendData(responseData)
        // return
        yield put({
            type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_SUCCESS,
            payload: {
                titleList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(1),
            }
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetEditorAction.REQUEST_EDITOR_TITLE_LIST_FAIL)
    }
}

// POST
function* AddEditor(payload) {
    try {
        const { data, draft } = payload
        let response
        const requestFormData = toBackendFormData(data, 'add_new')
        // return
        if (!draft) {
            //* 不是草稿時執行以下程式
            if (typeof requestFormData.get('contentImagePath') === 'object') {
                response = yield formInstance.post(`/editor`, requestFormData);
            } else if (typeof requestFormData.get('contentImagePath') === 'string') {
                response = yield instance.post(`/editor`, requestFormData);
            } else {
                response = yield instance.post(`/editor`, requestFormData);
            }
        } else {
            //* 是草稿時執行以下程式
            if (typeof requestFormData.get('contentImagePath') === 'object') {
                response = yield formInstance.post(`/draftEditor`, requestFormData);
            } else if (typeof requestFormData.get('contentImagePath') === 'string') {
                response = yield instance.post(`/draftEditor`, requestFormData);
            } else {
                response = yield instance.post(`/editor`, requestFormData);
            }
        }

        const editor = yield response.data;
        const mappedEditorData = toFrontendData(editor)

        yield put({
            type: GetEditorAction.ADD_EDITOR_SUCCESS,
            payload: {
                _id: mappedEditorData._id,
                editor: mappedEditorData,
            }
        })

    } catch (error) {
        yield getErrorMessage(error, GetEditorAction.ADD_EDITOR_FAIL)
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
            type: GetSlateAction.PREVIEW_EDITOR_SUCCESS,
            payload: {
                previewID: previewID
            },
            errorMessage: errorMessage.addSuccess
        })

    } catch (error) {
        yield getErrorMessage(error, GetSlateAction.PREVIEW_EDITOR_FAIL)
    }
}

// PATCH
function* UpdateEditor(payload) {
    // return
    const { id, data } = payload
    try {
        const requestFormData = toBackendFormData(data, 'update')
        // return
        let response
        if (typeof requestFormData.get('contentImagePath') === 'object') {
            response = yield formInstance.patch(`/editor/${id}`, requestFormData);
        } else if (typeof requestFormData.get('contentImagePath') === 'string') {
            response = yield instance.patch(`/editor/${id}`, requestFormData);
        }
        const { message } = yield response.data;
        yield put({
            type: GetEditorAction.UPDATE_EDITOR_SUCCESS,
            payload: { message }
        })
    } catch (error) {
        yield getErrorMessage(error, GetEditorAction.UPDATE_EDITOR_FAIL)
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
            type: GetEditorAction.DELETE_EDITOR_SUCCESS,
            payload: responseData

        })
    } catch (error) {
        yield getErrorMessage(error, GetEditorAction.DELETE_EDITOR_FAIL)
    }
}

function* AuthUser(patchSuccessType, patchFailType) {
    try {
        const authResponse = yield instance.post(`/editor/verifyUser`);;
        const message = yield authResponse.data.message;
        yield put({
            type: patchSuccessType,
            payload: {
                errorMessage: message
            }
        })
    } catch (error) {
        yield getErrorMessage(error, patchFailType)
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
        const { payload } = yield take(GetSlateAction.PREVIEW_EDITOR)
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
        yield AuthUser(GetEditorAction.AUTH_USER_SUCCESS, GetEditorAction.AUTH_USER_FAIL)
        yield GetEditorByID(payload)
    }
}

function* watchAddNewEditorAuth() {
    while (true) {
        yield take(GetEditorAction.ADD_NEW_EDITOR)
        yield AuthUser(GetEditorAction.AUTH_USER_SUCCESS, GetEditorAction.AUTH_USER_FAIL)
    }
}

function* mySaga() {
    yield all([
        watchUpdateEditorSaga(),
        watchPreviewEditorSaga(),
        watchGetEditorTitleListSaga(),
        watchSearchEditorSaga(),
        watchAddEditorSaga(),
        watchDeleteEditorSaga(),
        watchGetEditorByIDSaga(),
        watchAddNewEditorAuth()
    ])
}

export default mySaga;