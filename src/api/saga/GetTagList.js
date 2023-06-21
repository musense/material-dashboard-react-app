import { all, put, take, takeEvery } from 'redux-saga/effects';
import * as GetTagsAction from "../../actions/GetTagsAction";
import { instance } from "./AxiosInstance";

export function toFrontendData(responseData) {
    if (Array.isArray(responseData)) {
        return responseData.map(item => ({
            _id: item._id,
            name: item.name,
            sorting: item.sorting,
            webHeader: {
                title: item.headTitle || '',
                description: item.headDescription || '',
                keywords: item.headKeyword || '',
                customUrl: item.sitemapUrl || '',
                manualUrl: item.manualUrl || '',
            },
            pageView: item.pageView,
            createDate: item.createdAt || '',
            isHot: item.popular || false,
        })

        )
    }
    else {
        return {
            _id: responseData._id,
            name: responseData.name,
            sorting: responseData.sorting,
            webHeader: {
                title: responseData.headTitle || '',
                description: responseData.headDescription || '',
                keywords: responseData.headKeyword || '',
                customUrl: responseData.sitemapUrl || '',
                manualUrl: responseData.manualUrl || '',
            },
            pageView: responseData.pageView,
            createDate: responseData.createdAt || '',
            isHot: responseData.popular || '',
        }
    }
}

export function toBackendData(requestData) {
    return {
        _id: requestData._id,
        name: requestData.name,
        sorting: requestData.sorting,
        popular: requestData.isHot,
        headTitle: requestData.webHeader.title,
        headKeyword: requestData.webHeader.keywords,
        headDescription: requestData.webHeader.description,
        manualUrl: requestData.webHeader.route,
    }
}

function* GetTagList(payload = 1) {
    try {

        const response = yield instance.get(`/tags?limit=100000&pageNumber=${payload}`);
        const { currentPage, totalCount, data: responseData } = yield response.data
        const tagList = toFrontendData(responseData)
        // console.log("🚀 ~ file: GetTagList.js:44 ~ function*GetTagList ~ tagList:", tagList)
        // const tagList = yield response.data;
        // console.log("🚀 ~ file: GetTagList.js:14 ~ function*GetTagList ~ tagList:", tagList)

        // console.log("🚀 ~ file: GetTagList.js:19 ~ tagMapped ~ tagMapped:", tagMapped)
        // return
        yield put({
            type: GetTagsAction.REQUEST_TAG_SUCCESS,
            payload: {
                tagList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(currentPage),
            },
        })
    } catch (error) {
        yield put({
            type: GetTagsAction.GET_TAG_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

/// /tag?
/// name=${name}
/// startDate=${startDate}
/// endDate=${endDate}
function* SearchTag(payload) {
    try {

        const nameString = payload.title ? `name=${payload.title}&` : ''
        const startDateString = payload.createDate
            ? payload.createDate.startDate
                ? `startDate=${new Date(payload.createDate.startDate).getTime()}&`
                : ''
            : ''
        const endDateString = payload.createDate
            ? payload.createDate.endDate
                ? `endDate=${new Date(payload.createDate.endDate).getTime()}&`
                : ''
            : ''
        const response = yield instance.get(`/tags?${nameString}${startDateString} ${endDateString}`);
        // console.log("🚀 ~ file: GetEditorList.js:72 ~ function*SearchEditor ~ response:", response)
        const { currentPage, totalCount, data: responseData } = yield response.data
        // console.log("🚀 ~ file: GetEditorList.js:72 ~ function*SearchEditor ~ responseData:", responseData)
        const tagList = toFrontendData(responseData)
        // return
        yield put({
            type: GetTagsAction.REQUEST_TAG_SUCCESS,
            payload: {
                tagList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(currentPage),
            }
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
        const requestData = toBackendData(payload.data)
        // console.log("🚀 ~ file: GetTagList.js:131 ~ function*AddTag ~ requestDate:", requestData)
        // return
        const response = yield instance.post(`/tags`, requestData);
        const responseData = yield response.data;
        yield put({
            type: GetTagsAction.ADD_TAG_SUCCESS,
            payload: null
        })
    } catch (error) {
        // console.log("🚀 ~ file: GetTagList.js:140 ~ function*AddTag ~ error:", error)
        yield put({
            type: GetTagsAction.ADD_TAG_FAIL,
            errorMessage: error.message
        })
    }
}

// PATCH
function* UpdateTag(payload) {
    try {
        const { _id, ...data } = payload.data;
        const requestData = toBackendData(data)
        // console.log("🚀 ~ file: GetTagList.js:55 ~ function*UpdateTag ~ _id:", { _id })
        // console.log("🚀 ~ file: GetTagList.js:55 ~ function*UpdateTag ~ data:", { data })
        // console.log("🚀 ~ file: GetTagList.js:55 ~ function*UpdateTag ~ requestData:", { requestData })

        const response = yield instance.patch(`/tags/${_id}`, requestData);
        const tagList = yield response.data;
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
        const data = {
            'ids': payload
        }
        // console.log("🚀 ~ file: GetTagList.js:175 ~ function*DeleteTag ~ data:", data)
     
        
        const response = yield instance.delete(`/tags/bunchDeleteByIds`,{
            "data": data
        });
        const responseData = yield response.data.data;
        yield put({
            type: GetTagsAction.DELETE_TAG_SUCCESS,
            payload: responseData
        })
    } catch (error) {
        yield put({
            type: GetTagsAction.DELETE_TAG_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

function* watchGetTagListSaga() {
    while (true) {
        const { payload } = yield take(GetTagsAction.REQUEST_TAG)
        yield GetTagList(payload)
    }
}
function* reGetTagList() {
    yield GetTagList()
}


function* watchAddTagSaga() {
    while (true) {
        const { payload } = yield take(GetTagsAction.ADD_TAG)
        yield AddTag(payload)
    }
}

function* watchSearchTagSaga() {
    while (true) {
        const { payload } = yield take(GetTagsAction.SEARCH_TAG_LIST)
        yield SearchTag(payload)
    }
}

function* watchUpdateTagSaga() {
    while (true) {
        const { payload } = yield take(GetTagsAction.EDIT_SAVING_TAG)
        yield UpdateTag(payload)
    }
}

function* watchDeleteTagSaga() {
    while (true) {
        const { payload } = yield take(GetTagsAction.BUNCH_DELETE_TAG)
        yield DeleteTag(payload)
    }
}

function* mySaga() {
    yield all([
        // takeEvery(GetTagsAction.ADD_TAG_SUCCESS, reGetTagList),
        watchSearchTagSaga(),
        watchGetTagListSaga(),
        watchUpdateTagSaga(),
        watchAddTagSaga(),
        watchDeleteTagSaga(),
    ])
}

export default mySaga;