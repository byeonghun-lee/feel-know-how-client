import React from "react";

import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";

import "./CardComponent.scss";

const CardComponent = () => {
    const test = "";

    return (
        <div className="card-component">
            <div className="corner-btn-area">
                <MoreVertRoundedIcon className="corner-btn" />
            </div>
            <div className="text-contents">
                <h3 className="card-component-title">card</h3>
                <p className="card-component-desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    sagittis sapien mi, at aliquam leo tempus sed. Curabitur
                    tempus, leo at egestas.
                </p>
                <p className="card-component-url">https://google.com</p>
            </div>
        </div>
    );
};

export default CardComponent;
