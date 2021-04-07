import { all } from "redux-saga/effects";
import { authSaga } from "service/auth/authSaga";
import { drawerSaga } from "service/drawer/drawerSaga";
import { cardSaga } from "service/card/cardSaga";

export default function* rootSaga() {
    yield all([authSaga(), drawerSaga(), cardSaga()]);
}
