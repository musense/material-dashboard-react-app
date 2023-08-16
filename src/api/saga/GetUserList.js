
import { all, put, take } from 'redux-saga/effects';
import * as GetUserAction from "../../actions/GetUserAction";
import { instance } from "./AxiosInstance";
import { getErrorMessage, getGetErrorMessage } from '../apiHelperFunc';

// LOGIN
function* UserLogin(payload) {
    const { username, password } = payload
    try {
        const response = yield instance.post(`/login`, { username, password });
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
        yield getErrorMessage(error, GetUserAction.LOGIN_USER_FAIL)
    }
}

// LOGOUT
function* UserLogout() {

    try {
        const response = yield instance.post(`/logout`);
        const user = yield response.data;
        yield put({
            type: GetUserAction.LOGOUT_USER_SUCCESS,
            errorMessage: 'logout successfully',
        })
    } catch (error) {
        yield getErrorMessage(error, GetUserAction.LOGOUT_USER_FAIL)
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
        yield getErrorMessage(error, GetUserAction.REGISTER_USER_FAIL)
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
        yield getErrorMessage(error, GetUserAction.UPDATE_USER_FAIL)
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
        yield getErrorMessage(error, GetUserAction.DELETE_USER_FAIL)
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