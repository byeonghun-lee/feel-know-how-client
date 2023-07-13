import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    createCard as createCardAPI,
    updateCard as updateCardAPI,
} from "api/card";

import SubmitBtn from "components/SubmitBtn/SubmitBtn";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import "./NewCard.scss";

const NewCard = () => {
    const location = useLocation();
    const history = useHistory();
    const isEditStatus = useMemo(() => {
        if (location.pathname === "/edit-card") {
            return true;
        } else {
            return false;
        }
    }, [location.pathname]);

    const sharedUrl = localStorage.getItem("sharedUrl");
    const { register, handleSubmit, errors, reset, trigger, setValue } =
        useForm();
    const [descLength, setDescLength] = useState(0);
    const [alertComplete, handleAlert] = useState(false);

    const drawerList = useSelector(({ drawer }) => drawer.list);
    const standardForNewCard = useSelector(
        ({ drawer }) => drawer.standardForNewCard
    );
    const editCardInfo = useSelector(({ card }) => card.editedCard);

    const onSubmitCard = async (values) => {
        if (values.drawerId.indexOf("선택 사항") >= 0) {
            values.drawerId = "";
        }

        try {
            if (isEditStatus) {
                await updateCardAPI({
                    cardId: editCardInfo._id,
                    cardObj: values,
                });
            } else {
                await createCardAPI(values);
            }
            setDescLength(0);
            reset();
            handleAlert(true);
            // if (isEditStatus) {
            //     history.goBack();
            // }
        } catch (error) {
            console.log("Error in card created.");
            console.log(error);
        }
    };

    useEffect(() => {
        if (sharedUrl && !isEditStatus) {
            setValue("url", sharedUrl);
        }
    }, []);

    useEffect(() => {
        if (isEditStatus && !editCardInfo) {
            history.goBack();
            return;
        }
        if (isEditStatus) {
            setValue("url", editCardInfo.url);
            setValue("title", editCardInfo.title);
            setValue("desc", editCardInfo.desc);
            setValue("drawerId", editCardInfo.drawerId);
            setDescLength(editCardInfo.desc.length);
        }
    }, []);

    return (
        <div className="new-card">
            <h1>{isEditStatus ? "Edit" : "New"} Card</h1>
            {isEditStatus ? (
                <p className="page-desc">내용을 수정해주세요.</p>
            ) : (
                <p className="page-desc">저장할 URL을 입력해주세요.</p>
            )}

            {/* <p className="page-desc">
                If you don't change the status of the saved URL to read, it will
                go to Trash after 90 days.
            </p> */}
            {/* <p className="page-desc">This option can be changed in Setting.</p> */}
            <form className="form-area" onSubmit={handleSubmit(onSubmitCard)}>
                <div className="url-area">
                    <label htmlFor="card-url">URL</label>
                    <input
                        type="text"
                        id="card-url"
                        name="url"
                        ref={register({ required: true })}
                    />
                </div>
                <div className="title-area">
                    <label htmlFor="card-title">제목</label>
                    <input
                        type="text"
                        name="title"
                        id="card-title"
                        placeholder="Card title"
                        ref={register}
                    />
                </div>
                <div className="desc-area">
                    <label htmlFor="card-description">
                        설명<span>{descLength}/140</span>
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
                        <p className="err-msg">140자 이내로 입력해주세요.</p>
                    )}
                </div>
                <div className="select-drawer">
                    <label htmlFor="drawer-name">Drawer 이름</label>
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
                                [
                                {standardForNewCard.allPublic
                                    ? "공개"
                                    : "비공개"}
                                ] {standardForNewCard.name}
                            </option>
                        ) : (
                            <option value={null}>Drawer 선택(옵션)</option>
                        )}
                        {drawerList.length &&
                            drawerList.map((drawer, index) => (
                                <option key={index} value={drawer._id}>
                                    [{drawer.allPublic ? "공개" : "비공개"}]{" "}
                                    {drawer.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="btn-area">
                    <SubmitBtn text={isEditStatus ? "수정" : "생성"} />
                </div>
            </form>
            <Snackbar
                open={alertComplete}
                autoHideDuration={3000}
                onClose={() => handleAlert(false)}
            >
                <MuiAlert elevation={10} variant="filled" severity="success">
                    {isEditStatus
                        ? "수정이 완료되었습니다."
                        : "생성이 완료되었습니다."}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default NewCard;
