import { call, put, takeLatest } from "redux-saga/effects";
import * as drawerAPI from "api/drawer";
import {
    getList,
    getListSuccess,
    getListFail,
} from "service/drawer/drawerSlice";

export function* getDrawerSaga(action) {
    try {
        const result = yield call(drawerAPI.getDrawer);
        yield put(getListSuccess(result.data));
    } catch (error) {
        yield put(getListFail(error.message));
    }
}

export function* drawerSaga() {
    yield takeLatest(getList, getDrawerSaga);
}
