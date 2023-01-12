import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import cx from "classnames";
import { isMobile } from "react-device-detect";

import SideBar from "common/sideBar/SideBar";
import Header from "common/header/Header";
import MobileNavigation from "common/mobileNavigation/MobileNavigation";
// import CheckCopiedLink from "common/checkCopiedLink/CheckCopiedLink";
// import LoginModal from "common/loginModal/LoginModal";
import Routes from "Routes";

import "./Reset.scss";

function App() {
    const isLogin = useSelector(({ auth }) => auth.info);

    return (
        <BrowserRouter>
            <div className="App">
                {/* <LoginModal isLogin={isLogin} /> */}
                {!isMobile && <SideBar isLogin={isLogin} />}
                {/* <CheckCopiedLink isLogin={isLogin} /> */}
                <Header />
                <div
                    className={cx("main-contents", {
                        "side-bar-visible": isLogin,
                    })}
                >
                    {/* <Header /> */}
                    <div className="main-contents-body">
                        <Routes />
                    </div>
                </div>
                <MobileNavigation />
            </div>
        </BrowserRouter>
    );
}

export default App;
