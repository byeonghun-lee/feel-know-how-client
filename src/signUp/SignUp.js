import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import SubmitBtn from "components/SubmitBtn/SubmitBtn";
import {
    verifyEmail as verifyEmailAPI,
    checkVerificationCode as checkVerificationCodeAPI,
    checkNickname as checkNicknameAPI,
    signUp as signUpAPI,
} from "api/auth";

import "./SignUp.scss";

const SignUp = () => {
    const history = useHistory();
    const emailRegExp =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const { register, errors, trigger, reset, watch, getValues, handleSubmit } =
        useForm();
    const [pwdType, setPwdType] = useState("password");
    const [verifiyBtnStatus, setVerifyBtnStatus] = useState(false);

    // todo
    // verifiedEmailStatus nickname처럼 고치기
    const [verifiedEmailStatus, setVerifiedEmailStatus] = useState({
        status: false,
        errMsg: null,
    });
    const passwordConfirmValue = useRef({});
    passwordConfirmValue.current = watch("passwordConfirm", "");

    const onVerifyEmail = async () => {
        const res = await trigger("email");

        if (res) {
            setVerifyBtnStatus(true);

            try {
                const email = getValues("email");
                await verifyEmailAPI(email);
            } catch (error) {
                console.log("error:", error);
            }
        }
    };

    const checkVerificationCode = async (value) => {
        // todo
        // check min length
        // check email input

        if (!value || value.length < 7) {
            return;
        }
        const email = getValues("email");
        if (!email) {
            return;
        }

        try {
            const res = await checkVerificationCodeAPI({
                email,
                code: value,
            });
            if (res.data === "ok") {
                setVerifiedEmailStatus({ status: true, errMsg: null });
                return true;
            }
            if (res.data.indexOf("found") >= 0) {
                setVerifiedEmailStatus({ status: false, errMsg: "Not Found" });
                return false;
            }
        } catch (error) {
            console.log("error:", error);
            setVerifiedEmailStatus({ status: false, errMsg: error.message });
        }
    };

    const checkNickname = async (nickname) => {
        try {
            const res = await checkNicknameAPI(nickname);
            console.log("res:", res);
            if (res.data === "notExists") {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("nickname error:", error);
        }
    };

    const onSignUp = async (data) => {
        delete data.passwordConfirm;

        try {
            const res = await signUpAPI(data);
            if (res.status === 200 && res.data.nickname) {
                reset();
                history.push("/login");
            }
        } catch (error) {
            console.log("signUpError", error);
        }
    };

    return (
        <div className="sign-up-page">
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit(onSignUp)}>
                <div>
                    <label htmlFor="">이메일</label>
                    <div className="email-input-area">
                        <input
                            className="email-input"
                            type="email"
                            placeholder="email"
                            name="email"
                            ref={register({
                                required: true,
                                validate: (value) => emailRegExp.test(value),
                            })}
                            readOnly={verifiyBtnStatus}
                        />
                        <button
                            type="button"
                            className="verify-btn"
                            disabled={verifiyBtnStatus}
                            onClick={onVerifyEmail}
                        >
                            인증하기
                        </button>
                    </div>
                    {verifiyBtnStatus && (
                        <p className="desc">
                            이메일로 인증코드를 보냈습니다. 이메일을
                            확인해주세요.
                        </p>
                    )}
                    {errors.email && (
                        <p className="err-msg">이메일 형식을 확인해주세요.</p>
                    )}
                </div>
                <div className="verification-code-area">
                    <label htmlFor="verificationCode">인증 코드</label>
                    <input
                        type="text"
                        ref={register({
                            validate: async (value) =>
                                checkVerificationCode(value),
                        })}
                        name="verificationCode"
                        id="verificationCode"
                        onBlur={() => trigger("verificationCode")}
                        autoComplete="off"
                        readOnly={verifiedEmailStatus.status}
                    />
                    {!verifiedEmailStatus.status &&
                        verifiedEmailStatus.errMsg && (
                            <p className="err-msg">
                                인증번호가 맞지 않습니다. 다시 확인해 주세요.
                            </p>
                        )}
                    {verifiedEmailStatus.status && (
                        <p className="desc">이메일 인증이 완료되었습니다!</p>
                    )}
                </div>
                <div className="password-area">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type={pwdType}
                        placeholder="password"
                        name="password"
                        id="password"
                        ref={register({
                            required: true,
                            minLength: 8,
                        })}
                        onBlur={() => trigger("password")}
                    />
                    <input
                        type={pwdType}
                        placeholder="confirm"
                        name="passwordConfirm"
                        ref={register({
                            validate: (value) =>
                                value === passwordConfirmValue.current,
                        })}
                        onBlur={() => trigger("passwordConfirm")}
                    />
                    {errors.password && (
                        <p className="err-msg">
                            Password length must have at least 8.
                        </p>
                    )}
                    {errors.passwordConfirm && (
                        <p className="err-msg">비밀번호가 일치하지 않습니다.</p>
                    )}
                    <div className="show-pwd-area">
                        <input
                            type="checkbox"
                            id="show-password"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setPwdType("text");
                                } else {
                                    setPwdType("password");
                                }
                            }}
                        />
                        <label htmlFor="show-password">비밀번호 보기</label>
                    </div>
                </div>
                <div>
                    <label htmlFor="nickname">닉네임</label>
                    <input
                        type="text"
                        name="nickname"
                        id="nickname"
                        ref={register({
                            required: true,
                            minLength: 3,
                            maxLength: 8,
                            validate: async (value) => checkNickname(value),
                        })}
                        onBlur={() => trigger("nickname")}
                    />
                    {(errors.nickname?.type === "required" ||
                        errors.nickname?.type === "minLength" ||
                        errors.nickname?.type === "maxLength") && (
                        <p className="err-msg">
                            닉네임은 3자에서 8자까지 가능합니다.
                        </p>
                    )}
                    {errors.nickname?.type === "validate" && (
                        <p className="err-msg">
                            이미 존재하는 닉네임입니다. 다른 닉네임으로
                            시도해주세요.
                        </p>
                    )}
                </div>
                <div className="sign-up-btn-area">
                    <SubmitBtn text="회원가입" />
                </div>
            </form>
        </div>
    );
};

export default SignUp;
