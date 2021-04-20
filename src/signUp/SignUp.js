import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitBtn from "components/SubmitBtn/SubmitBtn";
import {
    verifyEmail as verifyEmailAPI,
    checkVerificationCode as checkVerificationCodeAPI,
} from "api/auth";

import "./SignUp.scss";

const SignUp = () => {
    const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const { register, errors, trigger, reset, getValues } = useForm();
    const [pwdType, setPwdType] = useState("password");
    const [verifiyBtnStatus, setVerifyBtnStatus] = useState(false);
    const [verifiedEmailStatus, setVerifiedEmailStatus] = useState({
        status: false,
        errMsg: null,
    });

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
        console.log("checkVerificationCode", value);
        // todo
        // check min length
        // check email input

        if (!value) {
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
            }
            if (res.data.indexOf("found") >= 0) {
                setVerifiedEmailStatus({ status: false, errMsg: "Not Found" });
            }
        } catch (error) {
            console.log("error:", error);
            setVerifiedEmailStatus({ status: false, errMsg: error.message });
        }
    };

    const onSignUp = async () => {};

    return (
        <div className="sign-up-page">
            <h1>Create New Accounts</h1>
            <form>
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
                <div>
                    <label htmlFor="">Password</label>
                    <input type={pwdType} placeholder="password" />
                    <input type={pwdType} placeholder="confirm" />
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
                    <label htmlFor="">Nickname</label>
                    <input type="text" />
                </div>
                <div className="sign-up-btn-area">
                    <SubmitBtn text="Sign Up" />
                </div>
            </form>
        </div>
    );
};

export default SignUp;
