import { all, put, take, takeEvery } from 'redux-saga/effects';
import * as GetEditorAction from "../../actions/GetEditorAction";
import { instance } from "./AxiosInstance";

const categories = [
    { _id: '642d2e5fb759cbf448205670', name: '旅遊5' },
    { _id: '642f77fa0af17d7f45dbfe14', name: '旅遊15' },
    { _id: '64311f67c6cf6b518ebae17f', name: '旅遊18' },
    { _id: '6434d683756e9c6d76f3e237', name: '測試' },
]

const editorListFakeData = [
    {
        "_id": "642ffbf294886defad5e6a07",
        "serialNumber": "1",
        "title": "測試文章標題16",
        "content": [
            "{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試文章內容16\"}]}"
        ],
        "tags": [],
        "pageView": 5000,
        "topSorting": null,
        "hidden": false,
        "recommendSorting": 6,
        "popularSorting": null,
        "homeImagePath": "http://10.88.0.106:3000/images/homepage/testtest-1681197418420.png",
        "contentImagePath": "http://10.88.0.106:3000/images/content/testtest-1681197418420.png",
        "altText": "東京自由行",
        "createdAt": "2023-04-07T11:18:10.707Z",
        "updatedAt": "2023-04-07T11:18:10.707Z",
        "__v": 0,
        "categories": [
            {
                "_id": "642ff9a273fa0496a2feb294",
                "name": "旅遊16"
            },
            {
                "_id": "642f77fa0af17d7f45dbfe14",
                "name": "旅遊15"
            },
            {
                "_id": "642f77fa0af17d7f45dbfe11",
                "name": "旅遊15"
            },
            {
                "_id": "642f77fa0af17d7f45dbfe12",
                "name": "旅遊15"
            },
            {
                "_id": "642f77fa0af17d7f45dbfe13",
                "name": "旅遊15"
            },
            {
                "_id": "642f77fa0af17d7f45dbfe19",
                "name": "旅遊15"
            },
            {
                "_id": "642f77fa0af17d7f45dbfe10",
                "name": "旅遊15"
            },
            {
                "_id": "642f77fa0af17d7f45dbfe55",
                "name": "旅遊15"
            },
        ]
    },
    {
        "_id": "642f77fa0af17d7f45dbfe16",
        "serialNumber": "2",
        "title": "測試文章標題15",
        "content": [
            "{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試文章內容15\"}]}"
        ],
        "tags": [

        ],
        "pageView": 499,
        "topSorting": null,
        "hidden": false,
        "recommendSorting": 2,
        "popularSorting": null,
        "homeImagePath": "http://10.88.0.106:3000/images/homepage/testtest-1681197418420.png",
        "contentImagePath": "http://10.88.0.106:3000/images/content/testtest-1681197418420.png",
        "altText": "北海道自由行",
        "createdAt": "2023-04-07T01:55:06.472Z",
        "updatedAt": "2023-04-07T01:55:06.472Z",
        "__v": 0,
        "categories": [
            {
                "_id": "642f77fa0af17d7f45dbfe14",
                "name": "旅遊15"
            }
        ]
    },
    {
        "_id": "642eaab11be0e0964e407d3e",
        "serialNumber": "3",
        "title": "測試標題14",
        "content": [
            "{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試內文6\"}]}"
        ],
        "tags": [
            {
                "_id": "642e432b24147bf0c87bb723",
                "name": "賭博2"
            },
            {
                "_id": "642e432b24147bf0c87bb727",
                "name": "賭博1"
            },
            {
                "_id": "642e432b24147bf0c87bb725",
                "name": "賭博3"
            }
        ],
        "pageView": 687,
        "topSorting": null,
        "hidden": false,
        "recommendSorting": null,
        "popularSorting": 1,
        "createdAt": "2023-04-06T11:19:13.058Z",
        "updatedAt": "2023-04-06T11:19:13.058Z",
        "__v": 0,
        "categories": [
            {
                "_id": "642e432b24147bf0c87bb72a",
                "name": "旅遊6"
            }
        ]
    },
    {
        "_id": "642e6dcac6d0b49204e7bae6",
        "serialNumber": "4",
        "title": "測試標題13",
        "content": [
            "{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試內文6\"}]}"
        ],
        "tags": [
            {
                "_id": "642e432b24147bf0c87bb723",
                "name": "賭博2"
            },
            {
                "_id": "642e432b24147bf0c87bb727",
                "name": "賭博1"
            },
            {
                "_id": "642e432b24147bf0c87bb725",
                "name": "賭博3"
            }
        ],
        "pageView": 13,
        "topSorting": 2,
        "hidden": false,
        "recommendSorting": null,
        "popularSorting": null,
        "createdAt": "2023-04-06T06:59:22.302Z",
        "updatedAt": "2023-04-06T06:59:22.302Z",
        "__v": 0,
        "categories": [
            {
                "_id": "642e432b24147bf0c87bb72a",
                "name": "旅遊6"
            }
        ]
    },
    {
        "_id": "642e5f38d0c6ced8b53eb2b4",
        "serialNumber": "5",
        "title": "測試標題12",
        "content": [
            "{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試內文6\"}]}"
        ],
        "tags": [
            {
                "_id": "642e432b24147bf0c87bb727",
                "name": "賭博1"
            },
            {
                "_id": "642e432b24147bf0c87bb723",
                "name": "賭博2"
            },
            {
                "_id": "642e432b24147bf0c87bb725",
                "name": "賭博3"
            }
        ],
        "pageView": 12,
        "frontend_url": 0,
        "topSorting": 0,
        "hidden": false,
        "recommendSorting": null,
        "popularSorting": null,
        "createdAt": "2023-04-06T05:57:12.931Z",
        "updatedAt": "2023-04-06T05:57:12.931Z",
        "__v": 0,
        "categories": [
            {
                "_id": "642e432b24147bf0c87bb72a",
                "name": "旅遊6"
            }
        ]
    },
    {
        "_id": "642e5f073821ec84537e15eb",
        "serialNumber": "6",
        "title": "測試標題11",
        "content": [
            "{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試內文6\"}]}"
        ],
        "tags": [
            {
                "_id": "642e432b24147bf0c87bb723",
                "name": "賭博2"
            },
            {
                "_id": "642e432b24147bf0c87bb727",
                "name": "賭博1"
            },
            {
                "_id": "642e432b24147bf0c87bb725",
                "name": "賭博3"
            }
        ],
        "pageView": 11,
        "frontend_url": 0,
        "topSorting": null,
        "hidden": false,
        "recommendSorting": 0,
        "popularSorting": null,
        "createdAt": "2023-04-06T05:56:23.780Z",
        "updatedAt": "2023-04-06T05:56:23.780Z",
        "__v": 0,
        "categories": [
            {
                "_id": "642e432b24147bf0c87bb72a",
                "name": "旅遊6"
            }
        ]
    },
    {
        "_id": "642e5ee2a3491faabbef8c6d",
        "serialNumber": "7",
        "title": "測試標題10",
        "content": [
            "{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試內文6\"}]}"
        ],
        "tags": [
            {
                "_id": "642e432b24147bf0c87bb727",
                "name": "賭博1"
            },
            {
                "_id": "642e432b24147bf0c87bb723",
                "name": "賭博2"
            },
            {
                "_id": "642e432b24147bf0c87bb725",
                "name": "賭博3"
            }
        ],
        "pageView": 789,
        "frontend_url": 0,
        "topSorting": null,
        "hidden": false,
        "recommendSorting": null,
        "popularSorting": 2,
        "createdAt": "2023-04-06T05:55:46.287Z",
        "updatedAt": "2023-04-06T05:55:46.287Z",
        "__v": 0,
        "categories": [
            {
                "_id": "642e432b24147bf0c87bb72a",
                "name": "旅遊6"
            }
        ]
    },
    {
        "_id": "642e5e5f5e9b0cd3328515f3",
        "serialNumber": "8",
        "title": "測試標題9",
        "content": [
            "{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試內文6\"}]}"
        ],
        "tags": [
            {
                "_id": "642e432b24147bf0c87bb723",
                "name": "賭博2"
            },
            {
                "_id": "642e432b24147bf0c87bb727",
                "name": "賭博1"
            },
            {
                "_id": "642e432b24147bf0c87bb725",
                "name": "賭博3"
            }
        ],
        "pageView": 78,
        "frontend_url": 0,
        "topSorting": null,
        "hidden": false,
        "recommendSorting": 11,
        "popularSorting": null,
        "createdAt": "2023-04-06T05:53:35.287Z",
        "updatedAt": "2023-04-06T05:53:35.287Z",
        "__v": 0,
        "categories": [
            {
                "_id": "642e432b24147bf0c87bb72a",
                "name": "旅遊6"
            }
        ]
    },
    {
        "_id": "642e5e2be6474967cd177d88",
        "serialNumber": "9",
        "title": "測試標題8",
        "content": [
            "{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試內文6\"}]}"
        ],
        "tags": [
            {
                "_id": "642e432b24147bf0c87bb727",
                "name": "賭博1"
            },
            {
                "_id": "642e432b24147bf0c87bb723",
                "name": "賭博2"
            },
            {
                "_id": "642e432b24147bf0c87bb725",
                "name": "賭博3"
            }
        ],
        "pageView": 66,
        "topSorting": null,
        "hidden": false,
        "recommendSorting": null,
        "popularSorting": null,
        "createdAt": "2023-04-06T05:52:43.921Z",
        "updatedAt": "2023-04-06T05:52:43.921Z",
        "__v": 0,
        "categories": [
            {
                "_id": "642e432b24147bf0c87bb72a",
                "name": "旅遊6"
            }
        ]
    },
    {
        "_id": "642e5952920397b3e83d1813",
        "serialNumber": "10",
        "title": "測試標題7",
        "content": [
            "{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試內文6\"}]}"
        ],
        "tags": [
            {
                "_id": "642e432b24147bf0c87bb727",
                "name": "賭博1"
            },
            {
                "_id": "642e432b24147bf0c87bb723",
                "name": "賭博2"
            },
            {
                "_id": "642e432b24147bf0c87bb725",
                "name": "賭博3"
            }
        ],
        "pageView": 0,
        "topSorting": null,
        "hidden": false,
        "recommendSorting": null,
        "popularSorting": 4,
        "createdAt": "2023-04-06T05:32:02.874Z",
        "updatedAt": "2023-04-06T05:32:02.874Z",
        "__v": 0,
        "categories": [
            {
                "_id": "642e432b24147bf0c87bb72a",
                "name": "旅遊6"
            }
        ]
    }
]

function toFrontendData(responseData) {
    if (Array.isArray(responseData)) {
        return responseData.map(item => ({
            _id: item._id,
            serialNumber: item.serialNumber,
            content: {
                title: item.title,
                content: item.content
            },
            sorting: {
                isNews: {
                    get: () => item.topSorting ? true : false,
                    newsSorting: item.topSorting,
                },
                isHot: {
                    get: () => item.popularSorting ? true : false,
                    hotSorting: item.popularSorting,
                },
                isRecommend: {
                    get: () => item.recommendSorting ? true : false,
                    recommendSorting: item.recommendSorting,
                },
            },
            tags: item.tags && item.tags.length > 0
                ? item.tags.map(tag => ({
                    value: tag._id,
                    label: tag.name,
                }
                ))
                : [],
            classifications: item.categories && item.categories.length > 0
                ? item.categories.map(cat => ({
                    value: cat._id,
                    label: cat.name,
                }
                ))
                : [],
            webHeader: {
                title: item.headTitle || '',
                description: item.headDescription || '',
                keywords: item.headKeyword || '',
                customUrl: item.manualUrl || '',
            },
            media: {
                banner: item.homeImagePath || '',
                thumbnail: item.contentImagePath || '',
                altText: item.altText || '',
            },
            pageView: item.pageView,
            hide: item.hidden || false,
            createDate: item.createdAt || '',
        })

        )
    }
    else {
        return {
            _id: responseData._id,
            serialNumber: responseData.serialNumber,
            content: {
                title: responseData.title,
                content: responseData.content
            },
            sorting: {
                isNews: {
                    get: () => responseData.topSorting ? true : false,
                    newsSorting: responseData.topSorting,
                },
                isHot: {
                    get: () => responseData.popularSorting ? true : false,
                    hotSorting: responseData.popularSorting,
                },
                isRecommend: {
                    get: () => responseData.recommendSorting ? true : false,
                    recommendSorting: responseData.recommendSorting,
                },
            },
            tags: responseData.tags && responseData.tags.length > 0
                ? responseData.tags.map(tag => ({
                    value: tag._id,
                    label: tag.name,
                }
                ))
                : [],
            classifications: responseData.categories && responseData.categories.length > 0
                ? responseData.categories.map(cat => ({
                    value: cat._id,
                    label: cat.name,
                }
                ))
                : [],
            webHeader: {
                title: responseData.headTitle || '',
                description: responseData.headDescription || '',
                keywords: responseData.headKeyword || '',
                customUrl: responseData.manualUrl || '',
            },
            media: {
                banner: responseData.homeImagePath || '',
                thumbnail: responseData.contentImagePath || '',
                altText: responseData.altText || '',
            },
            pageView: responseData.pageView,
            hide: responseData.hidden || false,
            createDate: responseData.createdAt || '',
        }
    }
}

function toBackendData(requestData) {
    return {
        headTitle: requestData.webHeader.title,
        headKeyword: requestData.webHeader.keywords,
        headDescription: requestData.webHeader.description,
        title: requestData.content.title,
        content: requestData.content.content,
        categories: requestData.classifications,
        manualUrl: requestData.webHeader.href,
        altText: requestData.media.altText,
        tags: requestData.tags,
        top: requestData.setTop,
        hidden: requestData.hide,
        homeImagePath: requestData.media.banner,
    }
}
// GET
function* GetEditorTitleList() {
    const nowTime = new Date();
    const today = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate(), '23', '59', '59');
    const lastMonthDay = new Date(nowTime.getFullYear(), nowTime.getMonth() - 1, nowTime.getDate())
    console.log("🚀 ~ file: GetEditorList.js:519 ~ function*GetEditorTitleList ~ nextWeekDay:", lastMonthDay)
    console.log("🚀 ~ file: GetEditorList.js:518 ~ function*GetEditorTitleList ~ today:", today)
    try {
        const response = yield instance.get(`/editor?startDate=${lastMonthDay}&endDate=${today}&pageNumber=1`);
        const responseData = yield response.data.data;
        //! using test mock data 
        // let titleList = []
        // editorListFakeData.map(editor => {
        const titleList = toFrontendData(responseData)
        // })
        console.log("🚀 ~ file: GetEditorList.js:422 ~ function*GetEditorTitleList ~ titleList:", titleList)
        yield put({
            type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_SUCCESS,
            payload: titleList,
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
        _id = '6435113b213b1da0cda94d90'
        // const response = yield instance.get(`/editor/${payload.data._id}`);
        const response = yield instance.get(`/editor/${_id}`);
        const responseData = yield response.data.data;
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

///
///
function* SearchEditor(payload) {
    try {
        const {
            title,
            classification,
            createDate
        } = payload

        const titleString = payload.title ? `title=${payload.title}&` : ''
        const categoryString =
            payload.classification.length > 0
                ? payload.classification[0] === null
                    ? ''
                    : `category=${classification[0].label}&` : ''
        const startDateString = createDate ? `startDate=${createDate.startDate.toString()}&` : ''
        const endDateString = createDate ? `endDate=${createDate.endDate.toString()}&` : ''
        const response = yield instance.get(`/editor?${titleString}${categoryString} ${startDateString} ${endDateString}`);
        const responseData = yield response.data.data;
        // console.log("🚀 ~ file: GetEditorList.js:30 ~ function*GetEditorByID ~ responseData:", responseData)
        // return
        const mappedEditorData = toFrontendData(responseData)
        console.log("🚀 ~ file: GetEditorList.js:530 ~ function*SearchEditor ~ mappedEditorData:", mappedEditorData)
        // return
        yield put({
            type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_SUCCESS,
            payload: mappedEditorData,
        })
    } catch (error) {
        yield put({
            type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_FAIL,
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
        // console.log("🚀 ~ file: GetEditorList.js:91 ~ function*AddEditor ~ payload:", payload)
        const requestData = toBackendData(payload.data)
        console.log("🚀 ~ file: GetEditorList.js:114 ~ function*AddEditor ~ requestData:", requestData)
        return
        const response = yield instance.post(`/editor`, requestData);
        const responseData = yield response.data.data;

        yield put({
            type: GetEditorAction.ADD_EDITOR_SUCCESS,
            payload: responseData
        })

    } catch (error) {
        yield put({
            type: GetEditorAction.ADD_EDITOR_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

// PATCH
function* UpdateEditor(payload) {
    // console.log("🚀 ~ file: GetEditorList.js:72 ~ function*UpdateEditor ~ payload:", payload)
    // return

    try {

        const response = yield instance.patch(`/editor/${payload.id}`, payload.data);
        const responseData = yield response.data.data;
        yield put({
            type: GetEditorAction.UPDATE_EDITOR_SUCCESS,
            payload: responseData
        })
    } catch (error) {
        yield put({
            type: GetEditorAction.UPDATE_EDITOR_FAIL,
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

function* reGetEditorList() {
    yield GetEditorTitleList()
}


function* watchAddEditorSaga() {
    while (true) {
        const { payload } = yield take(GetEditorAction.ADD_EDITOR)
        yield AddEditor(payload)
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
        const { payload } = yield take(GetEditorAction.DELETE_EDITOR)
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
        takeEvery(GetEditorAction.ADD_EDITOR_SUCCESS, reGetEditorList),
        takeEvery(GetEditorAction.REQUEST_EDITOR, GetEditorTitleList),
        watchUpdateEditorSaga(),
        watchSearchEditorSaga(),
        watchAddEditorSaga(),
        watchDeleteEditorSaga(),
        watchGetEditorByIDSaga()
    ])
}

export default mySaga;