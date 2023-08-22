import { call, put, takeLatest } from "redux-saga/effects";
import * as readingListAPI from "api/readingList";
import {
    getList,
    getListSuccess,
    getListFail,
} from "service/readingList/readingListSlice";

export function* getReadingList(action) {
    try {
        const result = yield call(readingListAPI.getReadingList);
        yield put(getListSuccess(result.data));
    } catch (error) {
        yield put(getListFail(error.message));
    }
}

export function* readingListSaga() {
    yield takeLatest(getList, getReadingList);
}
