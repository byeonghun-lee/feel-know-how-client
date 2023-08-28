import React from "react";
import { Link, useLocation } from "react-router-dom";
import cx from "classnames";

import StarRoundedIcon from "@material-ui/icons/StarRounded";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";
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
                <h2>서랍</h2>
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
                        location.pathname === "/read-today" ||
                        location.search === "?return-page=read-today",
                })}
                to="/read-today"
            >
                <PlaylistAddCheckOutlinedIcon />
                <h2>오늘 읽기</h2>
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
                <h2>설정</h2>
            </Link>
        </nav>
    );
};

export default MobileNavigation;
