import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: [],
        otherUser: [],
        selectedUser: null,
        searchUserText: '',
        onlineUsers: null,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setOtherUser: (state, action) => {
            state.otherUser = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setSearchUser: (state, action) => {
            state.searchUserText = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        }
    }
})
export const { setUserData, setOtherUser, setSelectedUser, setSearchUser, setOnlineUsers } = userSlice.actions;
export default userSlice.reducer;