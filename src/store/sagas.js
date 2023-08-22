import { all } from "redux-saga/effects";
import { authSaga } from "service/auth";
import { drawerSaga } from "service/drawer";
import { cardSaga } from "service/card";
import { bestMainSaga } from "service/bestMain";
import { searchSaga } from "service/search";
import { readingListSaga } from "service/readingList";

export default function* rootSaga() {
    yield all([
        authSaga(),
        drawerSaga(),
        cardSaga(),
        bestMainSaga(),
        searchSaga(),
        readingListSaga(),
    ]);
}
