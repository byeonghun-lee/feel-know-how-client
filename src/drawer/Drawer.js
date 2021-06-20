import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
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
    const { drawerName, nickName } = useParams();
    const dispatch = useDispatch();
    const cardListPage = useSelector(({ card }) => card.list);

    const onToggleReadStatus = (cardId) => {
        dispatch(updateCardReadStatus(cardId));
    };

    useEffect(() => {
        dispatch(getList({ nickName, drawerName }));
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
                    onToggleReadStatus={onToggleReadStatus}
                />
            ))}
            {cardListPage.isOwner && <AddCardBtn />}
        </div>
    );
};

export default Drawer;
