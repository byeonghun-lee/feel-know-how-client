import React from "react";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import PermIdentityRoundedIcon from "@material-ui/icons/PermIdentityRounded";

import "./Header.scss";

const Header = () => {
    const test = "";

    return (
        <header className="main-header">
            <div className="header-icon">
                <SearchRoundedIcon />
            </div>
            <div className="header-icon">
                <NotificationsNoneRoundedIcon />
            </div>
            <div className="header-icon">
                <PermIdentityRoundedIcon />
            </div>
        </header>
    );
};

export default Header;
