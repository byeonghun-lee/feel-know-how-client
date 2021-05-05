import { call, put, takeLatest } from "redux-saga/effects";
import { getDrawerOfPublicBest as getDrawerOfPublicBestAPI } from "api/drawer";
import {
    getList,
    getListSuccess,
    getListFail,
} from "service/bestMain/bestMainSlice";

export function* getDrawerOfPublicBestSaga(action) {
    try {
        const result = yield call(getDrawerOfPublicBestAPI, action.payload);
        yield put(getListSuccess(result.data));
    } catch (error) {
        yield put(getListFail(error.message));
    }
}

export function* bestMainSaga() {
    yield takeLatest(getList, getDrawerOfPublicBestSaga);
}
