import { createSlice } from "@reduxjs/toolkit";

const readingListObj = {
    list: [],
    loadStatus: "ready",
    listError: null,
};

const readingListSlice = createSlice({
    name: "readingList",
    initialState: readingListObj,
    reducers: {
        getList(state) {
            state.loadStatus = "pending";
        },
        getListSuccess(state, action) {
            const list = action.payload;
            state.list = list;
            state.listError = null;
            state.loadStatus = "end";
        },
        getListFail(state, action) {
            const error = action.payload;
            state.listError = error;
            state.loadStatus = "end";
        },
    },
});

export const { getList, getListSuccess, getListFail } =
    readingListSlice.actions;

export const readingListReducer = readingListSlice.reducer;
