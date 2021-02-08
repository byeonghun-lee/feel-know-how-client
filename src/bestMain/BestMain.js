import React from "react";
import BestCardComponent from "components/bestCardComponent/BestCardComponent";

import "./BestMain.scss";

const BestMain = () => {
    const test = "";

    return (
        <div id="best-main">
            {[
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
            ].map(() => (
                <BestCardComponent />
            ))}
        </div>
    );
};

export default BestMain;
