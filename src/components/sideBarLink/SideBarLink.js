import React from "react";
import { Link } from "react-router-dom";
import cx from "classnames";

import "./SideBarLink.scss";

const SideBarLink = ({
    children,
    handleSideMenuStatusInMobile,
    active,
    ...rest
}) => {
    const closeSidebar = () => {
        if (window.innerWidth > 768) {
            return;
        }
        handleSideMenuStatusInMobile((prev) => !prev);
    };

    return (
        <Link
            {...rest}
            onClick={closeSidebar}
            className={cx("side-bar-link", { active: active })}
        >
            {children}
        </Link>
    );
};

export default SideBarLink;
