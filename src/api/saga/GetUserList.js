import axios from "axios";
import { all, put, take } from 'redux-saga/effects';
import {
    DELETE_USER, DELETE_USER_FAIL, DELETE_USER_SUCCESS, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, REGISTER_USER, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS, UPDATE_USER, UPDATE_USER_FAIL, UPDATE_USER_SUCCESS
} from "../../actions/GetUserAction";

// const apiUrl = `${APIList.getUserList}`

// LOGIN
function* UserLogin(payload) {
    const { username, password } = payload
    try {
        const response = yield axios.post("http://localhost:4200/user/login", {
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

        console.group('UserRegister!!! YA!! payload')
        console.table(payload);
        console.table({ username });
        console.table({ email });
        console.table({ password });
        console.groupEnd('UserRegister!!! YA!! payload.data');

        const response = yield axios.post(`http://localhost:4200/user/register`, {
            username, email, password
        }).catch((error) => {
            console.dir(error)
            throw new Error(error.response.data.message)
        });
        const responseData = yield response.data;
        console.group('UserRegister responseData')
        console.table({ responseData })
        console.groupEnd('UserRegister responseData')
        yield put({
            type: REGISTER_USER_SUCCESS,
            errorMessage: responseData.errorMessage,
            payload: responseData
        })
    } catch (error) {
        console.dir(error)
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
        // console.group('UpdateUser!!! YA!! payload.data')
        // console.table(payload.data);
        // console.groupEnd('UpdateUser!!! YA!! payload.data');
        const response = yield axios.patch(`http://localhost:4200/user/${payload.data.id}`, payload.data);
        const responseData = yield response.data;
        console.group('UpdateUser responseData')
        console.table(responseData)
        console.groupEnd('UpdateUser responseData')
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
        console.group('DeleteUser!!! YA!! payload.data')
        console.table(payload.data);
        console.groupEnd('DeleteUser!!! YA!! payload.data');
        const response = yield axios.delete(`http://localhost:4200/user/${payload.data}`);
        const responseData = yield response.data;
        console.group('DeleteUser responseData')
        console.table(responseData)
        console.groupEnd('DeleteUser responseData')
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