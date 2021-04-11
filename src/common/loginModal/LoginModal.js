import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import { useForm } from "react-hook-form";
import { login } from "service/auth/authSlice";

import "./LoginModal.scss";

// import purple_backgound from "assets/image/purple_background.jpg";

const LoginModal = ({ isLogin }) => {
    const el = document.getElementById("modal-root");
    const dispatch = useDispatch();
    const { register, handleSubmit, setError, errors } = useForm();
    const [loginLoading, handleLoading] = useState(false);

    const user = useSelector(({ auth }) => auth.info);
    const loginError = useSelector(({ auth }) => auth.loginError);
    const needLogin = useSelector(({ auth }) => auth.needLogin);

    const onLogin = (data) => {
        dispatch(login({ id: data.id, password: data.password }));
    };

    useEffect(() => {
        if (user) {
            handleLoading(true);
            console.log("user:", user);
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        if (loginError) {
            setError("loginError", {
                message: "아이디 혹은 비밀번호를 확인해주세요.",
            });
        }
        // eslint-disable-next-line
    }, [loginError]);

    useEffect(() => {
        if (needLogin) {
            handleLoading(false);
        }
    }, [needLogin]);

    if (isLogin) {
        return null;
    }

    return createPortal(
        <>
            <div
                className={cx("modal-wrapper", { "is-logined": loginLoading })}
            >
                <div
                    className={cx("login-modal", {
                        "is-logined": loginLoading,
                    })}
                >
                    {/* <div
                        className="title-area"
                        style={{ backgroundImage: `url(${purple_backgound})` }}
                    >
                        {loginLoading ? (
                            <h1 className="loading-text">Loading...</h1>
                        ) : (
                            <h1>Oh My Drawer</h1>
                        )}
                    </div> */}
                    {!loginLoading && (
                        <>
                            <form
                                onSubmit={handleSubmit(onLogin)}
                                className="login-form"
                            >
                                <div className="id-field">
                                    <label htmlFor="user-id">ID</label>
                                    <input
                                        type="text"
                                        name="id"
                                        id="user-id"
                                        ref={register({
                                            required: true,
                                        })}
                                        placeholder="이메일 혹은 휴대폰 번호를 입력해주세요."
                                    />
                                </div>
                                {errors.id && (
                                    <p className="error-text">
                                        이메일 혹은 휴대폰 번호를 입력해주세요.
                                    </p>
                                )}
                                <div className="pwd-field">
                                    <label htmlFor="user-pwd">Password</label>
                                    <input
                                        type="password"
                                        id="user-pwd"
                                        name="password"
                                        ref={register({
                                            required: true,
                                        })}
                                        placeholder="비밀번호를 입력해주세요."
                                    />
                                </div>
                                {errors.password && (
                                    <p className="error-text">
                                        비밀번호를 입력해주세요.
                                    </p>
                                )}
                                {errors.loginError && (
                                    <p className="error-text">
                                        {errors.loginError.message}
                                    </p>
                                )}
                                <Link to="/" className="move-to-register-page">
                                    Create New Account
                                </Link>
                                <button type="submit" className="login-btn">
                                    LOGIN
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </>,
        el
    );
};

export default LoginModal;
