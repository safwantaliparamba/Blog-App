import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        is_authenticated: localStorage.getItem('token') ? true : false,
        user_data: localStorage.getItem('user_data') ? localStorage.getItem('user_data') : null,
        token:localStorage.getItem('token') ? localStorage.getItem('token') : null,
        user:localStorage.getItem('user') ? localStorage.getItem('user'): null,
    },
    reducers: {
        login_user(state,action) {
            localStorage.setItem('token',action.payload.token)
            localStorage.setItem('user_data',action.payload.user_data)
            localStorage.setItem('user',action.payload.user)
            return {
                ...state,
                is_authenticated:true
            };
        },
        logout(state){
            localStorage.clear();
            return {}
        }
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
