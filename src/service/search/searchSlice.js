import { createSlice } from "@reduxjs/toolkit";

const searchObj = {
    drawerList: [],
    cardList: [],
    error: null,
};

const searchSlice = createSlice({
    name: "search",
    initialState: searchObj,
    reducers: {
        search(state, action) {
            state.keyword = action.payload.keyword;
        },
        searchSuccess(state, action) {
            const result = action.payload;
            state.drawerList = result.drawerList;
            state.cardList = result.cardList;
            state.error = null;
        },
        searchFail(state, action) {
            state.error = action.payload;
        },
    },
});

export const { search, searchSuccess, searchFail } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
