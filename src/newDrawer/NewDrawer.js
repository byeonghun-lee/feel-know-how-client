import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createDrawer as createDrawerAPI } from "api/drawer";
import { getList } from "service/drawer/drawerSlice";

import "./NewDrawer.scss";

const NewDrawer = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors, reset } = useForm({
        defaultValues: {
            allPublic: false,
        },
    });

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
            <form onSubmit={handleSubmit(onSubmitDrawer)}>
                <h2>New Drawer</h2>
                <label htmlFor="drawer-name">
                    <h3>Name:</h3>
                    <input
                        type="text"
                        id="drawer-name"
                        name="name"
                        ref={register({ required: true })}
                    />
                </label>
                {errors.name && <p className="err-msg">이름을 입력해주세요.</p>}
                <label htmlFor="drawer-desc">
                    <h3>Description:</h3>
                    <textarea
                        name="desc"
                        id="drawer-desc"
                        ref={register({ maxLength: 140 })}
                    />
                    <p>
                        drawer에 대한 설명을 적어주세요. 설명은 140자를 넘을 수
                        없습니다.
                    </p>
                </label>
                <label htmlFor="drawer-all-public">
                    <h3>Public:</h3>
                    <input
                        type="checkbox"
                        name="allPublic"
                        id="drawer-all-public"
                        ref={register}
                    />
                </label>
                <label htmlFor="drawer-tags">
                    <h3>Tags:</h3>
                    <input
                        type="text"
                        id="drawer-tags"
                        name="tags"
                        ref={register({
                            validate: (value) =>
                                value
                                    .split(",")
                                    .some((item) => item.length < 5),
                        })}
                    />
                    <p>
                        <span>,</span>로 구분해주세요. tag 한개는 5글자가 넘을
                        수 없습니다.
                    </p>
                </label>
                {errors.tags && (
                    <p className="err-msg">
                        tag 한개당 글자수는 5글자 이하입니다.
                    </p>
                )}
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default NewDrawer;
