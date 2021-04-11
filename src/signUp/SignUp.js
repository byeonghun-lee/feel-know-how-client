import React, { useState } from "react";
import SubmitBtn from "components/SubmitBtn/SubmitBtn";

import "./SignUp.scss";

const SignUp = () => {
    const [pwdType, setPwdType] = useState("password");

    return (
        <div className="sign-up-page">
            <h1>Create New Accounts</h1>
            <form>
                <div>
                    <label htmlFor="">Email</label>
                    <div className="email-input-area">
                        <input type="email" placeholder="email" />
                        <button type="button" className="verify-btn">
                            Verify
                        </button>
                    </div>
                    <p className="desc">
                        An email has been sent with a verification code. Please
                        check.
                    </p>
                </div>
                <div>
                    <label htmlFor="">Authentication code</label>
                    <input type="text" />
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
