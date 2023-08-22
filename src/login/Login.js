import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "service/auth/authSlice";
import { Link } from "react-router-dom";
import cx from "classnames";
import SubmitBtn from "components/SubmitBtn/SubmitBtn";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import "./Login.scss";

const Login = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { register, handleSubmit, setError, errors, clearErrors } = useForm();

    const [loginLoading, handleLoading] = useState(false);
    const [alertNeedLoginStatus, handleAlert] = useState(false);

    const user = useSelector(({ auth }) => auth.info);
    const loginError = useSelector(({ auth }) => auth.loginError);
    const needLogin = useSelector(({ auth }) => auth.needLogin);

    const onLogin = (data) => {
        dispatch(login({ email: data.email, password: data.password }));
    };

    useEffect(() => {
        if (user) {
            handleLoading(true);
            console.log("user:", user);
            localStorage.setItem("user", JSON.stringify(user));

            if (location.search) {
                if (location.search.indexOf("return-page") >= 0) {
                    const pathName = location.search.split("=")[1];
                    history.push(`/${pathName}`);
                }
            } else {
                history.push("/");
            }
        }
    }, [user]);

    useEffect(() => {
        if (loginError) {
            setError("loginError", {
                message: "이메일 또는 비밀번호를 확인해주세요.",
            });
        }
        // eslint-disable-next-line
    }, [loginError]);

    useEffect(() => {
        if (needLogin) {
            handleLoading(false);
        }
    }, [needLogin]);

    useEffect(() => {
        if (location.search) {
            handleAlert(true);
        }
    }, []);

    return (
        <div className="login-page">
            <h1>로그인</h1>
            <form onSubmit={handleSubmit(onLogin)} className="login-form">
                <div className="id-field">
                    <label htmlFor="user-id">아이디(이메일)</label>
                    <input
                        type="text"
                        name="email"
                        id="user-id"
                        ref={register({
                            required: true,
                        })}
                        className={cx({ error: errors.id })}
                        placeholder="Email"
                    />
                </div>
                {errors.email && (
                    <p className="err-msg">이메일을 입력해주세요.</p>
                )}
                <div className="pwd-field">
                    <label htmlFor="user-pwd">비밀번호</label>
                    <input
                        type="password"
                        id="user-pwd"
                        name="password"
                        ref={register({
                            required: true,
                        })}
                        onFocus={() => clearErrors("loginError")}
                        className={cx({ error: errors.password })}
                        placeholder="Password"
                    />
                </div>
                {errors.password && (
                    <p className="err-msg">비밀번호를 입력해주세요.</p>
                )}
                {errors.loginError && (
                    <p className="err-msg">{errors.loginError.message}</p>
                )}
                <div className="login-btn-area">
                    <SubmitBtn text="로그인" />
                </div>
                <Link to="/sign-up" className="move-to-register-page">
                    회원가입
                </Link>
                <Link to="/privacy-policy" className="move-to-policy-page">
                    개인정보처리방침
                </Link>
            </form>
            <Snackbar
                open={alertNeedLoginStatus}
                autoHideDuration={3000}
                onClose={() => handleAlert(false)}
            >
                <MuiAlert elevation={10} variant="filled" severity="warning">
                    로그인이 필요합니다.
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default Login;
