import { call, put, takeLatest } from "redux-saga/effects";
import * as AuthAPI from "api/auth";
import { login, loginSuccess, loginFail } from "service/auth/authSlice";

function* loginSaga(action) {
    try {
        const loginResult = yield call(AuthAPI.login, action.payload);
        yield put(loginSuccess(loginResult.data));
    } catch (error) {
        yield put(loginFail(error.message));
    }
}

export function* authSaga() {
    yield takeLatest(login, loginSaga);
}
