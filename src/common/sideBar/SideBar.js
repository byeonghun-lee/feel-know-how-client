import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import cx from "classnames";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import InboxIcon from "@material-ui/icons/Inbox";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import UnfoldMoreRoundedIcon from "@material-ui/icons/UnfoldMoreRounded";

import "./SideBar.scss";

const SideBar = ({ isLogin }) => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState();
    const [nickName, setNickName] = useState("hun");

    useEffect(() => {
        if (location.pathname.indexOf("@") === 1) {
            setActiveItem(location.pathname.split("/")[2]);
        } else {
            setActiveItem(location.pathname);
        }
    }, [location]);

    return (
        <nav className={cx("side-bar", { "is-logined": isLogin })}>
            {isLogin && (
                <>
                    <div className="title-area">
                        <h1>hun's drawer</h1>
                    </div>
                    <div className="main-box-area">
                        <Link to="/" className="move-to-main-btn">
                            <div className="best-list-icon">
                                <AccountBalanceRoundedIcon fontSize="small" />
                            </div>
                            <h3>Best Drawer</h3>
                        </Link>
                        {/* <UnfoldMoreRoundedIcon className="drop-down-btn" /> */}
                    </div>
                    <ul>
                        <li
                            className={cx("category-item", {
                                active: activeItem === "project_1",
                            })}
                        >
                            <Link
                                to={`/@${nickName}/project_1`}
                                className="item-inner"
                            >
                                {activeItem === "project_1" && (
                                    <KeyboardArrowRightRoundedIcon className="active-icon" />
                                )}
                                <InboxIcon className="category-icon" />
                                <p>Project_1</p>
                            </Link>
                        </li>
                        <li
                            className={cx("category-item", {
                                active: activeItem === "project_2",
                            })}
                        >
                            <Link
                                to={`/@${nickName}/project_2`}
                                className="item-inner"
                            >
                                {activeItem === "project_2" && (
                                    <KeyboardArrowRightRoundedIcon className="active-icon" />
                                )}
                                <ShareOutlinedIcon className="category-icon" />
                                <p>Project_2</p>
                            </Link>
                        </li>
                        <li
                            className={cx("category-item", {
                                active: activeItem === "project_3",
                            })}
                        >
                            <Link
                                to={`/@${nickName}/project_3`}
                                className="item-inner"
                            >
                                {activeItem === "project_3" && (
                                    <KeyboardArrowRightRoundedIcon className="active-icon" />
                                )}
                                <InboxIcon className="category-icon" />
                                <p>Project_3</p>
                            </Link>
                        </li>
                        <li
                            className={cx("category-item", {
                                active: activeItem === "project_4",
                            })}
                        >
                            <Link
                                to={`/@${nickName}/project_4`}
                                className="item-inner"
                            >
                                {activeItem === "project_4" && (
                                    <KeyboardArrowRightRoundedIcon className="active-icon" />
                                )}
                                <InboxIcon className="category-icon" />
                                <p>Project_4</p>
                            </Link>
                        </li>
                    </ul>
                    <h2>Default</h2>
                    <ul>
                        <li
                            className={cx("category-item", {
                                active: activeItem === "/in-box",
                            })}
                        >
                            <Link to="/in-box" className="item-inner">
                                {activeItem === "/in-box" && (
                                    <KeyboardArrowRightRoundedIcon className="active-icon" />
                                )}
                                <AllInboxIcon className="category-icon" />
                                <p>InBox</p>
                            </Link>
                        </li>
                        <li
                            className={cx("category-item", {
                                active: activeItem === "/trash",
                            })}
                        >
                            <Link to="/trash" className="item-inner">
                                {activeItem === "/trash" && (
                                    <KeyboardArrowRightRoundedIcon className="active-icon" />
                                )}
                                <DeleteForeverRoundedIcon className="category-icon" />
                                <p>Trash</p>
                            </Link>
                        </li>
                        <li
                            className={cx("category-item", {
                                active: activeItem === "/setting",
                            })}
                        >
                            <Link to="/setting" className="item-inner">
                                {activeItem === "/setting" && (
                                    <KeyboardArrowRightRoundedIcon className="active-icon" />
                                )}
                                <SettingsRoundedIcon className="category-icon" />
                                <p>Setting</p>
                            </Link>
                        </li>
                    </ul>
                    <button type="button" className="add-drawer-btn">
                        <AddTwoToneIcon className="add-drawer-icon" />
                        New Drawer
                    </button>
                </>
            )}
        </nav>
    );
};

export default SideBar;
