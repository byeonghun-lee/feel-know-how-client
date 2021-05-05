import { combineReducers } from "redux";
import { authReducer } from "service/auth";
import { drawerReducer } from "service/drawer";
import { cardReducer } from "service/card";
import { bestMainReducer } from "service/bestMain";

export default combineReducers({
    auth: authReducer,
    drawer: drawerReducer,
    card: cardReducer,
    bestMain: bestMainReducer,
});
