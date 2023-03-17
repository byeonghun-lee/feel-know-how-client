import React, { useEffect } from "react";
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

    useEffect(() => {
        window.addEventListener("message", (event) => {
            if (
                event &&
                typeof event.data === "string" &&
                event.data.indexOf("mimeType") >= 0
            ) {
                const webviewData =
                    event && event.data && JSON.parse(event.data);

                if (
                    webviewData &&
                    webviewData.data &&
                    webviewData.mimeType === "text/plain"
                ) {
                    localStorage.setItem("sharedUrl", webviewData.data);
                    if (isLogin) {
                        window.location.href = "/new-card";
                    } else {
                        window.location.href = "/login?return-page=new-card";
                    }
                }
            }
        });
    }, []);

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
