import { call, put, takeLatest } from "redux-saga/effects";
import * as cardAPI from "api/card";
import { getList, getListSuccess, getListFail } from "service/card/cardSlice";

export function* getCardSaga(action) {
    try {
        const result = yield call(cardAPI.getCard, action.payload);
        yield put(getListSuccess(result.data));
    } catch (error) {
        yield put(getListFail(error.message));
    }
}

export function* cardSaga() {
    yield takeLatest(getList, getCardSaga);
}
