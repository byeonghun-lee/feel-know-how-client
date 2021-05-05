import { createSlice } from "@reduxjs/toolkit";

const bestMainObj = {
    totalCount: 0,
    list: [],
    listError: null,
};

const bestMainSlice = createSlice({
    name: "bestMain",
    initialState: bestMainObj,
    reducers: {
        getList(state, action) {
            // state.skip = action.payload.skip;
        },
        getListSuccess(state, action) {
            const { list, totalCount } = action.payload;
            state.list = list;
            state.totalCount = totalCount;
            state.listError = null;
        },
        getListFail(state, action) {
            const error = action.payload;
            state.listError = error;
        },
    },
});

export const { getList, getListSuccess, getListFail } = bestMainSlice.actions;

export const bestMainReducer = bestMainSlice.reducer;
