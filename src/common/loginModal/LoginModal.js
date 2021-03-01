import React from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import cx from "classnames";
import { login } from "service/auth/authSlice";

import "./LoginModal.scss";

import purple_backgound from "assets/image/purple_background.jpg";

const LoginModal = ({ isLogin, setLogin }) => {
    const el = document.getElementById("modal-root");
    const dispatch = useDispatch();

    const onLogin = ({ id, password }) => {
        dispatch(login({ id, password }));
    };

    return createPortal(
        <>
            <div className={cx("modal-wrapper", { "is-logined": isLogin })}>
                <div className={cx("login-modal", { "is-logined": isLogin })}>
                    <div
                        className="title-area"
                        style={{ backgroundImage: `url(${purple_backgound})` }}
                    >
                        {isLogin ? (
                            <h1 className="loading-text">Loading...</h1>
                        ) : (
                            <h1>Oh My Drawer</h1>
                        )}
                    </div>
                    {!isLogin && (
                        <>
                            <div className="id-field">
                                <label htmlFor="user-id">ID</label>
                                <input
                                    type="text"
                                    id="user-id"
                                    placeholder="이메일 혹은 휴대폰 번호를 입력해주세요."
                                />
                            </div>
                            <div className="pwd-field">
                                <label htmlFor="user-pwd">Password</label>
                                <input
                                    type="password"
                                    id="user-pwd"
                                    placeholder="비밀번호를 입력해주세요."
                                />
                            </div>
                            <button
                                type="button"
                                className="login-btn"
                                onClick={() => {
                                    setLogin(true);
                                    onLogin({
                                        id: "01099633421",
                                        password: "12341234",
                                    });
                                }}
                            >
                                LOGIN
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>,
        el
    );
};

export default LoginModal;
