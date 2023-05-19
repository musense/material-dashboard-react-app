import { all, put, take, takeEvery } from 'redux-saga/effects';
import * as GetClassAction from "../../actions/GetClassAction";
import { instance } from "./AxiosInstance";

function toFrontendData(responseData) {
    return {
        _id: responseData._id,
        content: {
            title: responseData.title,
            // content: responseData.content,
            content: `[{"type":"paragraph","children":[{"text":"Wilson完整測試資料2","bold":true}]},
            {"type":"paragraph","children":[{"bold":true,"text":"Wilson完整測試資料2","italic":true}]},
            {"type":"paragraph","children":[{"bold":true,"italic":true,"text":"Wilson完整測試資料2","underline":true}]},
            {"type":"paragraph","children":[{"bold":true,"italic":true,"underline":true,"text":"Wilson完整測試資料2","code":true}]},
            {"type":"h1","children":[{"bold":true,"italic":true,"underline":true,"text":"Wilson完整測試資料2"}]}]`,
        },
        tags: responseData.tags.map(tag => ({
            value: tag._id,
            label: tag.name,
        }
        )),
        classifications: responseData.categories.map(cat => ({
            value: cat._id,
            label: cat.name,
        }
        )),
        // classifications: responseData.categories.map(cat => ({
        //     value: cat._id,
        //     label: cat.name,
        // }
        // )),
        webHeader: {
            title: responseData.headTitle || '',
            description: responseData.headDescription || '',
            keywords: responseData.headKeyword || '',
            customUrl: responseData.headKeyword || '',
        },
        media: {
            banner: responseData.homeImagePath || '',
            thumbnail: responseData.contentImagePath || '',
            altText: responseData.altText || '',
        },
        setTop: responseData.top || false,
        hide: responseData.hidden || false,
    }
}

function toBackendData(requestData) {
    const request = {
        name: requestData.classification,
        upperCategory: requestData.parentClassification,
        headTitle: requestData.webHeader.title,
        headDescription: requestData.webHeader.description,
        headKeyword: requestData.webHeader.keywords,
        manualUrl: requestData.webHeader.href,
    }
    if (!requestData._id) return request
    const _id = requestData._id;
    return { _id, request }
}

function foFrontEndCatDate(responseData) {
    if (!Array.isArray(responseData)) return
    const dataArray = responseData.map(data => ({
        _id: data._id,
        name: data.name,
    }))
    return dataArray
}

// function* GetAllClassList() {
//     try {
//         const response = yield instance.get(`/categories`);
//         const classList = yield response.data.data;
//         const mappedClassList = foFrontEndCatDate(classList)
//         // return
//         yield put({
//             type: GetClassAction.REQUEST_ALL_CLASS_LIST_SUCCESS,
//             payload: mappedClassList
//         })
//     } catch (error) {
//         yield put({
//             type: GetClassAction.REQUEST_ALL_CLASS_LIST_FAIL,
//             errorMessage: error.message,
//             payload: null
//         })
//     }
// }
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
                    parentClass: item.upperCategory,
                    title: item.headTitle ? item.headTitle : '',
                    description: item.headDescription ? item.headDescription : '',
                    keywords: item.headKeyword ? item.headKeyword : '',
                    customUrl: item.sitemapUrl,
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
        yield put({
            type: GetClassAction.REQUEST_CLASS_LIST_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}
function* GetClassByTitle(payload) {
    try {
        const response = yield instance.get(`/editor/${payload.data.id}`);
        const responseData = yield response.data;
        yield put({
            type: GetClassAction.REQUEST_CLASS_LIST_SUCCESS,
            payload: responseData,
        })
    } catch (error) {
        yield put({
            type: GetClassAction.REQUEST_CLASS_FAIL,
            errorMessage: error.message,
            payload: null
        })
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
        yield put({
            type: GetClassAction.REQUEST_CLASS_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}
// function* generateID() {
//     let id = 0;
//     while (true) {
//         yield id++;
//     }
// }
// const idGenerator = generateID();
// POST
function* AddClass(payload) {

    try {

        const requestData = toBackendData(payload.data)
        // return
        const response = yield instance.post(`/categories`, requestData);
        const responseData = yield response.data.data;
        // return
        yield put({
            type: GetClassAction.ADD_CLASS_SUCCESS,
            payload: responseData
        })

    } catch (error) {
        yield put({
            type: GetClassAction.ADD_CLASS_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

// PATCH
function* UpdateClass(payload) {
    try {
        const { _id, request: requestData } = toBackendData(payload.data)
        const response = yield instance.patch(`/categories/${_id}`, requestData);
        const responseData = yield response.data.data;

        // return
        yield put({
            type: GetClassAction.EDIT_CLASS_SUCCESS,
            payload: responseData
        })
    } catch (error) {
        yield put({
            type: GetClassAction.EDIT_CLASS_FAIL,
            payload: null
        })
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
        yield put({
            type: GetClassAction.DELETE_CLASS_FAIL,
            errorMessage: error.message,
            payload: null
        })
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
// function* watchGetAllClassList() {
//     while (true) {
//         const { payload } = yield take(GetClassAction.REQUEST_All_CLASS_LIST)
//         yield GetAllClassList(payload)
//     }
// }



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