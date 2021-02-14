import React from "react";
import { useHistory, useParams } from "react-router-dom";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";

import "./AddCardBtn.scss";

const AddCardBtn = () => {
    const history = useHistory();
    const { nickName } = useParams();

    return (
        <>
            <button
                type="button"
                className="add-card-btn"
                onClick={() => history.push(`/@${nickName}/new-card`)}
            >
                <AddTwoToneIcon fontSize="large" />
            </button>
        </>
    );
};

export default AddCardBtn;
