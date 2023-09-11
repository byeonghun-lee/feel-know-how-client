import React, { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import {
    createDrawer as createDrawerAPI,
    updateDrawer as updateDrawerAPI,
} from "api/drawer";
import { getList } from "service/drawer/drawerSlice";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import SubmitBtn from "components/SubmitBtn/SubmitBtn";

import "./NewDrawer.scss";

const NewDrawer = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { register, handleSubmit, errors, reset, trigger, setValue } =
        useForm({
            defaultValues: {
                allPublic: false,
            },
        });
    const [descLength, setDescLength] = useState(0);
    const [alertComplete, handleAlert] = useState(false);
    const editDrawerInfo = useSelector(({ drawer }) => drawer.editedDrawer);
    const isEditStatus = useMemo(() => {
        if (location.pathname === "/edit-drawer") {
            return true;
        } else {
            return false;
        }
    }, [location.pathname]);

    const onSubmitDrawer = async (values) => {
        if (values.tags) {
            values.tags = values.tags.split(",");
        }

        try {
            let result;
            if (isEditStatus) {
                result = await updateDrawerAPI({
                    drawerId: editDrawerInfo._id,
                    drawerObj: values,
                });
            } else {
                await createDrawerAPI(values);
            }
            dispatch(getList());
            handleAlert(true);

            if (!isEditStatus) {
                reset();
            } else {
                console.log("result", result);
                setTimeout(() => {
                    history.push(
                        `/@${editDrawerInfo.nickname}/${result.data.uniqueNameForUser}`
                    );
                }, 500);
            }
        } catch (error) {
            console.log("error");
            console.log(error);
        }
    };

    useEffect(() => {
        if (isEditStatus && !editDrawerInfo) {
            history.goBack();
            return;
        }
        if (isEditStatus) {
            setValue("name", editDrawerInfo.name);
            setValue("desc", editDrawerInfo.desc);
            setValue("allPublic", editDrawerInfo.allPublic.toString());
            setValue("tags", editDrawerInfo.tags);
            setDescLength(editDrawerInfo.desc.length);
        }
    }, []);

    return (
        <div className="new-drawer-page">
            <h1>{isEditStatus ? "서랍 업데이트" : "새로운 서랍 만들기"}</h1>
            <form onSubmit={handleSubmit(onSubmitDrawer)}>
                <div>
                    <label htmlFor="drawer-name">이름</label>
                    <input
                        type="text"
                        id="drawer-name"
                        name="name"
                        ref={register({ required: true })}
                    />
                    {errors.name && (
                        <p className="err-msg">서랍의 이름을 입력해주세요.</p>
                    )}
                </div>
                <div>
                    <label htmlFor="drawer-desc">
                        설명
                        <span className="desc-length">{descLength}/140</span>
                    </label>
                    <textarea
                        name="desc"
                        id="drawer-desc"
                        placeholder="서랍을 설명해주세요."
                        ref={register({ maxLength: 140 })}
                        onChange={(e) => setDescLength(e.target.value.length)}
                        onBlur={() => trigger("desc")}
                    />
                    {errors.desc && (
                        <p className="err-msg">
                            설명은 140자를 넘길 수 없습니다.
                        </p>
                    )}
                </div>
                <div className="row-item">
                    <label htmlFor="drawer-all-public">공개 여부:</label>
                    <div className="check-box-item">
                        <input
                            type="radio"
                            name="allPublic"
                            id="drawer-all-public"
                            value="true"
                            ref={register}
                        />
                        <label
                            htmlFor="drawer-all-public"
                            className="fixed-text"
                        >
                            공개
                        </label>
                        <input
                            type="radio"
                            name="allPublic"
                            id="drawer-all-private"
                            value="false"
                            ref={register}
                        />
                        <label
                            htmlFor="drawer-all-private"
                            className="fixed-text"
                        >
                            비공개
                        </label>
                    </div>
                </div>
                <div>
                    <label htmlFor="drawer-tags">Tags:</label>
                    <input
                        type="text"
                        id="drawer-tags"
                        name="tags"
                        placeholder="육아, 돌잔치, 장난감"
                        ref={register({
                            validate: (value) =>
                                value
                                    .split(",")
                                    .some((item) => item.length < 6),
                        })}
                    />
                    <p>
                        태그의 구분은<span>,(콤마)</span>로 해주세요.
                    </p>
                    <p>태그는 5글자를 넘길 수 없습니다.</p>
                </div>
                <div className="btn-area">
                    <SubmitBtn
                        text={isEditStatus ? "수정" : "생성"}
                        disabled={alertComplete}
                    />
                </div>
            </form>
            <Snackbar
                open={alertComplete}
                autoHideDuration={3000}
                onClose={() => handleAlert(false)}
            >
                <MuiAlert elevation={10} variant="filled" severity="success">
                    {isEditStatus ? "업데이트되었습니다." : "생성되었습니다."}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default NewDrawer;
