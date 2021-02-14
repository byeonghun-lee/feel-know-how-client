import React from "react";

import "./NewCard.scss";

const NewCard = () => {
    return (
        <div className="new-card">
            <h2>New Card</h2>
            <p className="page-desc">
                저장할 URL을 입력해주세요. 저장된 URL의 상태를 읽음으로 바꾸지
                않으면 90일 후 Trash로 이동됩니다.
            </p>
            <p className="page-desc">
                이 옵션은 Setting에서 변경하실 수 있습니다.
            </p>
            <div className="select-drawer">
                <label htmlFor="drawer-name">Drawer name</label>
                <select name="drawerName" id="drawer-name">
                    <option value="project_1">project_1</option>
                    <option value="project_2">project_2</option>
                    <option value="project_3">project_3</option>
                    <option value="project_4">project_4</option>
                </select>
            </div>
            <div className="title-area">
                <label htmlFor="card-title">Title</label>
                <input type="text" id="card-title" />
            </div>
            <div className="url-area">
                <label htmlFor="card-url">Url</label>
                <input type="text" id="card-url" />
            </div>
            <div className="desc-area">
                <label htmlFor="card-description">Description</label>
                <textarea id="card-description" />
            </div>
            <div className="btn-area">
                <button type="button">save</button>
            </div>
        </div>
    );
};

export default NewCard;
