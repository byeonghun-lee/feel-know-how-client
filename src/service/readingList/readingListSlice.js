import { createSlice } from "@reduxjs/toolkit";

const readingListObj = {
    list: [],
    listError: null,
};

const readingListSlice = createSlice({
    name: "readingList",
    initialState: readingListObj,
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

export const { getList, getListSuccess, getListFail } =
    readingListSlice.actions;

export const readingListReducer = readingListSlice.reducer;
