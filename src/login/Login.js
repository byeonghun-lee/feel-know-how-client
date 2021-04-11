import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "service/auth/authSlice";
import { Link } from "react-router-dom";
import cx from "classnames";
import SubmitBtn from "components/SubmitBtn/SubmitBtn";

import "./Login.scss";

const Login = () => {
    const location = useLocation();
    const history = useHistory();
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

            if (location.search) {
                // 이전 페이지로 보내기
            } else {
                history.push("/");
            }
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

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onLogin)} className="login-form">
                <div className="id-field">
                    <label htmlFor="user-id">ID</label>
                    <input
                        type="text"
                        name="id"
                        id="user-id"
                        ref={register({
                            required: true,
                        })}
                        className={cx({ error: errors.id })}
                        placeholder="Email"
                    />
                </div>
                {errors.id && (
                    <p className="error-text">이메일을 입력해주세요.</p>
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
                        className={cx({ error: errors.password })}
                        placeholder="Password"
                    />
                </div>
                {errors.password && (
                    <p className="error-text">비밀번호를 입력해주세요.</p>
                )}
                {errors.loginError && (
                    <p className="error-text">{errors.loginError.message}</p>
                )}
                <Link to="/sign-up" className="move-to-register-page">
                    Create New Account
                </Link>
                <div className="login-btn-area">
                    <SubmitBtn text="LOGIN" />
                </div>
            </form>
        </div>
    );
};

export default Login;
