import { all } from "redux-saga/effects";
import { authSaga } from "service/auth/authSaga";
import { drawerSaga } from "service/drawer/drawerSaga";
import { cardSaga } from "service/card/cardSaga";
import { bestMainSaga } from "service/bestMain/bestMainSaga";

export default function* rootSaga() {
    yield all([authSaga(), drawerSaga(), cardSaga(), bestMainSaga()]);
}
