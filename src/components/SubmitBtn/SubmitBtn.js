import React from "react";

import "./SubmitBtn.scss";

const SubmitBtn = ({ text = "생성" }) => (
    <button type="submit" className="submit-btn-component">
        {text}
    </button>
);

export default SubmitBtn;
