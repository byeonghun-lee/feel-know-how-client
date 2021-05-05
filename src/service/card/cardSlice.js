import { createSlice } from "@reduxjs/toolkit";

const cardObj = {
    list: {
        drawerName: null,
        drawerDesc: null,
        tagList: [],
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
        resetList(state) {
            state.list = { ...cardObj.list };
        },
    },
});

export const {
    getList,
    getListSuccess,
    getListFail,
    resetList,
} = cardSlice.actions;

export const cardReducer = cardSlice.reducer;
