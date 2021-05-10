import React from "react";
import { Link } from "react-router-dom";

import MoveToInboxRoundedIcon from "@material-ui/icons/MoveToInboxRounded";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";

import "./BestCardComponent.scss";

const BestCardComponent = ({ drawer }) => (
    <Link className="best-card-component" to={drawer.link}>
        <div className="corner-btn-area">
            <MoreVertRoundedIcon className="corner-btn" />
        </div>
        <h3 className="drawer-title">{drawer.name}</h3>
        <p className="drawer-user-nickname">@{drawer.userNickname}</p>
        <p className="drawer-desc">{drawer.desc}</p>
        <div className="bottom-area">
            <div className="star-area">
                <StarRoundedIcon className="star-icon" />
                <p>{drawer.likeCounts}</p>
            </div>
            <div className="fork-area">
                <MoveToInboxRoundedIcon className="fork-icon" />
                <p>{drawer.forkCounts}</p>
            </div>
        </div>
    </Link>
);

export default BestCardComponent;
