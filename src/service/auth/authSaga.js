import { call, put, takeLatest } from "redux-saga/effects";
import * as AuthAPI from "api/auth";
import {
    login,
    loginSuccess,
    loginFail,
    checkLogin,
    checkLoginFail,
} from "service/auth/authSlice";
import { getList } from "service/drawer/drawerSlice";

function* loginSaga(action) {
    try {
        const loginResult = yield call(AuthAPI.login, action.payload);
        yield put(loginSuccess(loginResult.data));
        yield put(getList());
    } catch (error) {
        yield put(loginFail(error.message));
    }
}

function* checkLoginSaga(action) {
    try {
        const checkLoginResult = yield call(AuthAPI.checkLogin);
        yield put(loginSuccess(checkLoginResult.data));
        yield put(getList());
    } catch (error) {
        localStorage.removeItem("user");
        yield put(checkLoginFail(error.message));
    }
}

export function* authSaga() {
    yield takeLatest(login, loginSaga);
    yield takeLatest(checkLogin, checkLoginSaga);
}
