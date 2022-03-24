import React from "react";

import Switch from "@material-ui/core/Switch";
// import LinkRoundedIcon from "@material-ui/icons/LinkRounded";
// import LaunchRoundedIcon from "@material-ui/icons/LaunchRounded";
import OpenInNewRoundedIcon from "@material-ui/icons/OpenInNewRounded";
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

const CardComponent = ({ cardInfo, onToggleReadStatus, isOwner }) => {
    const siteNameUrl = cardInfo.url.replace("https://", "").split("/")[0];

    return (
        <a
            className="card-component"
            href={cardInfo.url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="corner-btn-area">
                <OpenInNewRoundedIcon className="link-icon" />
            </div>
            <div className="text-contents">
                <a
                    className="title-area"
                    href={cardInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h3 className="card-component-title">{cardInfo.title}</h3>
                </a>
                <p className="card-component-desc">{cardInfo.desc}</p>
                <ul className="status-list">
                    <li>
                        <h4>Site Name</h4>
                        <div className="site-url-tag">
                            {siteNameUrl.split(".").length > 2
                                ? siteNameUrl.split(".")[1]
                                : siteNameUrl.split(".")[0]}
                        </div>
                        {/* <a
                            href={cardInfo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-tag"
                        >
                            <LaunchRoundedIcon className="launch-icon" />
                            link
                        </a> */}
                    </li>
                    <li>
                        <h4>Read Status</h4>
                        <PurpleSwitch
                            checked={cardInfo.isRead}
                            onChange={(e) =>
                                onToggleReadStatus({
                                    cardId: cardInfo._id,
                                    e,
                                })
                            }
                        />
                    </li>
                </ul>
                {isOwner && (
                    <button type="button" className="edit-btn">
                        수정
                    </button>
                )}
                {/* <p className="card-component-url">{cardInfo.url}</p> */}
            </div>
        </a>
    );
};

export default CardComponent;
