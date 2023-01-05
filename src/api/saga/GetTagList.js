import {
    GET_TAG_REQUEST,
    GET_TAG_SUCCESS,
    GET_TAG_FAIL
} from "../../actions/GetTagsAction";
import * as APIList from './../apiList'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { headers } from "../../model/header"
import Pagination from '../../model/pagination'
import { LOGGER_CATCHERROR } from "../../actions/LoggerAction";
import TAG from "../../model/tags";

const apiUrl = `${APIList.getTagList}`

function* GetTagList() {
    try {
        // const guestToken = yield select(
        //     (state) => state.LiveGuestInfo.guestToken
        // )
        // const body = { Authorization: guestToken, ...Pagination };
        const body = { ...Pagination };
        // const resp = yield call(fetch, apiUrl, {
        //     method: "POST",
        //     headers: headers,
        //     body: JSON.stringify(body),
        // });
        // if (!resp.ok) throw new Error(resp.statusText)
        // const result = yield resp.json()
        // if (!result.Success) throw new Error(`${result.Message}(${result.Code})`)
        // const tagList = yield result.Data
        const tagList = TAG
        yield put({
            type: GET_TAG_SUCCESS,
            payload: tagList
        })
    } catch (error) {
        yield put({
            type: GET_TAG_FAIL,
            errorMessage: error.message,
            payload: null
        })
        // yield put({
        //     type: LOGGER_CATCHERROR,
        //     requestType: GET_TAG_FAIL,
        //     apiUrl,
        //     payload: error.message,
        // });
    }
}

function* mySaga() {
    yield takeEvery(GET_TAG_REQUEST, GetTagList)
}

export default mySaga;