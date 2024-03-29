import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setStandardForNewCard } from "service/drawer/drawerSlice";

import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import InboxIcon from "@material-ui/icons/Inbox";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";

import "./DrawerList.scss";

const DrawerList = () => {
    const dispatch = useDispatch();
    const nickname = useSelector(({ auth }) => auth.info && auth.info.nickname);
    const drawerList = useSelector(({ drawer }) => drawer.list);

    const setActiveItem = ({ name, drawerId, allPublic }) => {
        sessionStorage.setItem(
            "drawer",
            JSON.stringify({ name, drawerId, allPublic })
        );
        dispatch(setStandardForNewCard({ name, drawerId, allPublic }));
    };

    return (
        <div className="drawer-list-page">
            <Link to="/new-drawer" className="move-to-new-drawer">
                <AddTwoToneIcon className="add-drawer-icon" />
                <h3>새로운 서랍 만들기</h3>
            </Link>
            {drawerList.length ? (
                <ul className="drawer-list">
                    {drawerList.map((drawer, index) => (
                        <li
                            key={index}
                            className="drawer-item"
                            onClick={() =>
                                setActiveItem({
                                    name: drawer.name,
                                    drawerId: drawer._id,
                                    allPublic: drawer.allPublic,
                                })
                            }
                        >
                            <Link to={`/@${nickname}/${drawer.name}`}>
                                {drawer.allPublic ? (
                                    <ShareOutlinedIcon className="category-icon" />
                                ) : (
                                    <InboxIcon className="category-icon" />
                                )}
                                <p className="drawer-name">{drawer.name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                ""
            )}
        </div>
    );
};

export default DrawerList;
