import { createSlice } from "@reduxjs/toolkit";

const drawerObj = {
    list: [],
    listError: null,
    // drawerDetail: {
    //     name: null,
    //     desc: null,
    //     allPublic: false,
    // },
    standardForNewCard: {
        name: null,
        drawerId: null,
        allPublic: null,
    },
    editedDrawer: null,
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
        setStandardForNewCard(state, action) {
            state.standardForNewCard.name = action.payload.name || null;
            state.standardForNewCard.drawerId = action.payload.drawerId || null;
            state.standardForNewCard.allPublic =
                action.payload.allPublic || null;
        },
        setEditDrawer(state, action) {
            state.editedDrawer = null;
            state.editedDrawer = action.payload;
        },
    },
});

export const {
    getList,
    getListSuccess,
    getListFail,
    setStandardForNewCard,
    setEditDrawer,
} = drawerSlice.actions;

export const drawerReducer = drawerSlice.reducer;
