import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createDrawer as createDrawerAPI } from "api/drawer";
import { getList } from "service/drawer/drawerSlice";

import SubmitBtn from "components/SubmitBtn/SubmitBtn";

import "./NewDrawer.scss";

const NewDrawer = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors, reset, trigger } = useForm({
        defaultValues: {
            allPublic: false,
        },
    });
    const [descLength, setDescLength] = useState(0);

    const onSubmitDrawer = async (values) => {
        if (values.tags) {
            values.tags = values.tags.split(",");
        }

        try {
            await createDrawerAPI(values);
            dispatch(getList());
            reset();
        } catch (error) {
            console.log("error");
            console.log(error);
        }
    };

    return (
        <div className="new-drawer-page">
            <h1>New Drawer</h1>
            <form onSubmit={handleSubmit(onSubmitDrawer)}>
                <div>
                    <label htmlFor="drawer-name">Name</label>
                    <input
                        type="text"
                        id="drawer-name"
                        name="name"
                        ref={register({ required: true })}
                    />
                    {errors.name && (
                        <p className="err-msg">Drawer의 이름을 입력해주세요.</p>
                    )}
                </div>
                <div>
                    <label htmlFor="drawer-desc">
                        Description
                        <span className="desc-length">{descLength}/140</span>
                    </label>
                    <textarea
                        name="desc"
                        id="drawer-desc"
                        placeholder="Drawer를 설명해주세요."
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
                    <input
                        type="checkbox"
                        name="allPublic"
                        id="drawer-all-public"
                        ref={register}
                    />
                </div>
                <div>
                    <label htmlFor="drawer-tags">Tags:</label>
                    <input
                        type="text"
                        id="drawer-tags"
                        name="tags"
                        placeholder="dev, career, web"
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
                    <SubmitBtn />
                </div>
            </form>
        </div>
    );
};

export default NewDrawer;
