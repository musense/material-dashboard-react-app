"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _effects = require("redux-saga/effects");

var _GetUserAction = require("../../actions/GetUserAction");

var _AxiosInstance = require("./AxiosInstance");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(UserLogin),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(UserRegister),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(UserUpdate),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(UserDelete),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(watchUserLoginSaga),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(watchUserRegisterSaga),
    _marked7 =
/*#__PURE__*/
regeneratorRuntime.mark(watchAddUserSaga),
    _marked8 =
/*#__PURE__*/
regeneratorRuntime.mark(watchDeleteUserSaga),
    _marked9 =
/*#__PURE__*/
regeneratorRuntime.mark(mySaga);

// LOGIN
function UserLogin(payload) {
  var username, password, response, data, user;
  return regeneratorRuntime.wrap(function UserLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          username = payload.username, password = payload.password;
          _context.prev = 1;
          _context.next = 4;
          return _AxiosInstance.instance.post("/login", {
            username: username,
            password: password
          });

        case 4:
          response = _context.sent;
          _context.next = 7;
          return response;

        case 7:
          data = _context.sent;
          user = data.data;
          _context.next = 11;
          return (0, _effects.put)({
            type: _GetUserAction.LOGIN_USER_SUCCESS,
            errorMessage: 'login successfully',
            payload: user
          });

        case 11:
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          _context.next = 17;
          return (0, _effects.put)({
            type: _GetUserAction.LOGIN_USER_FAIL,
            errorMessage: _context.t0.message,
            payload: null
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 13]]);
} // REGISTER


function UserRegister(payload) {
  var username, email, password, response, responseData;
  return regeneratorRuntime.wrap(function UserRegister$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          username = payload.username, email = payload.email, password = payload.password;
          _context2.prev = 1;
          _context2.next = 4;
          return _AxiosInstance.instance.post("/register", {
            username: username,
            email: email,
            password: password
          })["catch"](function (error) {
            throw new Error(error.response.data.message);
          });

        case 4:
          response = _context2.sent;
          _context2.next = 7;
          return response.data.data;

        case 7:
          responseData = _context2.sent;
          _context2.next = 10;
          return (0, _effects.put)({
            type: _GetUserAction.REGISTER_USER_SUCCESS,
            errorMessage: responseData.errorMessage,
            payload: responseData
          });

        case 10:
          _context2.next = 21;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](1);

          if (!(typeof _context2.t0 === "string")) {
            _context2.next = 19;
            break;
          }

          _context2.next = 17;
          return (0, _effects.put)({
            type: _GetUserAction.REGISTER_USER_FAIL,
            errorMessage: _context2.t0,
            payload: null
          });

        case 17:
          _context2.next = 21;
          break;

        case 19:
          _context2.next = 21;
          return (0, _effects.put)({
            type: _GetUserAction.REGISTER_USER_FAIL,
            errorMessage: _context2.t0.message,
            payload: null
          });

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[1, 12]]);
} // PATCH


function UserUpdate(payload) {
  var response, responseData;
  return regeneratorRuntime.wrap(function UserUpdate$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _AxiosInstance.instance.patch("/user/".concat(payload.data.id), payload.data);

        case 3:
          response = _context3.sent;
          _context3.next = 6;
          return response.data.data;

        case 6:
          responseData = _context3.sent;
          _context3.next = 9;
          return (0, _effects.put)({
            type: _GetUserAction.UPDATE_USER_SUCCESS,
            payload: null
          });

        case 9:
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 15;
          return (0, _effects.put)({
            type: _GetUserAction.UPDATE_USER_FAIL,
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
// not implemented


function UserDelete(payload) {
  var response, responseData;
  return regeneratorRuntime.wrap(function UserDelete$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _AxiosInstance.instance["delete"]("/user/".concat(payload.data));

        case 3:
          response = _context4.sent;
          _context4.next = 6;
          return response.data.data;

        case 6:
          responseData = _context4.sent;
          _context4.next = 9;
          return (0, _effects.put)({
            type: _GetUserAction.DELETE_USER_SUCCESS,
            payload: null
          });

        case 9:
          _context4.next = 15;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          _context4.next = 15;
          return (0, _effects.put)({
            type: _GetUserAction.DELETE_USER_FAIL,
            errorMessage: _context4.t0.message,
            payload: null
          });

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, null, [[0, 11]]);
} // not implemented
// function* reGetUser() {
//     yield GetUser()
// }
// Watch LOGIN ACTION


function watchUserLoginSaga() {
  var _ref, payload;

  return regeneratorRuntime.wrap(function watchUserLoginSaga$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!true) {
            _context5.next = 9;
            break;
          }

          _context5.next = 3;
          return (0, _effects.take)(_GetUserAction.LOGIN_USER);

        case 3:
          _ref = _context5.sent;
          payload = _ref.payload;
          _context5.next = 7;
          return UserLogin(payload);

        case 7:
          _context5.next = 0;
          break;

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
} // Watch REGISTER ACTION


function watchUserRegisterSaga() {
  var _ref2, payload;

  return regeneratorRuntime.wrap(function watchUserRegisterSaga$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!true) {
            _context6.next = 9;
            break;
          }

          _context6.next = 3;
          return (0, _effects.take)(_GetUserAction.REGISTER_USER);

        case 3:
          _ref2 = _context6.sent;
          payload = _ref2.payload;
          _context6.next = 7;
          return UserRegister(payload);

        case 7:
          _context6.next = 0;
          break;

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6);
} // not implemented


function watchAddUserSaga() {
  var _ref3, payload;

  return regeneratorRuntime.wrap(function watchAddUserSaga$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (!true) {
            _context7.next = 9;
            break;
          }

          _context7.next = 3;
          return (0, _effects.take)(_GetUserAction.UPDATE_USER);

        case 3:
          _ref3 = _context7.sent;
          payload = _ref3.payload;
          _context7.next = 7;
          return UserUpdate(payload);

        case 7:
          _context7.next = 0;
          break;

        case 9:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7);
} // not implemented


function watchDeleteUserSaga() {
  var _ref4, payload;

  return regeneratorRuntime.wrap(function watchDeleteUserSaga$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (!true) {
            _context8.next = 9;
            break;
          }

          _context8.next = 3;
          return (0, _effects.take)(_GetUserAction.DELETE_USER);

        case 3:
          _ref4 = _context8.sent;
          payload = _ref4.payload;
          _context8.next = 7;
          return UserDelete(payload);

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

function mySaga() {
  return regeneratorRuntime.wrap(function mySaga$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _effects.all)([// takeEvery(ADD_USER_SUCCESS, reGetUser),
          // takeEvery(REQUEST_USER, GetUser),
          watchUserLoginSaga(), watchUserRegisterSaga() // watchDeleteUserSaga(),
          ]);

        case 2:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9);
}

var _default = mySaga;
exports["default"] = _default;