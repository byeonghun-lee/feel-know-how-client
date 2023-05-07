import React from "react";
import { Link, useLocation } from "react-router-dom";
import cx from "classnames";

import StarRoundedIcon from "@material-ui/icons/StarRounded";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import InboxIcon from "@material-ui/icons/Inbox";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";

import "./MobileNavigation.scss";

const MobileNavigation = () => {
    const location = useLocation();

    return (
        <nav className="mobile-navigation">
            <Link
                className={cx("bar-item", {
                    active: location.pathname === "/",
                })}
                to="/"
            >
                <StarRoundedIcon />
                <h2>Best</h2>
            </Link>
            <Link
                className={cx("bar-item", {
                    active:
                        location.pathname === "/drawers" ||
                        location.search === "?return-page=drawers",
                })}
                to="/drawers"
            >
                <AllInboxIcon />
                <h2>Drawers</h2>
            </Link>
            <Link
                className={cx("bar-item add-item", {
                    active:
                        location.pathname === "/new-card" ||
                        location.search === "?return-page=new-card",
                })}
                to="/new-card"
            >
                <AddCircleIcon className="add-item-icon" />
            </Link>
            <Link
                className={cx("bar-item", {
                    active:
                        location.pathname === "/in-box" ||
                        location.search === "?return-page=in-box",
                })}
                to="/in-box"
            >
                <InboxIcon />
                <h2>Inbox</h2>
            </Link>
            <Link
                className={cx("bar-item", {
                    active:
                        location.pathname === "/setting" ||
                        location.search === "?return-page=setting",
                })}
                to="/setting"
            >
                <SettingsRoundedIcon />
                <h2>Setting</h2>
            </Link>
        </nav>
    );
};

export default MobileNavigation;
