import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CardComponent from "components/cardComponent/CardComponent";

import { getList } from "service/readingList/readingListSlice";

const ReadingList = () => {
    const dispatch = useDispatch();
    const readingListData = useSelector(({ readingList }) => readingList.list);

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
        </div>
    );
};

export default ReadingList;
