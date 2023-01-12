import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import InboxIcon from "@material-ui/icons/Inbox";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";

import "./DrawerList.scss";

const DrawerList = () => {
    const nickname = useSelector(({ auth }) => auth.info && auth.info.nickname);
    const drawerList = useSelector(({ drawer }) => drawer.list);

    return (
        <div className="drawer-list-page">
            <Link to="/new-drawer" className="move-to-new-drawer">
                <AddTwoToneIcon className="add-drawer-icon" />
                <h3>New Drawer</h3>
            </Link>
            {drawerList.length ? (
                <ul className="drawer-list">
                    {drawerList.map((drawer, index) => (
                        <li key={index} className="drawer-item">
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
