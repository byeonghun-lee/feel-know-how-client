import { call, put, takeLatest } from "redux-saga/effects";
import * as searchAPI from "api/search";
import { search, searchSuccess, searchFail } from "service/search/searchSlice";

export function* onSearchSaga(action) {
    try {
        const result = yield call(searchAPI.search, action.payload.keyword);
        yield put(searchSuccess(result.data));
    } catch (error) {
        yield put(searchFail(error.message));
    }
}

export function* searchSaga() {
    yield takeLatest(search, onSearchSaga);
}
