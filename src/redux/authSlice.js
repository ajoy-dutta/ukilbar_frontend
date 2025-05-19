import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : JSON.parse(localStorage.getItem("user")) || null,
    access_token : localStorage.getItem("access_token") || null,
    is_authenticated : !!localStorage.getItem("access_token")

}


const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers:{
        loginSuccess: (state, action) => {
            const {user, access} = action.payload;
            state.user = user;
            state.access_token = access;
            state.is_authenticated = true;
            

            localStorage.setItem('user',JSON.stringify(user));
            localStorage.setItem('access_token', access);

        },

        logout: (state) => {
            state.user = null;
            state.access_token = null;
            state.is_authenticated = false;

            localStorage.removeItem("user");
            localStorage.removeItem("access_token");

        },
    },

})

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;