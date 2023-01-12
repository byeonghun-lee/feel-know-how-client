import React from "react";
import { Link } from "react-router-dom";

import StarRoundedIcon from "@material-ui/icons/StarRounded";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import InboxIcon from "@material-ui/icons/Inbox";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";

import "./MobileNavigation.scss";

const MobileNavigation = () => {
    return (
        <nav className="mobile-navigation">
            <Link className="bar-item" to="/">
                <StarRoundedIcon />
                <h2>Best</h2>
            </Link>
            <Link className="bar-item" to="/drawers">
                <AllInboxIcon />
                <h2>Drawers</h2>
            </Link>
            <Link className="bar-item add-item" to="new-card">
                <AddCircleIcon className="add-item-icon" />
            </Link>
            <Link className="bar-item" to="/in-box">
                <InboxIcon />
                <h2>Inbox</h2>
            </Link>
            <Link className="bar-item" to="/setting">
                <SettingsRoundedIcon />
                <h2>Setting</h2>
            </Link>
        </nav>
    );
};

export default MobileNavigation;
