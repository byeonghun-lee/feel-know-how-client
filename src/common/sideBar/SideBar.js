import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import cx from "classnames";
import { useSelector, useDispatch } from "react-redux";

import { setStandardForNewCard } from "service/drawer/drawerSlice";

import AllInboxIcon from "@material-ui/icons/AllInbox";
import InboxIcon from "@material-ui/icons/Inbox";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import SideBarLink from "components/sideBarLink/SideBarLink";

import "./SideBar.scss";

const SideBar = ({ isLogin }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [sideMenuStatusInMobile, handleSideMenuStatusInMobile] =
        useState(false);

    const nickname = useSelector(({ auth }) => auth.info && auth.info.nickname);
    const drawerList = useSelector(({ drawer }) => drawer.list);
    const standardForNewCard = useSelector(
        ({ drawer }) => drawer.standardForNewCard
    );

    const setActiveItem = ({ name, drawerId }) => {
        sessionStorage.setItem("drawer", JSON.stringify({ name, drawerId }));
        dispatch(setStandardForNewCard({ name, drawerId }));
    };

    useEffect(() => {
        const savedDrawerInStorage = JSON.parse(
            sessionStorage.getItem("drawer")
        );
        if (savedDrawerInStorage && savedDrawerInStorage.drawerId) {
            dispatch(setStandardForNewCard(savedDrawerInStorage));
        }
    }, [dispatch]);

    return (
        <nav
            className={cx("side-bar", {
                "show-mobile-side-menu": sideMenuStatusInMobile,
            })}
        >
            <button
                className="mobile-side-menu-btn"
                onClick={() =>
                    handleSideMenuStatusInMobile(!sideMenuStatusInMobile)
                }
            >
                {sideMenuStatusInMobile ? (
                    <CloseRoundedIcon style={{ fontSize: 30 }} />
                ) : (
                    <MenuRoundedIcon style={{ fontSize: 30 }} />
                )}
            </button>
            <div className="title-area">
                {isLogin ? <h1>{nickname}'s drawer</h1> : <h1>oh My Drawer</h1>}
            </div>
            <div className="main-box-area">
                <SideBarLink
                    to="/"
                    className="move-to-main-btn"
                    handleSideMenuStatusInMobile={handleSideMenuStatusInMobile}
                >
                    <div className="best-list-icon-wrapper">
                        <StarRoundedIcon className="best-list-icon" />
                    </div>
                    <h3>Best Drawer</h3>
                </SideBarLink>
            </div>
            {isLogin ? (
                <>
                    <ul>
                        {drawerList.length
                            ? drawerList.map((drawer, index) => (
                                  <li
                                      key={index}
                                      className={cx("category-item", {
                                          active:
                                              standardForNewCard.drawerId ===
                                              drawer._id,
                                      })}
                                      onClick={() =>
                                          setActiveItem({
                                              name: drawer.name,
                                              drawerId: drawer._id,
                                          })
                                      }
                                  >
                                      <SideBarLink
                                          to={`/@${nickname}/${drawer.name}`}
                                          className="item-inner"
                                          handleSideMenuStatusInMobile={
                                              handleSideMenuStatusInMobile
                                          }
                                      >
                                          {drawer.allPublic ? (
                                              <ShareOutlinedIcon className="category-icon" />
                                          ) : (
                                              <InboxIcon className="category-icon" />
                                          )}
                                          <p>{drawer.name}</p>
                                      </SideBarLink>
                                  </li>
                              ))
                            : ""}
                    </ul>
                    <h2>Default</h2>
                    <ul>
                        <li
                            className={cx("category-item", {
                                active: location.pathname === "/in-box",
                            })}
                            onClick={() => setActiveItem({})}
                        >
                            <SideBarLink
                                to="/in-box"
                                className="item-inner"
                                handleSideMenuStatusInMobile={
                                    handleSideMenuStatusInMobile
                                }
                            >
                                <AllInboxIcon className="category-icon" />
                                <p>InBox</p>
                            </SideBarLink>
                        </li>
                        <li
                            className={cx("category-item", {
                                active: location.pathname === "/trash",
                            })}
                            onClick={() => setActiveItem({})}
                        >
                            <SideBarLink
                                to="/trash"
                                className="item-inner"
                                handleSideMenuStatusInMobile={
                                    handleSideMenuStatusInMobile
                                }
                            >
                                <DeleteForeverRoundedIcon className="category-icon" />
                                <p>Trash</p>
                            </SideBarLink>
                        </li>
                        <li
                            className={cx("category-item", {
                                active: location.pathname === "/setting",
                            })}
                            onClick={() => setActiveItem({})}
                        >
                            <SideBarLink
                                to="/setting"
                                className="item-inner"
                                handleSideMenuStatusInMobile={
                                    handleSideMenuStatusInMobile
                                }
                            >
                                <SettingsRoundedIcon className="category-icon" />
                                <p>Setting</p>
                            </SideBarLink>
                        </li>
                    </ul>
                    <SideBarLink
                        to="/new-drawer"
                        className="move-to-new-drawer-page"
                        handleSideMenuStatusInMobile={
                            handleSideMenuStatusInMobile
                        }
                    >
                        <AddTwoToneIcon className="add-drawer-icon" />
                        New Drawer
                    </SideBarLink>
                </>
            ) : (
                <>
                    <ul className="non-login">
                        <li
                            className={cx("category-item", {
                                active: location.pathname === "/login",
                            })}
                        >
                            <SideBarLink
                                to="/login"
                                className="item-inner"
                                handleSideMenuStatusInMobile={
                                    handleSideMenuStatusInMobile
                                }
                            >
                                <AccountBoxIcon className="category-icon" />
                                <p>Login</p>
                            </SideBarLink>
                        </li>
                        <li
                            className={cx("category-item", {
                                active: location.pathname === "/sign-up",
                            })}
                        >
                            <SideBarLink
                                to="/sign-up"
                                className="item-inner"
                                handleSideMenuStatusInMobile={
                                    handleSideMenuStatusInMobile
                                }
                            >
                                <PersonAddIcon className="category-icon" />
                                <p>New accounts</p>
                            </SideBarLink>
                        </li>
                    </ul>
                </>
            )}
        </nav>
    );
};

export default SideBar;
