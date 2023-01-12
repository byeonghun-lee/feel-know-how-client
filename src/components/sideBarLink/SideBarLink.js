import React from "react";
import { Link } from "react-router-dom";
import cx from "classnames";

import "./SideBarLink.scss";

const SideBarLink = ({ children, active, ...rest }) => {
    return (
        <Link {...rest} className={cx("side-bar-link", { active: active })}>
            {children}
        </Link>
    );
};

export default SideBarLink;
