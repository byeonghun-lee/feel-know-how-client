import { createSlice } from "@reduxjs/toolkit";

const cardObj = {
    list: {
        drawerId: null,
        drawerName: null,
        drawerDesc: null,
        drawerToBeDeleted: false,
        tagList: [],
        cardList: [],
    },
    listError: null,
    editedCard: null,
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
        updateCardReadStatus(state) {},
        updateCardReadStatusSuccess(state, action) {
            state.list.cardList = state.list.cardList.map((item) => {
                if (item._id === action.payload._id) {
                    item.isRead = action.payload.isRead;
                }
                return item;
            });
            state.listError = null;
        },
        updateCardReadStatusFail(state, action) {
            const error = action.payload;
            state.listError = error;
        },
        setEditCard(state, action) {
            state.editedCard = null;
            state.editedCard = action.payload;
        },
    },
});

export const {
    getList,
    getListSuccess,
    getListFail,
    resetList,
    updateCardReadStatus,
    updateCardReadStatusSuccess,
    updateCardReadStatusFail,
    setEditCard,
} = cardSlice.actions;

export const cardReducer = cardSlice.reducer;
