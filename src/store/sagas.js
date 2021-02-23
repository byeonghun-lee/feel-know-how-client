import { all } from "redux-saga/effects";
import { authSaga } from "service/auth/authSaga";

export default function* rootSaga() {
    yield all([authSaga()]);
}
