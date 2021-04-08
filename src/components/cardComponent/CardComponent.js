import React from "react";

import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";

import "./CardComponent.scss";

const CardComponent = ({ cardInfo }) => {
    const test = "";

    return (
        <div className="card-component">
            <div className="corner-btn-area">
                <MoreVertRoundedIcon className="corner-btn" />
            </div>
            <div className="text-contents">
                <h3 className="card-component-title">{cardInfo.title}</h3>
                <p className="card-component-desc">{cardInfo.desc}</p>
                <p className="card-component-url">{cardInfo.url}</p>
            </div>
        </div>
    );
};

export default CardComponent;
