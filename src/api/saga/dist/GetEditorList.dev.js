"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _effects = require("redux-saga/effects");

var GetEditorAction = _interopRequireWildcard(require("../../actions/GetEditorAction"));

var _AxiosInstance = require("./AxiosInstance");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(GetEditorTitleList),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(GetEditorByID),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(SearchEditor),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(generateID),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(AddEditor),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(UpdateEditor),
    _marked7 =
/*#__PURE__*/
regeneratorRuntime.mark(DeleteEditor),
    _marked8 =
/*#__PURE__*/
regeneratorRuntime.mark(reGetEditorList),
    _marked9 =
/*#__PURE__*/
regeneratorRuntime.mark(watchAddEditorSaga),
    _marked10 =
/*#__PURE__*/
regeneratorRuntime.mark(watchUpdateEditorSaga),
    _marked11 =
/*#__PURE__*/
regeneratorRuntime.mark(watchSearchEditorSaga),
    _marked12 =
/*#__PURE__*/
regeneratorRuntime.mark(watchDeleteEditorSaga),
    _marked13 =
/*#__PURE__*/
regeneratorRuntime.mark(watchGetEditorByIDSaga),
    _marked14 =
/*#__PURE__*/
regeneratorRuntime.mark(mySaga);

var categories = [{
  _id: '642d2e5fb759cbf448205670',
  name: '旅遊5'
}, {
  _id: '642f77fa0af17d7f45dbfe14',
  name: '旅遊15'
}, {
  _id: '64311f67c6cf6b518ebae17f',
  name: '旅遊18'
}, {
  _id: '6434d683756e9c6d76f3e237',
  name: '測試'
}];
var editorListFakeData = [{
  "_id": "642ffbf294886defad5e6a07",
  "serialNumber": "1",
  "title": "測試文章標題16",
  "content": ["{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試文章內容16\"}]}"],
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
  "categories": [{
    "_id": "642ff9a273fa0496a2feb294",
    "name": "旅遊16"
  }, {
    "_id": "642f77fa0af17d7f45dbfe14",
    "name": "旅遊15"
  }, {
    "_id": "642f77fa0af17d7f45dbfe11",
    "name": "旅遊15"
  }, {
    "_id": "642f77fa0af17d7f45dbfe12",
    "name": "旅遊15"
  }, {
    "_id": "642f77fa0af17d7f45dbfe13",
    "name": "旅遊15"
  }, {
    "_id": "642f77fa0af17d7f45dbfe19",
    "name": "旅遊15"
  }, {
    "_id": "642f77fa0af17d7f45dbfe10",
    "name": "旅遊15"
  }, {
    "_id": "642f77fa0af17d7f45dbfe55",
    "name": "旅遊15"
  }]
}, {
  "_id": "642f77fa0af17d7f45dbfe16",
  "serialNumber": "2",
  "title": "測試文章標題15",
  "content": ["{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試文章內容15\"}]}"],
  "tags": [],
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
  "categories": [{
    "_id": "642f77fa0af17d7f45dbfe14",
    "name": "旅遊15"
  }]
}, {
  "_id": "642eaab11be0e0964e407d3e",
  "serialNumber": "3",
  "title": "測試標題14",
  "content": ["{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試內文6\"}]}"],
  "tags": [{
    "_id": "642e432b24147bf0c87bb723",
    "name": "賭博2"
  }, {
    "_id": "642e432b24147bf0c87bb727",
    "name": "賭博1"
  }, {
    "_id": "642e432b24147bf0c87bb725",
    "name": "賭博3"
  }],
  "pageView": 687,
  "topSorting": null,
  "hidden": false,
  "recommendSorting": null,
  "popularSorting": 1,
  "createdAt": "2023-04-06T11:19:13.058Z",
  "updatedAt": "2023-04-06T11:19:13.058Z",
  "__v": 0,
  "categories": [{
    "_id": "642e432b24147bf0c87bb72a",
    "name": "旅遊6"
  }]
}, {
  "_id": "642e6dcac6d0b49204e7bae6",
  "serialNumber": "4",
  "title": "測試標題13",
  "content": ["{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試內文6\"}]}"],
  "tags": [{
    "_id": "642e432b24147bf0c87bb723",
    "name": "賭博2"
  }, {
    "_id": "642e432b24147bf0c87bb727",
    "name": "賭博1"
  }, {
    "_id": "642e432b24147bf0c87bb725",
    "name": "賭博3"
  }],
  "pageView": 13,
  "topSorting": 2,
  "hidden": false,
  "recommendSorting": null,
  "popularSorting": null,
  "createdAt": "2023-04-06T06:59:22.302Z",
  "updatedAt": "2023-04-06T06:59:22.302Z",
  "__v": 0,
  "categories": [{
    "_id": "642e432b24147bf0c87bb72a",
    "name": "旅遊6"
  }]
}, {
  "_id": "642e5f38d0c6ced8b53eb2b4",
  "serialNumber": "5",
  "title": "測試標題12",
  "content": ["{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試內文6\"}]}"],
  "tags": [{
    "_id": "642e432b24147bf0c87bb727",
    "name": "賭博1"
  }, {
    "_id": "642e432b24147bf0c87bb723",
    "name": "賭博2"
  }, {
    "_id": "642e432b24147bf0c87bb725",
    "name": "賭博3"
  }],
  "pageView": 12,
  "frontend_url": 0,
  "topSorting": 0,
  "hidden": false,
  "recommendSorting": null,
  "popularSorting": null,
  "createdAt": "2023-04-06T05:57:12.931Z",
  "updatedAt": "2023-04-06T05:57:12.931Z",
  "__v": 0,
  "categories": [{
    "_id": "642e432b24147bf0c87bb72a",
    "name": "旅遊6"
  }]
}, {
  "_id": "642e5f073821ec84537e15eb",
  "serialNumber": "6",
  "title": "測試標題11",
  "content": ["{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試內文6\"}]}"],
  "tags": [{
    "_id": "642e432b24147bf0c87bb723",
    "name": "賭博2"
  }, {
    "_id": "642e432b24147bf0c87bb727",
    "name": "賭博1"
  }, {
    "_id": "642e432b24147bf0c87bb725",
    "name": "賭博3"
  }],
  "pageView": 11,
  "frontend_url": 0,
  "topSorting": null,
  "hidden": false,
  "recommendSorting": 0,
  "popularSorting": null,
  "createdAt": "2023-04-06T05:56:23.780Z",
  "updatedAt": "2023-04-06T05:56:23.780Z",
  "__v": 0,
  "categories": [{
    "_id": "642e432b24147bf0c87bb72a",
    "name": "旅遊6"
  }]
}, {
  "_id": "642e5ee2a3491faabbef8c6d",
  "serialNumber": "7",
  "title": "測試標題10",
  "content": ["{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試內文6\"}]}"],
  "tags": [{
    "_id": "642e432b24147bf0c87bb727",
    "name": "賭博1"
  }, {
    "_id": "642e432b24147bf0c87bb723",
    "name": "賭博2"
  }, {
    "_id": "642e432b24147bf0c87bb725",
    "name": "賭博3"
  }],
  "pageView": 789,
  "frontend_url": 0,
  "topSorting": null,
  "hidden": false,
  "recommendSorting": null,
  "popularSorting": 2,
  "createdAt": "2023-04-06T05:55:46.287Z",
  "updatedAt": "2023-04-06T05:55:46.287Z",
  "__v": 0,
  "categories": [{
    "_id": "642e432b24147bf0c87bb72a",
    "name": "旅遊6"
  }]
}, {
  "_id": "642e5e5f5e9b0cd3328515f3",
  "serialNumber": "8",
  "title": "測試標題9",
  "content": ["{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試內文6\"}]}"],
  "tags": [{
    "_id": "642e432b24147bf0c87bb723",
    "name": "賭博2"
  }, {
    "_id": "642e432b24147bf0c87bb727",
    "name": "賭博1"
  }, {
    "_id": "642e432b24147bf0c87bb725",
    "name": "賭博3"
  }],
  "pageView": 78,
  "frontend_url": 0,
  "topSorting": null,
  "hidden": false,
  "recommendSorting": 11,
  "popularSorting": null,
  "createdAt": "2023-04-06T05:53:35.287Z",
  "updatedAt": "2023-04-06T05:53:35.287Z",
  "__v": 0,
  "categories": [{
    "_id": "642e432b24147bf0c87bb72a",
    "name": "旅遊6"
  }]
}, {
  "_id": "642e5e2be6474967cd177d88",
  "serialNumber": "9",
  "title": "測試標題8",
  "content": ["{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試內文6\"}]}"],
  "tags": [{
    "_id": "642e432b24147bf0c87bb727",
    "name": "賭博1"
  }, {
    "_id": "642e432b24147bf0c87bb723",
    "name": "賭博2"
  }, {
    "_id": "642e432b24147bf0c87bb725",
    "name": "賭博3"
  }],
  "pageView": 66,
  "topSorting": null,
  "hidden": false,
  "recommendSorting": null,
  "popularSorting": null,
  "createdAt": "2023-04-06T05:52:43.921Z",
  "updatedAt": "2023-04-06T05:52:43.921Z",
  "__v": 0,
  "categories": [{
    "_id": "642e432b24147bf0c87bb72a",
    "name": "旅遊6"
  }]
}, {
  "_id": "642e5952920397b3e83d1813",
  "serialNumber": "10",
  "title": "測試標題7",
  "content": ["{\"node\":\"root\",\"child\":[{\"node\":\"text\",\"text\":\"測試內文6\"}]}"],
  "tags": [{
    "_id": "642e432b24147bf0c87bb727",
    "name": "賭博1"
  }, {
    "_id": "642e432b24147bf0c87bb723",
    "name": "賭博2"
  }, {
    "_id": "642e432b24147bf0c87bb725",
    "name": "賭博3"
  }],
  "pageView": 0,
  "topSorting": null,
  "hidden": false,
  "recommendSorting": null,
  "popularSorting": 4,
  "createdAt": "2023-04-06T05:32:02.874Z",
  "updatedAt": "2023-04-06T05:32:02.874Z",
  "__v": 0,
  "categories": [{
    "_id": "642e432b24147bf0c87bb72a",
    "name": "旅遊6"
  }]
}];

function toFrontendData(responseData) {
  if (Array.isArray(responseData)) {
    return responseData.map(function (item) {
      return {
        _id: item._id,
        serialNumber: item.serialNumber,
        content: {
          title: item.title,
          content: item.content
        },
        sorting: {
          isNews: {
            get: function get() {
              return item.topSorting ? true : false;
            },
            newsSorting: item.topSorting
          },
          isHot: {
            get: function get() {
              return item.popularSorting ? true : false;
            },
            hotSorting: item.popularSorting
          },
          isRecommend: {
            get: function get() {
              return item.recommendSorting ? true : false;
            },
            recommendSorting: item.recommendSorting
          }
        },
        tags: item.tags && item.tags.length > 0 ? item.tags.map(function (tag) {
          return {
            value: tag._id,
            label: tag.name
          };
        }) : [],
        classifications: item.categories && item.categories.length > 0 ? item.categories.map(function (cat) {
          return {
            value: cat._id,
            label: cat.name
          };
        }) : [],
        webHeader: {
          title: item.headTitle || '',
          description: item.headDescription || '',
          keywords: item.headKeyword || '',
          customUrl: item.manualUrl || ''
        },
        media: {
          banner: item.homeImagePath || '',
          thumbnail: item.contentImagePath || '',
          altText: item.altText || ''
        },
        pageView: item.pageView,
        hide: item.hidden || false,
        createDate: item.createdAt || ''
      };
    });
  } else {
    return {
      _id: responseData._id,
      serialNumber: responseData.serialNumber,
      content: {
        title: responseData.title,
        content: responseData.content
      },
      sorting: {
        isNews: {
          get: function get() {
            return responseData.topSorting ? true : false;
          },
          newsSorting: responseData.topSorting
        },
        isHot: {
          get: function get() {
            return responseData.popularSorting ? true : false;
          },
          hotSorting: responseData.popularSorting
        },
        isRecommend: {
          get: function get() {
            return responseData.recommendSorting ? true : false;
          },
          recommendSorting: responseData.recommendSorting
        }
      },
      tags: responseData.tags && responseData.tags.length > 0 ? responseData.tags.map(function (tag) {
        return {
          value: tag._id,
          label: tag.name
        };
      }) : [],
      classifications: responseData.categories && responseData.categories.length > 0 ? responseData.categories.map(function (cat) {
        return {
          value: cat._id,
          label: cat.name
        };
      }) : [],
      webHeader: {
        title: responseData.headTitle || '',
        description: responseData.headDescription || '',
        keywords: responseData.headKeyword || '',
        customUrl: responseData.manualUrl || ''
      },
      media: {
        banner: responseData.homeImagePath || '',
        thumbnail: responseData.contentImagePath || '',
        altText: responseData.altText || ''
      },
      pageView: responseData.pageView,
      hide: responseData.hidden || false,
      createDate: responseData.createdAt || ''
    };
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
    homeImagePath: requestData.media.banner
  };
} // GET


function GetEditorTitleList() {
  var nowTime, today, lastMonthDay, response, responseData, titleList;
  return regeneratorRuntime.wrap(function GetEditorTitleList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          nowTime = new Date();
          today = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate(), '23', '59', '59');
          lastMonthDay = new Date(nowTime.getFullYear(), nowTime.getMonth() - 1, nowTime.getDate());
          console.log("🚀 ~ file: GetEditorList.js:519 ~ function*GetEditorTitleList ~ nextWeekDay:", lastMonthDay);
          console.log("🚀 ~ file: GetEditorList.js:518 ~ function*GetEditorTitleList ~ today:", today);
          _context.prev = 5;
          _context.next = 8;
          return _AxiosInstance.instance.get("/editor?startDate=".concat(lastMonthDay, "&endDate=").concat(today, "&pageNumber=1"));

        case 8:
          response = _context.sent;
          _context.next = 11;
          return response.data.data;

        case 11:
          responseData = _context.sent;
          //! using test mock data 
          // let titleList = []
          // editorListFakeData.map(editor => {
          titleList = toFrontendData(responseData); // })

          console.log("🚀 ~ file: GetEditorList.js:422 ~ function*GetEditorTitleList ~ titleList:", titleList);
          _context.next = 16;
          return (0, _effects.put)({
            type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_SUCCESS,
            payload: titleList
          });

        case 16:
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](5);
          _context.next = 22;
          return (0, _effects.put)({
            type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_FAIL,
            errorMessage: _context.t0.message,
            payload: null
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[5, 18]]);
} // GET :_id


function GetEditorByID(_id) {
  var response, responseData, mappedEditorData;
  return regeneratorRuntime.wrap(function GetEditorByID$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _id = '6435113b213b1da0cda94d90'; // const response = yield instance.get(`/editor/${payload.data._id}`);

          _context2.next = 4;
          return _AxiosInstance.instance.get("/editor/".concat(_id));

        case 4:
          response = _context2.sent;
          _context2.next = 7;
          return response.data.data;

        case 7:
          responseData = _context2.sent;
          // console.log("🚀 ~ file: GetEditorList.js:30 ~ function*GetEditorByID ~ responseData:", responseData)
          // return
          mappedEditorData = toFrontendData(responseData); // console.log("🚀 ~ file: GetEditorList.js:53 ~ function*GetEditorByID ~ mappedEditorData:", mappedEditorData)
          // return

          _context2.next = 11;
          return (0, _effects.put)({
            type: GetEditorAction.REQUEST_EDITOR_SUCCESS,
            payload: mappedEditorData
          });

        case 11:
          _context2.next = 17;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 17;
          return (0, _effects.put)({
            type: GetEditorAction.REQUEST_EDITOR_FAIL,
            errorMessage: _context2.t0.message,
            payload: null
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[0, 13]]);
} ///
///


function SearchEditor(payload) {
  var title, classification, createDate, titleString, categoryString, startDateString, endDateString, response, responseData, mappedEditorData;
  return regeneratorRuntime.wrap(function SearchEditor$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          title = payload.title, classification = payload.classification, createDate = payload.createDate;
          titleString = payload.title ? "title=".concat(payload.title, "&") : '';
          categoryString = payload.classification.length > 0 ? payload.classification[0] === null ? '' : "category=".concat(classification[0].label, "&") : '';
          startDateString = createDate ? "startDate=".concat(createDate.startDate.toString(), "&") : '';
          endDateString = createDate ? "endDate=".concat(createDate.endDate.toString(), "&") : '';
          _context3.next = 8;
          return _AxiosInstance.instance.get("/editor?".concat(titleString).concat(categoryString, " ").concat(startDateString, " ").concat(endDateString));

        case 8:
          response = _context3.sent;
          _context3.next = 11;
          return response.data.data;

        case 11:
          responseData = _context3.sent;
          // console.log("🚀 ~ file: GetEditorList.js:30 ~ function*GetEditorByID ~ responseData:", responseData)
          // return
          mappedEditorData = toFrontendData(responseData);
          console.log("🚀 ~ file: GetEditorList.js:530 ~ function*SearchEditor ~ mappedEditorData:", mappedEditorData); // return

          _context3.next = 16;
          return (0, _effects.put)({
            type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_SUCCESS,
            payload: mappedEditorData
          });

        case 16:
          _context3.next = 22;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 22;
          return (0, _effects.put)({
            type: GetEditorAction.REQUEST_EDITOR_TITLE_LIST_FAIL,
            errorMessage: _context3.t0.message,
            payload: null
          });

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, null, [[0, 18]]);
}

function generateID() {
  var id;
  return regeneratorRuntime.wrap(function generateID$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = 0;

        case 1:
          if (!true) {
            _context4.next = 6;
            break;
          }

          _context4.next = 4;
          return id++;

        case 4:
          _context4.next = 1;
          break;

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}

var idGenerator = generateID(); // POST

function AddEditor(payload) {
  var requestData, response, responseData;
  return regeneratorRuntime.wrap(function AddEditor$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          // console.log("🚀 ~ file: GetEditorList.js:91 ~ function*AddEditor ~ payload:", payload)
          requestData = toBackendData(payload.data);
          console.log("🚀 ~ file: GetEditorList.js:114 ~ function*AddEditor ~ requestData:", requestData);
          return _context5.abrupt("return");

        case 6:
          response = _context5.sent;
          _context5.next = 9;
          return response.data.data;

        case 9:
          responseData = _context5.sent;
          _context5.next = 12;
          return (0, _effects.put)({
            type: GetEditorAction.ADD_EDITOR_SUCCESS,
            payload: responseData
          });

        case 12:
          _context5.next = 18;
          break;

        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](0);
          _context5.next = 18;
          return (0, _effects.put)({
            type: GetEditorAction.ADD_EDITOR_FAIL,
            errorMessage: _context5.t0.message,
            payload: null
          });

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, null, [[0, 14]]);
} // PATCH


function UpdateEditor(payload) {
  var response, responseData;
  return regeneratorRuntime.wrap(function UpdateEditor$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _AxiosInstance.instance.patch("/editor/".concat(payload.id), payload.data);

        case 3:
          response = _context6.sent;
          _context6.next = 6;
          return response.data.data;

        case 6:
          responseData = _context6.sent;
          _context6.next = 9;
          return (0, _effects.put)({
            type: GetEditorAction.UPDATE_EDITOR_SUCCESS,
            payload: responseData
          });

        case 9:
          _context6.next = 15;
          break;

        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          _context6.next = 15;
          return (0, _effects.put)({
            type: GetEditorAction.UPDATE_EDITOR_FAIL,
            payload: null
          });

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, null, [[0, 11]]);
} // DELETE


function DeleteEditor(payload) {
  var response, responseData;
  return regeneratorRuntime.wrap(function DeleteEditor$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _AxiosInstance.instance["delete"]("/editor/bunchDeleteByIds", {
            "ids": payload.data.ids
          });

        case 3:
          response = _context7.sent;
          _context7.next = 6;
          return response.data.data;

        case 6:
          responseData = _context7.sent;
          _context7.next = 9;
          return (0, _effects.put)({
            type: GetEditorAction.DELETE_EDITOR_SUCCESS,
            payload: responseData
          });

        case 9:
          _context7.next = 15;
          break;

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          _context7.next = 15;
          return (0, _effects.put)({
            type: GetEditorAction.DELETE_EDITOR_FAIL,
            errorMessage: _context7.t0.message,
            payload: null
          });

        case 15:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7, null, [[0, 11]]);
}

function reGetEditorList() {
  return regeneratorRuntime.wrap(function reGetEditorList$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return GetEditorTitleList();

        case 2:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8);
}

function watchAddEditorSaga() {
  var _ref, payload;

  return regeneratorRuntime.wrap(function watchAddEditorSaga$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          if (!true) {
            _context9.next = 9;
            break;
          }

          _context9.next = 3;
          return (0, _effects.take)(GetEditorAction.ADD_EDITOR);

        case 3:
          _ref = _context9.sent;
          payload = _ref.payload;
          _context9.next = 7;
          return AddEditor(payload);

        case 7:
          _context9.next = 0;
          break;

        case 9:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9);
}

function watchUpdateEditorSaga() {
  var _ref2, payload;

  return regeneratorRuntime.wrap(function watchUpdateEditorSaga$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          if (!true) {
            _context10.next = 9;
            break;
          }

          _context10.next = 3;
          return (0, _effects.take)(GetEditorAction.UPDATE_EDITOR);

        case 3:
          _ref2 = _context10.sent;
          payload = _ref2.payload;
          _context10.next = 7;
          return UpdateEditor(payload);

        case 7:
          _context10.next = 0;
          break;

        case 9:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked10);
}

function watchSearchEditorSaga() {
  var _ref3, payload;

  return regeneratorRuntime.wrap(function watchSearchEditorSaga$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          if (!true) {
            _context11.next = 9;
            break;
          }

          _context11.next = 3;
          return (0, _effects.take)(GetEditorAction.SEARCH_EDITOR_LIST);

        case 3:
          _ref3 = _context11.sent;
          payload = _ref3.payload;
          _context11.next = 7;
          return SearchEditor(payload);

        case 7:
          _context11.next = 0;
          break;

        case 9:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked11);
}

function watchDeleteEditorSaga() {
  var _ref4, payload;

  return regeneratorRuntime.wrap(function watchDeleteEditorSaga$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          if (!true) {
            _context12.next = 9;
            break;
          }

          _context12.next = 3;
          return (0, _effects.take)(GetEditorAction.DELETE_EDITOR);

        case 3:
          _ref4 = _context12.sent;
          payload = _ref4.payload;
          _context12.next = 7;
          return DeleteEditor(payload);

        case 7:
          _context12.next = 0;
          break;

        case 9:
        case "end":
          return _context12.stop();
      }
    }
  }, _marked12);
}

function watchGetEditorByIDSaga() {
  var _ref5, payload;

  return regeneratorRuntime.wrap(function watchGetEditorByIDSaga$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          if (!true) {
            _context13.next = 9;
            break;
          }

          _context13.next = 3;
          return (0, _effects.take)(GetEditorAction.REQUEST_EDITOR_BY_ID);

        case 3:
          _ref5 = _context13.sent;
          payload = _ref5.payload;
          _context13.next = 7;
          return GetEditorByID(payload.data._id);

        case 7:
          _context13.next = 0;
          break;

        case 9:
        case "end":
          return _context13.stop();
      }
    }
  }, _marked13);
}

function mySaga() {
  return regeneratorRuntime.wrap(function mySaga$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return (0, _effects.all)([(0, _effects.takeEvery)(GetEditorAction.ADD_EDITOR_SUCCESS, reGetEditorList), (0, _effects.takeEvery)(GetEditorAction.REQUEST_EDITOR, GetEditorTitleList), watchUpdateEditorSaga(), watchSearchEditorSaga(), watchAddEditorSaga(), watchDeleteEditorSaga(), watchGetEditorByIDSaga()]);

        case 2:
        case "end":
          return _context14.stop();
      }
    }
  }, _marked14);
}

var _default = mySaga;
exports["default"] = _default;