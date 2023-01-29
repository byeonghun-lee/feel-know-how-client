import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BestCardComponent from "components/bestCardComponent/BestCardComponent";
import CardComponent from "components/cardComponent/CardComponent";

import { search } from "service/search/searchSlice";

import "./Search.scss";

const Search = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const searchPath = useLocation().search;
    const [keyword, setKeyword] = useState();
    const [isComplete, setCompleteStatus] = useState(false);

    const drawerList = useSelector(({ search }) => search.drawerList);
    const cardList = useSelector(({ search }) => search.cardList);

    const onSearch = () => {
        history.push(`/search?keyword=${keyword}`);
    };

    useEffect(() => {
        const searchKeyword = searchPath.split("?keyword=")[1];
        if (searchKeyword) {
            if (!keyword) {
                setKeyword(decodeURIComponent(searchKeyword));
            }
            dispatch(search({ keyword: searchKeyword }));
            setCompleteStatus(true);
        } else {
            history.replace("/search");
            setCompleteStatus(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchPath]);

    return (
        <div className="search-page">
            <div className="search-input-area">
                <input
                    type="text"
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            onSearch();
                        }
                    }}
                    value={keyword}
                />
                <button type="submit" onClick={onSearch}>
                    search
                </button>
            </div>
            {/* 내가 올린 tag 관련 추천 보여주기 */}
            {/* 정확한 검색 후 이벤트 잡기 */}
            {isComplete && (
                <>
                    <div className="searched-list-area">
                        <h2>Drawer</h2>
                        <ul>
                            {drawerList.length &&
                                drawerList.map((drawer, drawerIndex) => (
                                    <li>
                                        <BestCardComponent
                                            drawer={drawer}
                                            key={drawerIndex}
                                        />
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="searched-list-area">
                        <h2>Card</h2>
                        <ul>
                            {cardList.length &&
                                cardList.map((card, cardIndex) => (
                                    <li>
                                        <CardComponent
                                            cardInfo={card}
                                            key={cardIndex}
                                        />
                                    </li>
                                ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default Search;
