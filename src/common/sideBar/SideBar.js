import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import cx from "classnames";
import { useSelector, useDispatch } from "react-redux";

import { setStandardForNewCard } from "service/drawer/drawerSlice";

import AllInboxIcon from "@material-ui/icons/AllInbox";
import LockOutlined from "@material-ui/icons/LockOutlined";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";

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

    const setActiveItem = ({ name, drawerId, allPublic }) => {
        sessionStorage.setItem(
            "drawer",
            JSON.stringify({ name, drawerId, allPublic })
        );
        dispatch(setStandardForNewCard({ name, drawerId, allPublic }));
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
            <ul className="main-box-area">
                <li onClick={() => setActiveItem({})}>
                    <SideBarLink
                        to="/"
                        handleSideMenuStatusInMobile={
                            handleSideMenuStatusInMobile
                        }
                        active={location.pathname === "/"}
                    >
                        <StarRoundedIcon className="best-list-icon" />
                        <h3>Best Drawer</h3>
                    </SideBarLink>
                </li>
                <li onClick={() => setActiveItem({})}>
                    <SideBarLink
                        to="/new-drawer"
                        handleSideMenuStatusInMobile={
                            handleSideMenuStatusInMobile
                        }
                        active={location.pathname === "/new-drawer"}
                    >
                        <AddTwoToneIcon className="add-drawer-icon" />
                        <h3>New Drawer</h3>
                    </SideBarLink>
                </li>
            </ul>
            {isLogin ? (
                <div className="user-side-bar">
                    <ul>
                        {drawerList.length
                            ? drawerList.map((drawer, index) => (
                                  <li
                                      key={index}
                                      onClick={() =>
                                          setActiveItem({
                                              name: drawer.name,
                                              drawerId: drawer._id,
                                              allPublic: drawer.allPublic,
                                          })
                                      }
                                  >
                                      <SideBarLink
                                          to={`/@${nickname}/${drawer.name}`}
                                          handleSideMenuStatusInMobile={
                                              handleSideMenuStatusInMobile
                                          }
                                          active={
                                              standardForNewCard.drawerId ===
                                              drawer._id
                                          }
                                      >
                                          {drawer.allPublic ? (
                                              <ShareOutlinedIcon className="category-icon" />
                                          ) : (
                                              <LockOutlined className="category-icon" />
                                          )}
                                          <p>{drawer.name}</p>
                                      </SideBarLink>
                                  </li>
                              ))
                            : ""}
                    </ul>
                    <h2>Default</h2>
                    <ul>
                        <li onClick={() => setActiveItem({})}>
                            <SideBarLink
                                to="/read-today"
                                handleSideMenuStatusInMobile={
                                    handleSideMenuStatusInMobile
                                }
                                active={location.pathname === "/read-today"}
                            >
                                <PlaylistAddCheckOutlinedIcon className="category-icon" />
                                <p>오늘 읽기</p>
                            </SideBarLink>
                            <SideBarLink
                                to="/in-box"
                                handleSideMenuStatusInMobile={
                                    handleSideMenuStatusInMobile
                                }
                                active={location.pathname === "/in-box"}
                            >
                                <AllInboxIcon className="category-icon" />
                                <p>임시 보관</p>
                            </SideBarLink>
                        </li>
                        <li onClick={() => setActiveItem({})}>
                            <SideBarLink
                                to="/trash"
                                handleSideMenuStatusInMobile={
                                    handleSideMenuStatusInMobile
                                }
                                active={location.pathname === "/trash"}
                            >
                                <DeleteForeverRoundedIcon className="category-icon" />
                                <p>휴지통</p>
                            </SideBarLink>
                        </li>
                        <li onClick={() => setActiveItem({})}>
                            <SideBarLink
                                to="/setting"
                                handleSideMenuStatusInMobile={
                                    handleSideMenuStatusInMobile
                                }
                                active={location.pathname === "/setting"}
                            >
                                <SettingsRoundedIcon className="category-icon" />
                                <p>설정</p>
                            </SideBarLink>
                        </li>
                    </ul>
                </div>
            ) : (
                <>
                    <ul className="non-login">
                        <li>
                            <SideBarLink
                                to="/how-to-use"
                                handleSideMenuStatusInMobile={
                                    handleSideMenuStatusInMobile
                                }
                                active={location.pathname === "/hot-to-use"}
                            >
                                <HelpOutlineOutlinedIcon className="category-icon" />
                                <p>이용 방법</p>
                            </SideBarLink>
                        </li>
                        <li>
                            <SideBarLink
                                to="/login"
                                handleSideMenuStatusInMobile={
                                    handleSideMenuStatusInMobile
                                }
                                active={location.pathname === "/login"}
                            >
                                <AccountBoxIcon className="category-icon" />
                                <p>로그인</p>
                            </SideBarLink>
                        </li>
                        <li
                            className={cx("category-item", {
                                active: location.pathname === "/sign-up",
                            })}
                        >
                            <SideBarLink
                                to="/sign-up"
                                handleSideMenuStatusInMobile={
                                    handleSideMenuStatusInMobile
                                }
                                active={location.pathname === "/sign-up"}
                            >
                                <PersonAddIcon className="category-icon" />
                                <p>회원가입</p>
                            </SideBarLink>
                        </li>
                    </ul>
                </>
            )}
        </nav>
    );
};

export default SideBar;
