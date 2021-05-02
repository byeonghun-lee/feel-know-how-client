import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import SubmitBtn from "components/SubmitBtn/SubmitBtn";
import {
    verifyEmail as verifyEmailAPI,
    checkVerificationCode as checkVerificationCodeAPI,
    checkNickname as checkNicknameAPI,
    signUp as signUpAPI,
} from "api/auth";

import "./SignUp.scss";

const SignUp = () => {
    const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const {
        register,
        errors,
        trigger,
        reset,
        watch,
        getValues,
        handleSubmit,
    } = useForm();
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
            if (res.data === "ok") {
                reset();
            }
        } catch (error) {
            console.log("signUpError", error);
        }
    };

    return (
        <div className="sign-up-page">
            <h1>Create New Accounts</h1>
            <form onSubmit={handleSubmit(onSignUp)}>
                <div>
                    <label htmlFor="">Email</label>
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
                            Verify
                        </button>
                    </div>
                    {verifiyBtnStatus && (
                        <p className="desc">
                            An email has been sent with a verification code.
                            Please check.
                        </p>
                    )}
                    {errors.email && (
                        <p className="err-msg">Please write in email format.</p>
                    )}
                </div>
                <div className="verification-code-area">
                    <label htmlFor="verificationCode">
                        Authentication code
                    </label>
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
                                Wrong authentication code. Please check again.
                            </p>
                        )}
                    {verifiedEmailStatus.status && (
                        <p className="desc">Email has been verified!</p>
                    )}
                </div>
                <div className="password-area">
                    <label htmlFor="password">Password</label>
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
                        <p className="err-msg">Passwords do not match.</p>
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
                        <label htmlFor="show-password">Show password</label>
                    </div>
                </div>
                <div>
                    <label htmlFor="nickname">Nickname</label>
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
                            Please write a nickname between 3 and 8 letters.
                        </p>
                    )}
                    {errors.nickname?.type === "validate" && (
                        <p className="err-msg">
                            This nickname has existed. Please try again another
                            nickname.
                        </p>
                    )}
                </div>
                <div className="sign-up-btn-area">
                    <SubmitBtn text="Sign Up" />
                </div>
            </form>
        </div>
    );
};

export default SignUp;
