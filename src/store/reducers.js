import { combineReducers } from "redux";
import { authReducer } from "service/auth";
import { drawerReducer } from "service/drawer";
import { cardReducer } from "service/card";

export default combineReducers({
    auth: authReducer,
    drawer: drawerReducer,
    card: cardReducer,
});
