import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import BestCardComponent from "components/bestCardComponent/BestCardComponent";

import { getList } from "service/bestMain/bestMainSlice";

import "./BestMain.scss";

const BestMain = () => {
    const dispatch = useDispatch();
    const drawerTotalCount = useSelector(({ bestMain }) => bestMain.totalCount);
    const drawerList = useSelector(({ bestMain }) => bestMain.list);

    const getBestMain = ({ skip = 0 }) => {
        dispatch(getList({ skip }));
    };

    useEffect(() => {
        getBestMain({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div id="best-main">
            {drawerList.map((drawer, index) => (
                <BestCardComponent drawer={drawer} key={index} />
            ))}
        </div>
    );
};

export default BestMain;
