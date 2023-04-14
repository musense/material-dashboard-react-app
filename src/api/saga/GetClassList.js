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
        name: requestData.classification.label,
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
function foFrontEndCatDate(responseData){
    if (!Array.isArray(responseData)) return
    const dataArray = responseData.map(data => ({
        _id: data._id,
        name: data.name,
    }))
    return dataArray
}
const categoryListFakeData= [
    {
      "_id": "642aa34c4cddf3fc26095177",
      "name": "旅遊",
      "createdAt": "2023-04-03T09:58:36.978Z",
      "updatedAt": "2023-04-03T09:58:36.978Z",
      "upperCategory": "Uncategorized"
    },
    {
      "_id": "642d21e2f832e4ee0d43b3eb",
      "name": "旅遊1",
      "createdAt": "2023-04-05T07:23:14.549Z",
      "updatedAt": "2023-04-13T09:13:07.355Z",
      "upperCategory": "Uncategorized",
      "headDescription": "head描述",
      "headKeyword": "head關鍵字",
      "headTitle": "head標題"
    },
    {
      "_id": "642d2e5fb759cbf448205670",
      "name": "旅遊5",
      "createdAt": "2023-04-05T08:16:31.929Z",
      "updatedAt": "2023-04-05T08:16:31.929Z",
      "upperCategory": "Travel"
    },
    {
      "_id": "642e432b24147bf0c87bb72a",
      "name": "旅遊6",
      "createdAt": "2023-04-06T03:57:31.702Z",
      "updatedAt": "2023-04-06T03:57:31.702Z",
      "upperCategory": "Travel"
    },
    {
      "_id": "642f77fa0af17d7f45dbfe14",
      "name": "旅遊15",
      "createdAt": "2023-04-07T01:55:06.239Z",
      "updatedAt": "2023-04-07T01:55:06.239Z",
      "upperCategory": "Uncategorized"
    },
    {
      "_id": "642ff9a273fa0496a2feb294",
      "name": "旅遊16",
      "createdAt": "2023-04-07T11:08:18.548Z",
      "updatedAt": "2023-04-07T11:08:18.548Z",
      "upperCategory": "Uncategorized"
    },
    {
      "_id": "64311f67c6cf6b518ebae17f",
      "name": "旅遊18",
      "createdAt": "2023-04-08T08:01:43.519Z",
      "updatedAt": "2023-04-08T08:01:43.519Z",
      "upperCategory": "Uncategorized"
    },
    {
      "_id": "6433c80d0eb8afb2aa4b3b35",
      "name": "博弈",
      "upperCategory": "Uncategorized",
      "createdAt": "2023-04-10T08:25:49.599Z",
      "updatedAt": "2023-04-10T08:25:49.599Z"
    },
    {
      "_id": "6434c54e8f23156c8ec524d4",
      "headTitle": "head標題",
      "headKeyword": "head關鍵字",
      "headDescription": "head描述",
      "name": "測試資料post",
      "upperCategory": "upper test",
      "originalUrl": "http://127.0.0.1",
      "manualUrl": "http://127.0.0.1",
      "createdAt": "2023-04-11T02:26:22.535Z",
      "updatedAt": "2023-04-11T02:26:22.535Z"
    },
    {
      "_id": "6434d683756e9c6d76f3e237",
      "name": "測試",
      "upperCategory": "Uncategorized",
      "createdAt": "2023-04-11T03:39:47.960Z",
      "updatedAt": "2023-04-11T03:39:47.960Z"
    }
  ]

function* GetAllClassList(){
    try {
        const response = yield instance.get(`/categories`);
        const classList = yield response.data.data;
        const mappedClassList = foFrontEndCatDate(classList)
        console.log("🚀 ~ file: GetClassList.js:156 ~ function*GetAllClassList ~ mappedClassList:", mappedClassList)

        // return
        yield put({
            type: GetClassAction.REQUEST_ALL_CLASS_LIST_SUCCESS,
            payload: mappedClassList
        })
    } catch (error) {
        yield put({
            type: GetClassAction.REQUEST_ALL_CLASS_LIST_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}
// GET
function* GetClassList(payload = 1) {
    // console.log("🚀 ~ file: GetClassList.js:7 ~ function*GetClassList ~ payload:", payload)
    try {
        const response = yield instance.get(`/categories?pageNumber=${payload}`);
        const classList = yield response.data.data;
       
        const mappedClassList = classList.map(
            (item) => {
                return {
                    _id: item._id,
                    classifications: item.name,
                    parentClass: item.upperCategory,
                    title: item.headTitle ? item.headTitle : '',
                    description: item.headDescription ? item.headDescription : '',
                    keywords: item.headKeyword ? item.headKeyword : '',
                    customUrl: item.manualUrl ? item.manualUrl : `${item.upperCategory}/${item.name}`,
                }
            })
        console.log("🚀 ~ file: GetClassList.js:191 ~ function*GetClassList ~ mappedClassList:", mappedClassList)
        // return
        yield put({
            type: GetClassAction.REQUEST_CLASS_LIST_SUCCESS,
            payload: mappedClassList
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

        // console.log("🚀 ~ file: GetClassList.js:62 ~ function*GetCategories ~ responseMap:", responseMap)
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
        // console.log("🚀 ~ file: GetClassList.js:146 ~ function*AddClass ~ requestData:", requestData)
        // return
        const response = yield instance.post(`/categories`, requestData);
        const responseData = yield response.data.data;
        // console.log("🚀 ~ file: GetClassList.js:150 ~ function*AddClass ~ responseData:", responseData)

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
        console.log("🚀 ~ file: GetClassList.js:174 ~ function*UpdateClass ~ _id:", _id)
        console.log("🚀 ~ file: GetClassList.js:146 ~ function*UpdateClass ~ requestData:", requestData)
        return
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
        const response = yield instance.delete(`/editor/bunchDeleteByIds`, {
            "ids": payload.data.ids
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

// function* reGetClassList() {
//     yield GetClassList()
// }


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

// function* watchDeleteClassSaga() {
//     while (true) {
//         const { payload } = yield take(GetClassAction.DELETE_CLASS)
//         yield DeleteClass(payload)
//     }
// }

function* watchGetClassList() {
    while (true) {
        const { payload } = yield take(GetClassAction.REQUEST_CLASS_LIST)
        yield GetClassList(payload)
    }
}
function* watchGetAllClassList() {
    while (true) {
        const { payload } = yield take(GetClassAction.REQUEST_All_CLASS_LIST)
        yield GetAllClassList(payload)
    }
}



function* mySaga() {
    yield all([
        watchGetClassList(),
        watchGetAllClassList(),
        watchAddClassSaga(),
        watchUpdateClassSaga(),
        // takeEvery(ADD_CLASS_SUCCESS, reGetClassList),
        takeEvery(GetClassAction.REQUEST_PARENT_CLASS, GetCategories),
        // watchUpdateClassSaga(),
        // watchDeleteClassSaga(),
        // watchGetClassByTitleSaga()
    ])
}

export default mySaga;