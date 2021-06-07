import React from "react";

import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import LinkRoundedIcon from "@material-ui/icons/LinkRounded";

import "./CardComponent.scss";

const CardComponent = ({ cardInfo }) => {
    return (
        <a
            className="card-component"
            href={cardInfo.url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="corner-btn-area">
                <MoreVertRoundedIcon className="corner-btn" />
            </div>
            <div className="text-contents">
                <div className="title-area">
                    <LinkRoundedIcon className="link-icon" />
                    <h3 className="card-component-title">{cardInfo.title}</h3>
                </div>
                <p className="card-component-desc">{cardInfo.desc}</p>
                <p className="card-component-url">{cardInfo.url}</p>
            </div>
        </a>
    );
};

export default CardComponent;
