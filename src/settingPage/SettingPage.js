import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "service/auth/authSlice";

import "./SettingPage.scss";

const SettingPage = () => {
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="setting-page">
            <div className="contact-us">
                <h3>문의하기</h3>
                <a href="mailto:info@ohmydrawer.com">info@ohmydrawer.com</a>
            </div>
            <div className="withdraw-area">
                <h3>회원 탈퇴</h3>
                <button
                    type="button"
                    className="withdraw-btn"
                    onClick={onLogout}
                >
                    신청하기
                </button>
            </div>
            <button type="button" className="logout-btn" onClick={onLogout}>
                로그아웃
            </button>
        </div>
    );
};

export default SettingPage;
