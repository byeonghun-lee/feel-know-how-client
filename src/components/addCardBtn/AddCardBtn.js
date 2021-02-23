import React from "react";
import { useHistory } from "react-router-dom";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";

import "./AddCardBtn.scss";

const AddCardBtn = () => {
    const history = useHistory();

    return (
        <>
            <button
                type="button"
                className="add-card-btn"
                onClick={() => history.push(`/new-card`)}
            >
                <AddTwoToneIcon fontSize="large" />
            </button>
        </>
    );
};

export default AddCardBtn;
