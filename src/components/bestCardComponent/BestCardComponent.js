import React from "react";

import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import MoveToInboxRoundedIcon from "@material-ui/icons/MoveToInboxRounded";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";

import "./BestCardComponent.scss";

const BestCardComponent = () => (
    <div className="best-card-component">
        <div className="corner-btn-area">
            {/* <StarBorderRoundedIcon className="corner-btn" /> */}
            <MoreVertRoundedIcon className="corner-btn" />
        </div>
        {/* <div className="profile-thumbnail" /> */}
        <h3 className="drawer-title">개발자 취업 관련 링크</h3>
        <p className="drawer-desc">
            개발자 취업을 위해 분류한 목록입니다. 4개의 리스트로 분류 해놨고
            도움이 되었으면 좋겠습니다. @kim님...
        </p>
        <div className="bottom-area">
            <div className="star-area">
                <StarRoundedIcon className="star-icon" />
                <p>1,927</p>
            </div>
            <div className="fork-area">
                <MoveToInboxRoundedIcon className="fork-icon" />
                <p>200</p>
            </div>
        </div>
    </div>
);

export default BestCardComponent;
