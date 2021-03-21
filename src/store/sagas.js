import { all } from "redux-saga/effects";
import { authSaga } from "service/auth/authSaga";
import { drawerSaga } from "service/drawer/drawerSaga";

export default function* rootSaga() {
    yield all([authSaga(), drawerSaga()]);
}
