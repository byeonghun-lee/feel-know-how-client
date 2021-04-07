import { createSlice } from "@reduxjs/toolkit";

const cardObj = {
    list: {
        drawerName: null,
        drawerDesc: null,
        cardList: [],
    },
    listError: null,
};

const cardSlice = createSlice({
    name: "card",
    initialState: cardObj,
    reducers: {
        getList(state) {},
        getListSuccess(state, action) {
            state.list = action.payload;
            state.listError = null;
        },
        getListFail(state, action) {
            const error = action.payload;
            state.listError = error;
        },
    },
});

export const { getList, getListSuccess, getListFail } = cardSlice.actions;

export const cardReducer = cardSlice.reducer;
