import React from "react";
import { createPortal } from "react-dom";
import cx from "classnames";

import "./LoginModal.scss";

const LoginModal = ({ isLogin, setLogin }) => {
    const el = document.getElementById("modal-root");

    return createPortal(
        <>
            <div className={cx("modal-wrapper", { "is-logined": isLogin })}>
                <div className={cx("login-modal", { "is-logined": isLogin })}>
                    <div className="title-area">
                        {isLogin ? <h1>Loading...</h1> : <h1>oh my drawer</h1>}
                    </div>
                    {!isLogin && (
                        <>
                            <div className="id-field">
                                <label htmlFor="user-id">아이디</label>
                                <input
                                    type="text"
                                    id="user-id"
                                    placeholder="이메일 혹은 휴대폰 번호를 입력해주세요."
                                />
                            </div>
                            <div className="pwd-field">
                                <label htmlFor="user-pwd">비밀번호</label>
                                <input
                                    type="password"
                                    id="user-pwd"
                                    placeholder="비밀번호를 입력해주세요."
                                />
                            </div>
                            <button
                                type="button"
                                className="login-btn"
                                onClick={() => setLogin(true)}
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
