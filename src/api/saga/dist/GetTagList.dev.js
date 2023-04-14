"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _effects = require("redux-saga/effects");

var GetTagsAction = _interopRequireWildcard(require("../../actions/GetTagsAction"));

var _AxiosInstance = require("./AxiosInstance");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(GetTagList),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(AddTag),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(UpdateTag),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(DeleteTag),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(reGetTagList),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(setErrorMessageNull),
    _marked7 =
/*#__PURE__*/
regeneratorRuntime.mark(watchAddTagSaga),
    _marked8 =
/*#__PURE__*/
regeneratorRuntime.mark(watchUpdateTagSaga),
    _marked9 =
/*#__PURE__*/
regeneratorRuntime.mark(watchDeleteTagSaga),
    _marked10 =
/*#__PURE__*/
regeneratorRuntime.mark(mySaga);

// GET
function GetTagList() {
  var response, tagList, tagMapped;
  return regeneratorRuntime.wrap(function GetTagList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _AxiosInstance.instance.get("/tags");

        case 3:
          response = _context.sent;
          _context.next = 6;
          return response.data.data;

        case 6:
          tagList = _context.sent;
          // console.log("🚀 ~ file: GetTagList.js:14 ~ function*GetTagList ~ tagList:", tagList)
          tagMapped = tagList.map(function (tag) {
            return {
              _id: tag._id,
              name: tag.name
            };
          }); // console.log("🚀 ~ file: GetTagList.js:19 ~ tagMapped ~ tagMapped:", tagMapped)
          // return

          _context.next = 10;
          return (0, _effects.put)({
            type: GetTagsAction.REQUEST_TAG_SUCCESS,
            payload: tagMapped
          });

        case 10:
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          _context.next = 16;
          return (0, _effects.put)({
            type: GetTagsAction.GET_TAG_FAIL,
            errorMessage: _context.t0.message,
            payload: null
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 12]]);
} // POST


function AddTag(payload) {
  var response, responseData;
  return regeneratorRuntime.wrap(function AddTag$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _AxiosInstance.instance.post("/tags/", payload.data);

        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return response.data.data;

        case 6:
          responseData = _context2.sent;
          _context2.next = 9;
          return (0, _effects.put)({
            type: GetTagsAction.ADD_TAG_SUCCESS,
            payload: null
          });

        case 9:
          _context2.next = 15;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 15;
          return (0, _effects.put)({
            type: GetTagsAction.ADD_TAG_FAIL,
            errorMessage: _context2.t0.message,
            payload: null
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[0, 11]]);
} // PATCH


function UpdateTag(payload) {
  var response, tagList;
  return regeneratorRuntime.wrap(function UpdateTag$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _AxiosInstance.instance.patch("/tags/".concat(payload.data.id), payload.data);

        case 3:
          response = _context3.sent;
          _context3.next = 6;
          return response.data.data;

        case 6:
          tagList = _context3.sent;
          _context3.next = 9;
          return (0, _effects.put)({
            type: GetTagsAction.UPDATE_TAG_SUCCESS,
            payload: tagList
          });

        case 9:
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 15;
          return (0, _effects.put)({
            type: GetTagsAction.UPDATE_TAG_FAIL,
            errorMessage: _context3.t0.message,
            payload: null
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, null, [[0, 11]]);
} // DELETE


function DeleteTag(payload) {
  var response, tagList;
  return regeneratorRuntime.wrap(function DeleteTag$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _AxiosInstance.instance["delete"]("/tags/".concat(payload.data));

        case 3:
          response = _context4.sent;
          _context4.next = 6;
          return response.data.data;

        case 6:
          tagList = _context4.sent;
          _context4.next = 9;
          return (0, _effects.put)({
            type: GetTagsAction.DELETE_TAG_SUCCESS,
            payload: tagList
          });

        case 9:
          _context4.next = 15;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          _context4.next = 15;
          return (0, _effects.put)({
            type: GetTagsAction.DELETE_TAG_FAIL,
            errorMessage: _context4.t0.message,
            payload: null
          });

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, null, [[0, 11]]);
}

function reGetTagList() {
  return regeneratorRuntime.wrap(function reGetTagList$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return GetTagList();

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}

function setErrorMessageNull() {
  return regeneratorRuntime.wrap(function setErrorMessageNull$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _effects.put)({
            type: GetTagsAction.REQUEST_TAG_STAGE
          });

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6);
}

function watchAddTagSaga() {
  var _ref, payload;

  return regeneratorRuntime.wrap(function watchAddTagSaga$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (!true) {
            _context7.next = 9;
            break;
          }

          _context7.next = 3;
          return (0, _effects.take)(GetTagsAction.ADD_TAG);

        case 3:
          _ref = _context7.sent;
          payload = _ref.payload;
          _context7.next = 7;
          return AddTag(payload);

        case 7:
          _context7.next = 0;
          break;

        case 9:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7);
}

function watchUpdateTagSaga() {
  var _ref2, payload;

  return regeneratorRuntime.wrap(function watchUpdateTagSaga$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (!true) {
            _context8.next = 9;
            break;
          }

          _context8.next = 3;
          return (0, _effects.take)(GetTagsAction.UPDATE_TAG);

        case 3:
          _ref2 = _context8.sent;
          payload = _ref2.payload;
          _context8.next = 7;
          return UpdateTag(payload);

        case 7:
          _context8.next = 0;
          break;

        case 9:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8);
}

function watchDeleteTagSaga() {
  var _ref3, payload;

  return regeneratorRuntime.wrap(function watchDeleteTagSaga$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          if (!true) {
            _context9.next = 9;
            break;
          }

          _context9.next = 3;
          return (0, _effects.take)(GetTagsAction.DELETE_TAG);

        case 3:
          _ref3 = _context9.sent;
          payload = _ref3.payload;
          _context9.next = 7;
          return DeleteTag(payload);

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

function mySaga() {
  return regeneratorRuntime.wrap(function mySaga$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _effects.all)([(0, _effects.takeEvery)(GetTagsAction.ADD_TAG_SUCCESS, reGetTagList), (0, _effects.takeEvery)(GetTagsAction.REQUEST_TAG, GetTagList), watchUpdateTagSaga(), watchAddTagSaga(), watchDeleteTagSaga()]);

        case 2:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked10);
}

var _default = mySaga;
exports["default"] = _default;