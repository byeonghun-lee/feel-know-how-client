import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AddCardBtn from "components/addCardBtn/AddCardBtn";
import CardComponent from "components/cardComponent/CardComponent";

import {
    getList,
    resetList,
    updateCardReadStatus,
} from "service/card/cardSlice";

import "./Drawer.scss";

const Drawer = () => {
    const { drawerName, nickname } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.info);
    const cardListPage = useSelector(({ card }) => card.list);

    const onToggleReadStatus = ({ cardId, e }) => {
        e.stopPropagation();
        if (!cardListPage.isOwner) return;
        dispatch(updateCardReadStatus(cardId));
    };

    useEffect(() => {
        if (user && location.pathname === "/in-box") {
            dispatch(getList({ drawerName: "inbox" }));
        } else {
            dispatch(getList({ nickname, drawerName }));
        }
        return () => dispatch(resetList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, drawerName]);

    if (!cardListPage.drawerName) return null;

    return (
        <div className="drawer-page">
            <div className="title-area">
                <h2>{cardListPage.drawerName}</h2>
                <p className="desc">{cardListPage.drawerDesc}</p>
                <ul className="tag-list">
                    {cardListPage.tagList.map((tag, tagIndex) => (
                        <li key={tagIndex}>{tag}</li>
                    ))}
                </ul>
            </div>
            {cardListPage.cardList.map((cardInfo, index) => (
                <CardComponent
                    key={index}
                    cardInfo={cardInfo}
                    isOwner={cardListPage.isOwner}
                    onToggleReadStatus={onToggleReadStatus}
                />
            ))}
            {cardListPage.isOwner && <AddCardBtn />}
        </div>
    );
};

export default Drawer;
