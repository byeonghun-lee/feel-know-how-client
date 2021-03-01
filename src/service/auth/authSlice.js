import { createSlice } from "@reduxjs/toolkit";

const authObj = { info: null, loginError: null, needLogin: false };

const authSlice = createSlice({
    name: "auth",
    initialState: authObj,
    reducers: {
        login(state, action) {
            state.needLogin = false;
        },
        setTempUser(state, action) {
            const user = action.payload;
            state.info = user;
        },
        loginSuccess(state, action) {
            const { nickname } = action.payload;
            state.info = { nickname };
        },
        loginFail(state, action) {
            const error = action.payload;
            state.loginError = error;
        },
        checkLogin(state, action) {},
        checkLoginFail(state, action) {
            state.needLogin = true;
        },
    },
});

export const {
    login,
    loginSuccess,
    loginFail,
    setTempUser,
    checkLogin,
    checkLoginFail,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
