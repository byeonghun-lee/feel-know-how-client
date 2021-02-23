import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import cx from "classnames";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import rootReducer from "store/reducers";
import rootSaga from "store/sagas";

import SideBar from "common/sideBar/SideBar";
import Header from "common/header/Header";
import LoginModal from "common/loginModal/LoginModal";
import Routes from "Routes";

import "./Reset.scss";

function App() {
    const [isLogin, setLogin] = useState(false);
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: rootReducer,
        middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
    });

    sagaMiddleware.run(rootSaga);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <LoginModal isLogin={isLogin} setLogin={setLogin} />
                    <SideBar isLogin={isLogin} />
                    <div
                        className={cx("main-contents", {
                            "side-bar-visible": isLogin,
                        })}
                    >
                        <Header />
                        <div className="main-contents-body">
                            <Routes />
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
