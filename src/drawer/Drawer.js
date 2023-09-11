import React, { useEffect, useState } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";
import { removeDrawer as removeDrawerAPI } from "api/drawer";

import LockOutlined from "@material-ui/icons/LockOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import AddCardBtn from "components/addCardBtn/AddCardBtn";
import CardComponent from "components/cardComponent/CardComponent";

import {
    getList,
    resetList,
    updateCardReadStatus,
} from "service/card/cardSlice";
import { setEditDrawer } from "service/drawer/drawerSlice";

import "./Drawer.scss";

const Drawer = () => {
    const { drawerUniqueName, nickname } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(({ auth }) => auth.info);
    const cardListPage = useSelector(({ card }) => card.list);

    const [isOpenConfirmRemove, handleConfirmRemove] = useState(false);

    const onToggleReadStatus = ({ cardId, e }) => {
        e.stopPropagation();
        if (!cardListPage.isOwner) return;
        dispatch(updateCardReadStatus(cardId));
    };

    const removeDrawer = async (drawerId) => {
        console.log("drawerId:", drawerId);
        try {
            await removeDrawerAPI(drawerId);
            handleConfirmRemove(false);
            history.go(0);
        } catch (error) {
            console.log("Remove drawer error:", error);
            // todo
            // 에러 표시 토스트 띄우기
        }
    };

    const onEdit = () => {
        dispatch(
            setEditDrawer({
                _id: cardListPage.drawerId,
                name: cardListPage.drawerName,
                desc: cardListPage.drawerDesc,
                tags: cardListPage.tagList,
                allPublic: cardListPage.allPublic,
                nickname,
            })
        );
        history.push("/edit-drawer");
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
                <div className="top-panel">
                    <div className="title-area">
                        <div className="title">
                            {cardListPage.allPublic ? (
                                <ShareOutlinedIcon />
                            ) : (
                                <LockOutlined />
                            )}
                            <h2>
                                {cardListPage.drawerName}
                                {cardListPage.drawerToBeDeleted && (
                                    <span className="deleted-drawer-status">
                                        (삭제됨)
                                    </span>
                                )}
                            </h2>
                        </div>
                        <p className="desc">{cardListPage.drawerDesc}</p>
                        <ul className="tag-list">
                            {cardListPage.tagList.map((tag, tagIndex) => (
                                <li key={tagIndex}>{tag}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="action-area">
                        <button
                            type="button"
                            className="edit-drawer-btn"
                            onClick={onEdit}
                        >
                            수정
                        </button>
                        <button
                            type="button"
                            className="remove-drawer-btn"
                            onClick={handleConfirmRemove}
                        >
                            삭제
                        </button>
                    </div>
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
            <Dialog
                open={isOpenConfirmRemove}
                onClose={() => handleConfirmRemove(false)}
            >
                <DialogTitle>{"서랍을 삭제하시겠습니까?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        서랍을 삭제할 경우 휴지통으로 이동됩니다.
                        <br />
                        휴지통에서도 삭제할 경우 서랍과 서랍안에 저장된 카드는
                        모두 삭제됩니다.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => handleConfirmRemove(false)}
                        color="primary"
                    >
                        취소
                    </Button>
                    <Button
                        onClick={() => removeDrawer(cardListPage.drawerId)}
                        color="primary"
                        autoFocus
                    >
                        삭제
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Drawer;
