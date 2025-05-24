import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import advocateReducer from "./advocateSlice"


const store = configureStore({

    reducer: {
        auth: authReducer,
        advocate: advocateReducer,
    },

});

export default store;