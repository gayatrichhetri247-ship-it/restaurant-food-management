import { createSlice } from "@reduxjs/toolkit";

const authSlice =  createSlice({
    name:"auth",
    initialState:{
        user:null,
        isAuthenticted:false,
    },
    reducers:{ 
        loginSuccess:(state,action)=>{
            state.user=action.payload;
            state.isAuthenticted=true
        }
     },
});
export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;