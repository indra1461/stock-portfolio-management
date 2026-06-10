import { AuthState } from './authTypes';
import {createSlice} from "@reduxjs/toolkit";

const initialState: AuthState = {
    user:null,
    token:null,
    isAuthenticated:false,
    loading:false,
    error:null
}


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{ 
        loginSuccess:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        state.error = null;
    },
            logout:(state)=>{
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = null;
            },
        },
    });

export const {loginSuccess,logout} = authSlice.actions;
export default authSlice.reducer;
