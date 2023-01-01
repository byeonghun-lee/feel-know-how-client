import React, { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";

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
    const kakaoAdBox = useRef();

    const onToggleReadStatus = ({ cardId, e }) => {
        e.stopPropagation();
        if (!cardListPage.isOwner) return;
        dispatch(updateCardReadStatus(cardId));
    };

    useEffect(() => {
        const ins = document.createElement("ins");
        ins.className = "kakao_ad_area";
        ins.style = "display:none; width:100%;";
        const adUnit = {
            width: "160",
            height: "600",
            value: "DAN-Y2rrbLzkjMqOPefK",
        };

        if (isMobile) {
            adUnit.width = "320";
            adUnit.height = "50";
            adUnit.value = "DAN-MUlLDLfUfKZtpv7Q";
        }
        ins.setAttribute("data-ad-width", adUnit.width);
        ins.setAttribute("data-ad-height", adUnit.height);
        ins.setAttribute("data-ad-unit", adUnit.value);

        const scr = document.createElement("script");
        scr.async = "true";
        scr.type = "text/javascript";
        scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";

        if (kakaoAdBox.current) {
            kakaoAdBox.current.appendChild(ins);
            kakaoAdBox.current.appendChild(scr);
        }
    }, [cardListPage.drawerName]);

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
            <div className="kakao-ad-box" ref={kakaoAdBox}></div>
            <div className="drawer-contents">
                <div className="title-area">
                    <h2>{cardListPage.drawerName}</h2>
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
            {cardListPage.isOwner && <AddCardBtn />}
        </div>
    );
};

export default Drawer;
