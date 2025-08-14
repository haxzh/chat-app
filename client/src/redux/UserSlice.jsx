
import { createSlice } from '@reduxjs/toolkit';
// import { getAllUsers } from '../apiCalls/Users';
// import userReducer from './UserSlice';

const userSlice = createSlice({
    name: 'user',
    initialState: { 
        user: null,
        allUsers: [],
        allChats: [],
        selectedChat: null,

     },
    reducers: {
        setUser: (state, action) => { state.user = action.payload; },
        setAllUsers: (state, action) => { state.allUsers = action.payload; },
        setAllChats: (state, action) => { state.allChats = action.payload; },
        setSelectedChat: (state, action) => { state.selectedChat = action.payload; },
    }
});

export const { setUser, setAllUsers, setAllChats, setSelectedChat } = userSlice.actions;
export default userSlice.reducer;