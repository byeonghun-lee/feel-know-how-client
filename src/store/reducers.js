import { combineReducers } from "redux";
import { authReducer } from "service/auth";

export default combineReducers({
    auth: authReducer,
});
