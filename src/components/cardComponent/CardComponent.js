import React from "react";

import Switch from "@material-ui/core/Switch";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import LinkRoundedIcon from "@material-ui/icons/LinkRounded";
import LaunchRoundedIcon from "@material-ui/icons/LaunchRounded";
import { withStyles } from "@material-ui/core/styles";

import "./CardComponent.scss";

const PurpleSwitch = withStyles({
    switchBase: {
        color: "#e0e0e0",
        "&$checked": {
            color: "#9575cd",
        },
        "&$checked + $track": {
            backgroundColor: "#9575cd",
        },
    },
    checked: {},
    track: {},
})(Switch);

const CardComponent = ({ cardInfo, onToggleReadStatus }) => {
    const siteNameUrl = cardInfo.url.replace("https://", "").split("/")[0];

    return (
        <div className="card-component">
            <div className="corner-btn-area">
                <MoreVertRoundedIcon className="corner-btn" />
            </div>
            <div className="text-contents">
                <a
                    className="title-area"
                    href={cardInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LinkRoundedIcon className="link-icon" />
                    <h3 className="card-component-title">{cardInfo.title}</h3>
                </a>
                <p className="card-component-desc">{cardInfo.desc}</p>
                <ul className="status-list">
                    <li>
                        <h4>Link</h4>
                        <div className="site-url-tag">
                            {siteNameUrl.split(".").length > 2
                                ? siteNameUrl.split(".")[1]
                                : siteNameUrl.split(".")[0]}
                        </div>
                        <a
                            href={cardInfo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-tag"
                        >
                            <LaunchRoundedIcon className="launch-icon" />
                            link
                        </a>
                    </li>
                    <li>
                        <h4>Read Status</h4>
                        <PurpleSwitch
                            checked={cardInfo.isRead}
                            onChange={() => onToggleReadStatus(cardInfo._id)}
                        />
                    </li>
                </ul>
                {/* <p className="card-component-url">{cardInfo.url}</p> */}
            </div>
        </div>
    );
};

export default CardComponent;
