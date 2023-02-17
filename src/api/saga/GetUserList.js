import axios from "axios";
import { all, put, take } from 'redux-saga/effects';
import {
    DELETE_USER, DELETE_USER_FAIL, DELETE_USER_SUCCESS, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, REGISTER_USER, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS, UPDATE_USER, UPDATE_USER_FAIL, UPDATE_USER_SUCCESS
} from "../../actions/GetUserAction";

const apiUrl = `${process.env.REACT_APP_SERVER_URL}`

// LOGIN
function* UserLogin(payload) {
    const { username, password } = payload
    try {
        const response = yield axios.post(`${apiUrl}/login`
            , {
                username, password
            });
        const user = yield response.data;
        yield put({
            type: LOGIN_USER_SUCCESS,
            errorMessage: 'login successfully',
            payload: user,
        })
    } catch (error) {
        yield put({
            type: LOGIN_USER_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

// REGISTER
function* UserRegister(payload) {
    const { username, email, password } = payload
    try {

        const response = yield axios.post(`${apiUrl}/register`, {
            username, email, password
        }).catch((error) => {
            throw new Error(error.response.data.message)
        });
        const responseData = yield response.data;
        yield put({
            type: REGISTER_USER_SUCCESS,
            errorMessage: responseData.errorMessage,
            payload: responseData
        })
    } catch (error) {
        if (typeof error === "string") {
            yield put({
                type: REGISTER_USER_FAIL,
                errorMessage: error,
                payload: null
            })
        } else {
            yield put({
                type: REGISTER_USER_FAIL,
                errorMessage: error.message,
                payload: null
            })
        }
    }
}

// PATCH
function* UserUpdate(payload) {
    try {
        const response = yield axios.patch(`${apiUrl}/user/${payload.data.id}`, payload.data);
        const responseData = yield response.data;
        yield put({
            type: UPDATE_USER_SUCCESS,
            payload: null
        })
    } catch (error) {
        yield put({
            type: UPDATE_USER_FAIL,
            errorMessage: error.message,
            payload: null
        })
    }
}

// DELETE
// not implemented
function* UserDelete(payload) {
    try {
        const response = yield axios.delete(`${apiUrl}/user/${payload.data}`);
        const responseData = yield response.data;
        yield put({
            type: DELETE_USER_SUCCESS,
            payload: null
        })
    } catch (error) {
        yield put({
            type: DELETE_USER_FAIL,
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
        const { payload } = yield take(LOGIN_USER)
        yield UserLogin(payload)
    }
}

// Watch REGISTER ACTION
function* watchUserRegisterSaga() {
    while (true) {
        const { payload } = yield take(REGISTER_USER)
        yield UserRegister(payload)
    }
}

// not implemented
function* watchAddUserSaga() {
    while (true) {
        const { payload } = yield take(UPDATE_USER)
        yield UserUpdate(payload)
    }
}

// not implemented
function* watchDeleteUserSaga() {
    while (true) {
        const { payload } = yield take(DELETE_USER)
        yield UserDelete(payload)
    }
}

function* mySaga() {
    yield all([
        // takeEvery(ADD_USER_SUCCESS, reGetUser),
        // takeEvery(REQUEST_USER, GetUser),
        watchUserLoginSaga(),
        watchUserRegisterSaga(),
        // watchDeleteUserSaga(),
    ])
}

export default mySaga;