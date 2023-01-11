import React from "react";
import { Link } from "react-router-dom";

import StarRoundedIcon from "@material-ui/icons/StarRounded";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import HomeIcon from "@material-ui/icons/Home";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";

import "./MobileNavigation.scss";

const MobileNavigation = () => {
    return (
        <nav className="mobile-navigation">
            <Link className="bar-item" to="/">
                <HomeIcon />
                <h2>홈</h2>
            </Link>
            <div className="bar-item">
                <AllInboxIcon />
                <h2>Drawers</h2>
            </div>
            <div className="bar-item add-item">
                <AddCircleIcon className="add-item-icon" />
            </div>
            <Link className="bar-item" to="/">
                <StarRoundedIcon />
                <h2>Best</h2>
            </Link>
            <div className="bar-item">
                <SettingsRoundedIcon />
                <h2>설정</h2>
            </div>
        </nav>
    );
};

export default MobileNavigation;
