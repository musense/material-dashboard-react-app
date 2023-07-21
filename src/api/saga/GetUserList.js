
import { all, put, take } from 'redux-saga/effects';
import * as GetUserAction from "../../actions/GetUserAction";
import { instance } from "./AxiosInstance";

// LOGIN
function* UserLogin(payload) {
    const { username, password } = payload
    try {
        const response = yield instance.post(`/login`, { username, password });
        console.log("🚀 ~ file: GetUserList.js:16 ~ function*UserLogin ~ response:", response)
        const user = yield response.data;
        yield put({
            type: GetUserAction.LOGIN_USER_SUCCESS,
            errorMessage: 'login successfully',
            payload: {
                username: user.username,
                email: user.email,
            },
        })
    } catch (error) {
        console.log("🚀 ~ file: GetUserList.js:23 ~ function*UserLogin ~ error:", error)
        let errorMessage;
        if (error.response) {
            errorMessage = error.response.data.message
        } else {
            errorMessage = error.code
        }
        if (error.response) {
            yield put({
                type: GetUserAction.LOGIN_USER_FAIL,
                errorMessage: errorMessage,
                payload: null
            })
        }
    }
}

// LOGOUT
function* UserLogout() {

    try {
        const response = yield instance.post(`/logout`);
        console.log("🚀 ~ file: GetUserList.js:16 ~ function*UserLogin ~ response:", response)
        const user = yield response.data;
          // console.log("🚀 ~ file: GetUserList.js:51 ~ function*UserLogout ~ user:", user)
        yield put({
            type: GetUserAction.LOGOUT_USER_SUCCESS,
            errorMessage: 'logout successfully',
        })
    } catch (error) {
        console.log("🚀 ~ file: GetUserList.js:61 ~ function*UserLogout ~ error:", error)
        let errorMessage;
        if (error.response) {
            errorMessage = error.response.data.message
        } else {
            errorMessage = error.code
        }
        if (error.response) {
            yield put({
                type: GetUserAction.LOGOUT_USER_FAIL,
                errorMessage: errorMessage,
                payload: null
            })
        }
    }
}

// REGISTER
function* UserRegister(payload) {
    const { username, email, password } = payload
    try {

        const response = yield instance.post(`/register`, { username, email, password })
        const responseData = yield response.data;
        yield put({
            type: GetUserAction.REGISTER_USER_SUCCESS,
            payload: responseData,
            errorMessage: 'register successfully',
        })
    } catch (error) {
        console.log("🚀 ~ file: GetUserList.js:57 ~ function*UserRegister ~ error:", error)
        let errorMessage;
        if (error.response) {
            errorMessage = error.response.data.message || error.response.data.messages.join(',')
        } else {
            errorMessage = error.code
        }
        if (error.response) {
            yield put({
                type: GetUserAction.REGISTER_USER_FAIL,
                errorMessage: errorMessage,
                payload: null
            })
        }

    }
}

// PATCH
function* UserUpdate(payload) {
    try {
        const response = yield instance.patch(`/user/${payload.data.id}`, payload.data);
        const responseData = yield response.data.data;
        yield put({
            type: GetUserAction.UPDATE_USER_SUCCESS,
            payload: null
        })
    } catch (error) {
        yield put({
            type: GetUserAction.UPDATE_USER_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

// DELETE
// not implemented
function* UserDelete(payload) {
    try {
        const response = yield instance.delete(`/user/${payload.data}`);
        const responseData = yield response.data.data;
        yield put({
            type: GetUserAction.DELETE_USER_SUCCESS,
            payload: null
        })
    } catch (error) {
        yield put({
            type: GetUserAction.DELETE_USER_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

// not implemented
// function* reGetUser() {
//     yield GetUser()
// }

// Watch LOGIN ACTION
function* watchUserLoginSaga() {
    while (true) {
        const { payload } = yield take(GetUserAction.LOGIN_USER)
        yield UserLogin(payload)
    }
}

// Watch LOGIN ACTION
function* watchUserLogoutSaga() {
    while (true) {
        const { payload } = yield take(GetUserAction.LOGOUT_USER)
        yield UserLogout(payload)
    }
}

// Watch REGISTER ACTION
function* watchUserRegisterSaga() {
    while (true) {
        const { payload } = yield take(GetUserAction.REGISTER_USER)
        yield UserRegister(payload)
    }
}

// not implemented
function* watchAddUserSaga() {
    while (true) {
        const { payload } = yield take(GetUserAction.UPDATE_USER)
        yield UserUpdate(payload)
    }
}

// not implemented
function* watchDeleteUserSaga() {
    while (true) {
        const { payload } = yield take(GetUserAction.DELETE_USER)
        yield UserDelete(payload)
    }
}

function* mySaga() {
    yield all([
        // takeEvery(ADD_USER_SUCCESS, reGetUser),
        // takeEvery(REQUEST_USER, GetUser),
        watchUserLoginSaga(),
        watchUserLogoutSaga(),
        watchUserRegisterSaga(),
        // watchDeleteUserSaga(),
    ])
}

export default mySaga;