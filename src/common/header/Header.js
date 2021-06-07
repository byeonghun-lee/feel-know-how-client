import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import PermIdentityRoundedIcon from "@material-ui/icons/PermIdentityRounded";

import "./Header.scss";

const Header = () => {
    const user = useSelector(({ auth }) => auth.info);

    return (
        <header className="main-header">
            <div className="header-icon">
                <Link to="/search">
                    <SearchRoundedIcon />
                </Link>
            </div>
            {user && (
                <>
                    <div className="header-icon">
                        <NotificationsNoneRoundedIcon />
                    </div>
                    <div className="header-icon">
                        <PermIdentityRoundedIcon />
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;
