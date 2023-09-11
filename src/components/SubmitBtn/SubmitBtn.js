import React from "react";

import "./SubmitBtn.scss";

const SubmitBtn = ({ text = "생성", disabled }) => (
    <button type="submit" className="submit-btn-component" disabled={disabled}>
        {text}
    </button>
);

export default SubmitBtn;
