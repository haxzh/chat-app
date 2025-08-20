import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from './LoaderSlice';
import userReducer from './UserSlice';
// import userSlice from "./UserSlice";

const store = configureStore({
    reducer: { loaderReducer, userReducer }
});

export default store;