import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import Switch from "@material-ui/core/Switch";
// import LinkRoundedIcon from "@material-ui/icons/LinkRounded";
// import LaunchRoundedIcon from "@material-ui/icons/LaunchRounded";
import OpenInNewRoundedIcon from "@material-ui/icons/OpenInNewRounded";
import { withStyles } from "@material-ui/core/styles";

import CreatedTimeComponent from "components/createdTimeComponent/CreatedTimeComponent";

import { setEditCard } from "service/card/cardSlice";

import "./CardComponent.scss";

const PurpleSwitch = withStyles({
    switchBase: {
        color: "#e0e0e0",
        "&$checked": {
            color: "#9575cd",
        },
        "&$checked + $track": {
            backgroundColor: "#9575cd",
        },
    },
    checked: {},
    track: {},
})(Switch);

const CardComponent = ({ cardInfo, onToggleReadStatus, isOwner }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const onEdit = (e) => {
        e.preventDefault();
        dispatch(setEditCard(cardInfo));
        history.push("/edit-card");
    };

    return (
        <a
            className="card-component"
            href={cardInfo.url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="corner-btn-area">
                <OpenInNewRoundedIcon className="link-icon" />
            </div>
            <div className="text-contents">
                <h3 className="card-component-title">{cardInfo.title}</h3>
                <p className="card-component-desc">{cardInfo.desc}</p>
                <ul className="status-list">
                    <li>
                        <h4>링크</h4>
                        <div className="site-url-tag">{cardInfo.url}</div>
                        {/* <a
                            href={cardInfo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-tag"
                        >
                            <LaunchRoundedIcon className="launch-icon" />
                            link
                        </a> */}
                    </li>
                    <li>
                        <h4>읽음 상태</h4>
                        <PurpleSwitch
                            checked={cardInfo.isRead}
                            onChange={(e) =>
                                onToggleReadStatus({
                                    cardId: cardInfo._id,
                                    e,
                                })
                            }
                        />
                    </li>
                    <li>
                        <h4>생성 날짜</h4>
                        <CreatedTimeComponent time={cardInfo.createdAt} />
                    </li>
                </ul>
                {isOwner && (
                    <button
                        type="button"
                        className="edit-btn"
                        onClick={(e) => onEdit(e)}
                    >
                        수정
                    </button>
                )}
            </div>
        </a>
    );
};

export default CardComponent;
