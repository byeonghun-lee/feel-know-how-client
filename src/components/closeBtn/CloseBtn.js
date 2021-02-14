import React from "react";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import "./CloseBtn.scss";

const CloseBtn = ({ onClose }) => (
    <button type="button" onClick={onClose} className="close-btn">
        <CloseRoundedIcon fontSize="large" />
    </button>
);

export default CloseBtn;
