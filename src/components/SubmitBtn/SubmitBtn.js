import React from "react";

import "./SubmitBtn.scss";

const SubmitBtn = ({ text = "Create" }) => (
    <button type="submit" className="submit-btn-component">
        {text}
    </button>
);

export default SubmitBtn;
