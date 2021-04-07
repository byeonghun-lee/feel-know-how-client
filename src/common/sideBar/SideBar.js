import React from "react";
import { Link, useLocation } from "react-router-dom";
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
// import UnfoldMoreRoundedIcon from "@material-ui/icons/UnfoldMoreRounded";

import "./SideBar.scss";

const SideBar = ({ isLogin }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const nickname = useSelector(({ auth }) => auth.info && auth.info.nickname);
    const drawerList = useSelector(({ drawer }) => drawer.list);
    const standardForNewCard = useSelector(
        ({ drawer }) => drawer.standardForNewCard
    );

    const setActiveItem = ({ name, drawerId }) => {
        dispatch(setStandardForNewCard({ name, drawerId }));
    };

    return (
        <nav className="side-bar">
            <div className="title-area">
                {isLogin ? <h1>{nickname}'s drawer</h1> : <h1>oh My Drawer</h1>}
            </div>
            <div className="main-box-area">
                <Link to="/" className="move-to-main-btn">
                    <div className="best-list-icon">
                        <StarRoundedIcon />
                    </div>
                    <h3>Best Drawer</h3>
                </Link>
                {/* <UnfoldMoreRoundedIcon className="drop-down-btn" /> */}
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
                                  >
                                      <Link
                                          to={`/@${nickname}/${drawer.name}`}
                                          className="item-inner"
                                          onClick={() =>
                                              setActiveItem({
                                                  name: drawer.name,
                                                  drawerId: drawer._id,
                                              })
                                          }
                                      >
                                          {drawer.allPublic ? (
                                              <ShareOutlinedIcon className="category-icon" />
                                          ) : (
                                              <InboxIcon className="category-icon" />
                                          )}
                                          <p>{drawer.name}</p>
                                      </Link>
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
                        >
                            <Link
                                to="/in-box"
                                className="item-inner"
                                onClick={() => setActiveItem({})}
                            >
                                <AllInboxIcon className="category-icon" />
                                <p>InBox</p>
                            </Link>
                        </li>
                        <li
                            className={cx("category-item", {
                                active: location.pathname === "/trash",
                            })}
                        >
                            <Link
                                to="/trash"
                                className="item-inner"
                                onClick={() => setActiveItem({})}
                            >
                                <DeleteForeverRoundedIcon className="category-icon" />
                                <p>Trash</p>
                            </Link>
                        </li>
                        <li
                            className={cx("category-item", {
                                active: location.pathname === "/setting",
                            })}
                        >
                            <Link
                                to="/setting"
                                className="item-inner"
                                onClick={() => setActiveItem({})}
                            >
                                <SettingsRoundedIcon className="category-icon" />
                                <p>Setting</p>
                            </Link>
                        </li>
                    </ul>
                    <Link to="/new-drawer" className="move-to-new-drawer-page">
                        <AddTwoToneIcon className="add-drawer-icon" />
                        New Drawer
                    </Link>
                </>
            ) : (
                <>
                    <ul className="non-login">
                        <li
                            className={cx("category-item", {
                                active: location.pathname === "/login",
                            })}
                        >
                            <Link to="/login" className="item-inner">
                                <AccountBoxIcon className="category-icon" />
                                <p>Login</p>
                            </Link>
                        </li>
                        <li
                            className={cx("category-item", {
                                active: location.pathname === "/signup",
                            })}
                        >
                            <Link to="/signup" className="item-inner">
                                <PersonAddIcon className="category-icon" />
                                <p>New accounts</p>
                            </Link>
                        </li>
                    </ul>
                </>
            )}
        </nav>
    );
};

export default SideBar;
