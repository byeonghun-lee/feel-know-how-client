import { combineReducers } from "redux";
import { authReducer } from "service/auth";
import { drawerReducer } from "service/drawer";
import { cardReducer } from "service/card";
import { bestMainReducer } from "service/bestMain";
import { searchReducer } from "service/search";
import { readingListReducer } from "service/readingList";

export default combineReducers({
    auth: authReducer,
    drawer: drawerReducer,
    card: cardReducer,
    bestMain: bestMainReducer,
    search: searchReducer,
    readingList: readingListReducer,
});
