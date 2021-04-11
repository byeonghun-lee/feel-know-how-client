import React from "react";

import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";

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
                <h3 className="card-component-title">{cardInfo.title}</h3>
                <p className="card-component-desc">{cardInfo.desc}</p>
                <p className="card-component-url">{cardInfo.url}</p>
            </div>
        </a>
    );
};

export default CardComponent;
