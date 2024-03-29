import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CardComponent from "components/cardComponent/CardComponent";

import { getList } from "service/readingList/readingListSlice";

import "./ReadingList.scss";

const ReadingList = () => {
    const dispatch = useDispatch();
    const readingListData = useSelector(({ readingList }) => readingList.list);
    const isLoading = useSelector(({ readingList }) => readingList.loadStatus);

    useEffect(() => {
        dispatch(getList());
    }, []);

    return (
        <div className="read-list-page">
            <h2>오늘 읽을 카드 리스트</h2>
            {readingListData.map((readingItem, index) => (
                <CardComponent
                    key={index}
                    cardInfo={readingItem.cardId}
                    isOwner={true}
                    onToggleReadStatus={() => {}}
                />
            ))}
            {isLoading === "end" && readingListData.length === 0 && (
                <div className="empty-list">
                    <p>오늘 읽을 카드 리스트가 없습니다.</p>
                    <p>카드를 추가해주세요.</p>
                </div>
            )}
        </div>
    );
};

export default ReadingList;
