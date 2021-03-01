import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "store/reducers";
import { Provider } from "react-redux";
import rootSaga from "store/sagas";

import { setTempUser, checkLogin } from "service/auth/authSlice";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

function loadUser() {
    const user = localStorage.getItem("user");
    if (!user) return;

    store.dispatch(setTempUser(user));
    store.dispatch(checkLogin());
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorker.unregister();
