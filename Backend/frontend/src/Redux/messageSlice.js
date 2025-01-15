import { createSlice } from "@reduxjs/toolkit";


const messageSlice = createSlice({
    name: "message",
    initialState: {
        getMessage: [],

    },
    reducers: {
        setGetMessage: (state, action) => {
            state.getMessage = Array.isArray(action.payload) ? action.payload : [];
        },

    }
})
export const { setGetMessage } = messageSlice.actions;
export default messageSlice.reducer;