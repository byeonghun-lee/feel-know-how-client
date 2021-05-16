import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "service/auth/authSlice";

const SettingPage = () => {
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="setting-page">
            <h2>Setting</h2>
            <button type="button" onClick={onLogout}>
                Logout
            </button>
        </div>
    );
};

export default SettingPage;
