import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import thunk from "redux-thunk";


const store = configureStore(
    {
        reducer:{
            user:authSlice,
        },
    },
    applyMiddleware(thunk)
);

export default store;