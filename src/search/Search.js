import React from "react";

import BestCardComponent from "components/bestCardComponent/BestCardComponent";
import CardComponent from "components/cardComponent/CardComponent";

import "./Search.scss";

const Search = () => {
    return (
        <div className="search-page">
            <div className="search-input-area">
                <input type="text" />
                <button type="submit">search</button>
            </div>
            <div className="searched-list-area">
                <h2>Drawer</h2>
                <ul>
                    <li>
                        <BestCardComponent
                            drawer={{
                                link: "https://google.com",
                                name: "hun",
                                userNickname: "hun08",
                                desc: "TEST",
                                likeCounts: 0,
                                forkCounts: 0,
                            }}
                        />
                    </li>
                </ul>
            </div>
            <div className="searched-list-area">
                <h2>Drawer Name</h2>
                <ul>
                    <li>
                        <CardComponent
                            cardInfo={{
                                url: "https://google.com",
                                title: "test",
                                desc: "testdesc",
                            }}
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Search;
