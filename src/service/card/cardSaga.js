import { call, put, takeLatest } from "redux-saga/effects";
import * as cardAPI from "api/card";
import {
    getList,
    getListSuccess,
    getListFail,
    updateCardReadStatus,
    updateCardReadStatusSuccess,
    updateCardReadStatusFail,
} from "service/card/cardSlice";

export function* getCardSaga(action) {
    try {
        let result;
        if (
            action.payload.drawerName === "inbox" ||
            action.payload.drawerName === "trash"
        ) {
            result = yield call(cardAPI.getTempCard, action.payload);
        } else {
            result = yield call(cardAPI.getCard, action.payload);
        }
        yield put(getListSuccess(result.data));
    } catch (error) {
        yield put(getListFail(error.message));
    }
}

export function* updateCardReadStatusSaga(action) {
    try {
        const result = yield call(cardAPI.updateCardReadStatus, action.payload);
        yield put(updateCardReadStatusSuccess(result.data));
    } catch (error) {
        yield put(updateCardReadStatusFail(error.message));
    }
}

export function* cardSaga() {
    yield takeLatest(getList, getCardSaga);
    yield takeLatest(updateCardReadStatus, updateCardReadStatusSaga);
}
