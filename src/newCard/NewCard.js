import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createCard as createCardAPI } from "api/card";

import SubmitBtn from "components/SubmitBtn/SubmitBtn";

import "./NewCard.scss";

const NewCard = () => {
    const { register, handleSubmit, errors, reset } = useForm();
    const drawerList = useSelector(({ drawer }) => drawer.list);
    const standardForNewCard = useSelector(
        ({ drawer }) => drawer.standardForNewCard
    );

    const onSubmitCard = async (values) => {
        if (values.drawerId.indexOf("선택 사항") >= 0) {
            values.drawerId = "";
        }
        try {
            await createCardAPI(values);
            reset();
        } catch (error) {
            console.log("Error in card created.");
            console.log(error);
        }
    };

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
            <form className="form-area" onSubmit={handleSubmit(onSubmitCard)}>
                <div className="select-drawer">
                    <label htmlFor="drawer-name">Drawer name</label>
                    <select
                        name="drawerId"
                        id="drawer-name"
                        className="drawer-list"
                        ref={register}
                    >
                        {standardForNewCard.name ? (
                            <option
                                selected="selected"
                                value={standardForNewCard.drawerId}
                            >
                                {standardForNewCard.name}
                            </option>
                        ) : (
                            <option value={null}>drawer 선택(선택 사항)</option>
                        )}
                        {drawerList.length &&
                            drawerList.map((drawer, index) => (
                                <option key={index} value={drawer._id}>
                                    {drawer.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="title-area">
                    <label htmlFor="card-title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="card-title"
                        ref={register}
                    />
                </div>
                <div className="url-area">
                    <label htmlFor="card-url">Url</label>
                    <input
                        type="text"
                        id="card-url"
                        name="url"
                        ref={register({ required: true })}
                    />
                </div>
                <div className="desc-area">
                    <label htmlFor="card-description">
                        Description<span>0/140</span>
                    </label>
                    <textarea
                        id="card-description"
                        name="desc"
                        ref={register}
                    />
                </div>
                <div className="btn-area">
                    <SubmitBtn />
                </div>
            </form>
        </div>
    );
};

export default NewCard;
