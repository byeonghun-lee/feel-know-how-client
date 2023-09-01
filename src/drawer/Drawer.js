import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";

import LockOutlined from "@material-ui/icons/LockOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";

import AddCardBtn from "components/addCardBtn/AddCardBtn";
import CardComponent from "components/cardComponent/CardComponent";

import {
    getList,
    resetList,
    updateCardReadStatus,
} from "service/card/cardSlice";

import "./Drawer.scss";

const Drawer = () => {
    const { drawerUniqueName, nickname } = useParams();
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
            dispatch(getList({ nickname, drawerUniqueName }));
        }
        return () => dispatch(resetList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, drawerUniqueName]);

    if (!cardListPage.drawerName) return null;

    return (
        <div className="drawer-page">
            <div className="drawer-contents">
                <div className="title-area">
                    <div className="title">
                        {cardListPage.allPublic ? (
                            <ShareOutlinedIcon />
                        ) : (
                            <LockOutlined />
                        )}
                        <h2>{cardListPage.drawerName}</h2>
                    </div>
                    <p className="desc">{cardListPage.drawerDesc}</p>
                    <ul className="tag-list">
                        {cardListPage.tagList.map((tag, tagIndex) => (
                            <li key={tagIndex}>{tag}</li>
                        ))}
                    </ul>
                </div>
                <div className="card-list">
                    {cardListPage.cardList.map((cardInfo, index) => (
                        <CardComponent
                            key={index}
                            cardInfo={cardInfo}
                            isOwner={cardListPage.isOwner}
                            onToggleReadStatus={onToggleReadStatus}
                        />
                    ))}
                </div>
            </div>
            {cardListPage.isOwner && !isMobile && <AddCardBtn />}
        </div>
    );
};

export default Drawer;
