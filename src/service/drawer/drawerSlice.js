import { createSlice } from "@reduxjs/toolkit";

const drawerObj = {
    list: [],
    listError: null,
    drawerDetail: {
        name: null,
        desc: null,
        allPublic: false,
    },
};

const drawerSlice = createSlice({
    name: "drawer",
    initialState: drawerObj,
    reducers: {
        getList(state) {},
        getListSuccess(state, action) {
            const list = action.payload;
            state.list = list;
            state.listError = null;
        },
        getListFail(state, action) {
            const error = action.payload;
            state.listError = error;
        },
    },
});

export const { getList, getListSuccess, getListFail } = drawerSlice.actions;

export const drawerReducer = drawerSlice.reducer;
