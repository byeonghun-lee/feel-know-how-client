import React from "react";
import { Link } from "react-router-dom";

const SideBarLink = ({ children, handleSideMenuStatusInMobile, ...rest }) => {
    const closeSidebar = () => {
        if (window.innerWidth > 768) {
            return;
        }
        handleSideMenuStatusInMobile((prev) => !prev);
    };

    return (
        <Link {...rest} onClick={closeSidebar}>
            {children}
        </Link>
    );
};

export default SideBarLink;
