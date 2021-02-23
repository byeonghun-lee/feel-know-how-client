import { createSlice } from "@reduxjs/toolkit";

const authObj = { info: null, loginError: null };

const authSlice = createSlice({
    name: "auth",
    initialState: authObj,
    reducers: {
        login(state, action) {
            console.log("action:", action);
        },
        loginSuccess(state, action) {
            const { nickname } = action.payload;
            console.log("actionSuccess:", action);
            state.info = { nickname };
        },
        loginFail(state, action) {
            const { error } = action.payload;
            state.loginError = error;
        },
    },
});

export const { login, loginSuccess, loginFail } = authSlice.actions;

export const authReducer = authSlice.reducer;
