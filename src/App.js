import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import cx from "classnames";

import SideBar from "common/sideBar/SideBar";
import LoginModal from "common/loginModal/LoginModal";
import Routes from "Routes";

import "./Reset.scss";

function App() {
    const [isLogin, setLogin] = useState(true);
    return (
        <BrowserRouter>
            <div className="App">
                {/* <LoginModal isLogin={isLogin} setLogin={setLogin} /> */}
                <SideBar isLogin={isLogin} />
                <div
                    className={cx("main-contants", {
                        "side-bar-visible": isLogin,
                    })}
                >
                    <Routes />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
