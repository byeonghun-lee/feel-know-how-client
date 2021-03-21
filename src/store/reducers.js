import { combineReducers } from "redux";
import { authReducer } from "service/auth";
import { drawerReducer } from "service/drawer";

export default combineReducers({
    auth: authReducer,
    drawer: drawerReducer,
});
