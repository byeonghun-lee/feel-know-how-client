import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createCard as createCardAPI } from "api/card";

import SubmitBtn from "components/SubmitBtn/SubmitBtn";

import "./NewCard.scss";

const NewCard = () => {
    const { register, handleSubmit, errors, reset, trigger } = useForm();
    const [descLength, setDescLength] = useState(0);

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
            setDescLength(0);
            reset();
        } catch (error) {
            console.log("Error in card created.");
            console.log(error);
        }
    };

    return (
        <div className="new-card">
            <h1>New Card</h1>
            <p className="page-desc">Please enter the URL to save.</p>
            {/* <p className="page-desc">
                If you don't change the status of the saved URL to read, it will
                go to Trash after 90 days.
            </p> */}
            {/* <p className="page-desc">This option can be changed in Setting.</p> */}
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
                            <option value={null}>select drawer(options)</option>
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
                        placeholder="Card title"
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
                        Description<span>{descLength}/140</span>
                    </label>
                    <textarea
                        id="card-description"
                        placeholder="Description of this card"
                        name="desc"
                        ref={register({ maxLength: 140 })}
                        onBlur={() => trigger("desc")}
                        onChange={(e) => setDescLength(e.target.value.length)}
                    />
                    {errors.desc && (
                        <p className="err-msg">
                            Please write within 140 characters.
                        </p>
                    )}
                </div>
                <div className="btn-area">
                    <SubmitBtn />
                </div>
            </form>
        </div>
    );
};

export default NewCard;
