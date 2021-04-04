import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createDrawer as createDrawerAPI } from "api/drawer";
import { getList } from "service/drawer/drawerSlice";

import SubmitBtn from "components/SubmitBtn/SubmitBtn";

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
                <div>
                    <label htmlFor="drawer-name">Name:</label>
                    <input
                        type="text"
                        id="drawer-name"
                        name="name"
                        ref={register({ required: true })}
                    />
                    {errors.name && (
                        <p className="err-msg">이름을 입력해주세요.</p>
                    )}
                </div>
                <div>
                    <label htmlFor="drawer-desc">Description:</label>
                    <textarea
                        name="desc"
                        id="drawer-desc"
                        ref={register({ maxLength: 140 })}
                    />
                    <p>
                        drawer에 대한 설명을 적어주세요. 설명은 140자를 넘을 수
                        없습니다.
                    </p>
                </div>
                <div className="row-item">
                    <label htmlFor="drawer-all-public">Public:</label>
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
                </div>
                <div className="btn-area">
                    <SubmitBtn />
                </div>
            </form>
        </div>
    );
};

export default NewDrawer;
