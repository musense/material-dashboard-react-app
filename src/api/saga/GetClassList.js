import { all, put, take, takeEvery } from 'redux-saga/effects';
import * as GetClassAction from "../../actions/GetClassAction";
import { instance } from "./AxiosInstance";
import { getErrorMessage, getGetErrorMessage } from '../apiHelperFunc';


function toBackendData(requestData) {
    const request = {
        name: requestData.classification,
        keyName: requestData.keyName,
        upperCategory: requestData.parentClassification,
        headTitle: requestData.webHeader.title,
        headDescription: requestData.webHeader.description,
        headKeyword: requestData.webHeader.keywords,
        manualUrl: requestData.webHeader.route,
    }
    if (!requestData._id) return request
    const _id = requestData._id;
    return { _id, request }
}

// GET
function* GetClassList(payload = 1) {
    try {
        const response = yield instance.get(`/categories?limit=10000&pageNumber=${payload}`);
        const { currentPage, totalCount, data: classList } = yield response.data
        const mappedClassList = classList.map(
            (item) => {
                return {
                    _id: item._id,
                    name: item.name,
                    keyName: item.keyName || '',
                    parentClass: item.upperCategory,
                    title: item.headTitle || '',
                    description: item.headDescription || '',
                    keywords: item.headKeyword || '',
                    customUrl: item.sitemapUrl,
                    manualUrl: item.manualUrl || '',
                }
            })
        // return
        yield put({
            type: GetClassAction.REQUEST_CLASS_LIST_SUCCESS,
            payload: {
                editorClassList: mappedClassList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(currentPage),
            }
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetClassAction.REQUEST_CLASS_LIST_FAIL)
    }
}

//* Get Categories by parent class
function* GetCategories() {
    try {
        const response = yield instance.get(`/categories/upper_category`);
        const responseData = yield response.data.data;
        const responseMap = new Map()
        for (const [key, value] of Object.entries(responseData)) {
            responseMap.set(key, value)
        }
        // return
        yield put({
            type: GetClassAction.REQUEST_CLASS_SUCCESS,
            payload: responseMap,
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetClassAction.REQUEST_CLASS_FAIL)
    }
}

// POST
function* AddClass(payload) {
    const { tempData } = payload
    try {

        const requestData = toBackendData(tempData)

        // return
        const response = yield instance.post(`/categories`, requestData);
        const responseData = yield response.data.data;
        // return
        yield put({
            type: GetClassAction.ADD_CLASS_SUCCESS,
            payload: responseData
        })

    } catch (error) {
        yield getErrorMessage(error, GetClassAction.ADD_CLASS_FAIL)
    }
}

// PATCH
function* UpdateClass(payload) {
    // const { _id, ...rest: tempData } = payload
    try {
        const { _id, request: requestData } = toBackendData(payload)
        const response = yield instance.patch(`/categories/${_id}`, requestData);
        const responseData = yield response.data.data;

        // return
        yield put({
            type: GetClassAction.EDIT_CLASS_SUCCESS,
            payload: responseData
        })
    } catch (error) {
        yield getErrorMessage(error, GetClassAction.EDIT_CLASS_FAIL)
    }
}

// DELETE
function* DeleteClass(payload) {
    try {
        const data = {
            'ids': payload
        }
        const response = yield instance.delete(`/categories/bunchDeleteByIds`, {
            "data": data
        });
        const responseData = yield response.data.data;
        yield put({
            type: GetClassAction.DELETE_CLASS_SUCCESS,
            payload: responseData
        })
    } catch (error) {
        yield getErrorMessage(error, GetClassAction.DELETE_CLASS_FAIL)
    }
}


function* watchAddClassSaga() {
    while (true) {
        const { payload } = yield take(GetClassAction.ADD_CLASS)
        yield AddClass(payload)
    }
}

function* watchUpdateClassSaga() {
    while (true) {
        const { payload } = yield take(GetClassAction.EDIT_SAVING_CLASS)
        yield UpdateClass(payload)
    }
}

function* watchDeleteClassSaga() {
    while (true) {
        const { payload } = yield take(GetClassAction.BUNCH_DELETE_CLASS)
        yield DeleteClass(payload)
    }
}

function* watchGetClassList() {
    while (true) {
        const { payload } = yield take(GetClassAction.REQUEST_CLASS_LIST)
        yield GetClassList(payload)
    }
}


function* mySaga() {
    yield all([
        watchGetClassList(),
        // watchGetAllClassList(),
        watchAddClassSaga(),
        watchUpdateClassSaga(),
        // takeEvery(ADD_CLASS_SUCCESS, reGetClassList),
        takeEvery(GetClassAction.REQUEST_PARENT_CLASS, GetCategories),
        // watchUpdateClassSaga(),
        watchDeleteClassSaga(),
        // watchGetClassByTitleSaga()
    ])
}

export default mySaga;