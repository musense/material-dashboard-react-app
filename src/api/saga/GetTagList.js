import { all, put, take, takeEvery } from 'redux-saga/effects';
import * as GetTagsAction from "../../actions/GetTagsAction";
import { instance } from "./AxiosInstance";
import { getErrorMessage, getGetErrorMessage } from '../apiHelperFunc';

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
            popular: item.popular,
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
            popular: responseData.popular,
        }
    }
}

export function toBackendData(requestData) {
    return {
        _id: requestData._id,
        name: requestData.name,
        sorting: requestData.sorting !== '' ? requestData.sorting : null,
        popular: requestData.popular,
        headTitle: requestData.webHeader.headTitle,
        headKeyword: requestData.webHeader.keywords,
        headDescription: requestData.webHeader.description,
        manualUrl: requestData.webHeader.route,
    }
}

function* GetPopularTagList() {
    try {

        const response = yield instance.get(`/tags/getPopularTags`);
        const { currentPage, totalCount, data: responseData } = yield response.data
        const tagList = toFrontendData(responseData)
        yield put({
            type: GetTagsAction.REQUEST_POPULAR_TAG_SUCCESS,
            payload: {
                tagList
            },
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetTagsAction.REQUEST_POPULAR_TAG_FAIL)
    }
}

function* GetTagList(payload = 1) {
    try {

        const promise1 = instance.get(`/tags/getMaxTagNumber`);
        // const maxTagNumber = yield response.data

        const promise2 = yield instance.get(`/tags?limit=100000&pageNumber=${payload}`);
        // const { currentPage, totalCount, data: responseData } = yield response.data

        const {
            nextSorting,
            resData,
            totalCount,
            currentPage
        } = yield Promise.all([promise1, promise2]).then(res => {
            const nextSorting = res[0].data.maxTagNumber
            const { data: responseData, totalCount, currentPage } = res[1].data
            const resData = responseData.map((tag, index) => {
                return {
                    ...tag,
                    sorting: tag.popular === false ? nextSorting + index : tag.sorting,
                }
            })
            return {
                nextSorting,
                resData,
                totalCount,
                currentPage
            }
        })

        const tagList = toFrontendData(resData)
        yield put({
            type: GetTagsAction.REQUEST_TAG_SUCCESS,
            payload: {
                tagList,
                totalCount: parseInt(totalCount),
                currentPage: parseInt(currentPage),
                nextSorting,
            },
        })
    } catch (error) {
        yield getGetErrorMessage(error, GetTagsAction.GET_TAG_FAIL)
    }
}

/// /tag?
/// name=${name}
/// startDate=${startDate}
/// endDate=${endDate}
function* SearchTag(payload) {

    const { title, createDate } = payload
    try {

        const titleString = title ? `name=${title}&` : ''
        const startDateString = createDate
            ? createDate.startDate
                ? `startDate=${new Date(createDate.startDate).getTime()}&`
                : ''
            : ''
        const endDateString = createDate
            ? createDate.endDate
                ? `endDate=${new Date(createDate.endDate).getTime()}&`
                : ''
            : ''
        const response = yield instance.get(`/tags?limit=10000&pageNumber=1&${titleString}${startDateString}${endDateString}`);
        const { currentPage, totalCount, data: responseData } = yield response.data
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
        yield getGetErrorMessage(error, GetTagsAction.GET_TAG_FAIL)
    }
}

// POST
function* AddTag(payload) {
    const { data } = payload
    try {
        const requestData = toBackendData(data)
        // return
        const response = yield instance.post(`/tags`, requestData);
        const responseData = yield response.data;
        yield put({
            type: GetTagsAction.ADD_TAG_SUCCESS,
            payload: null
        })
    } catch (error) {
        yield getErrorMessage(error, GetTagsAction.ADD_TAG_FAIL)
    }
}

// PATCH
function* UpdateTag(payload) {
    try {
        const { _id, ...data } = payload;
        const requestData = toBackendData(data)

        const response = yield instance.patch(`/tags/${_id}`, requestData);
        const { updateTag } = yield response.data;
        console.log("🚀 ~ file: GetTagList.js:183 ~ function*UpdateTag ~ response.data:", response.data)
        console.log("🚀 ~ file: GetTagList.js:183 ~ function*UpdateTag ~ updateTag:", updateTag)
        yield put({
            type: GetTagsAction.UPDATE_TAG_SUCCESS,
            payload: { updateTag: toFrontendData(updateTag) }
        })
    } catch (error) {
        yield getErrorMessage(error, GetTagsAction.UPDATE_TAG_FAIL)
    }
}

// DELETE
function* DeleteTag(payload) {
    try {
        const data = {
            'ids': payload
        }


        const response = yield instance.delete(`/tags/bunchDeleteByIds`, {
            "data": data
        });
        const responseData = yield response.data.data;
        yield put({
            type: GetTagsAction.DELETE_TAG_SUCCESS,
            payload: responseData
        })
    } catch (error) {
        yield getErrorMessage(error, GetTagsAction.DELETE_TAG_FAIL)
    }
}

function* watchGetTagListSaga() {
    while (true) {
        const { payload } = yield take(GetTagsAction.REQUEST_TAG)
        yield GetTagList(payload)
    }
}

function* watchGetPopularTagListSaga() {
    while (true) {
        const { payload } = yield take(GetTagsAction.REQUEST_POPULAR_TAG)
        yield GetPopularTagList(payload)
    }
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
        watchGetPopularTagListSaga(),
        watchSearchTagSaga(),
        watchGetTagListSaga(),
        watchUpdateTagSaga(),
        watchAddTagSaga(),
        watchDeleteTagSaga(),
    ])
}

export default mySaga;