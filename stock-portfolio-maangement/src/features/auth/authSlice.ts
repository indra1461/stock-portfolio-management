import { AuthState } from './authTypes';
import {createSlice} from "@reduxjs/toolkit";
import { clearAuthData } from "@/app/utils/storage";

const initialState: AuthState = {
    user:null,
    token:null,
    isAuthenticated:false,
    loading:false,
    error:null,
    initialized: false,
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

        restoreSession:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = !!action.payload.token;
            state.initialized = true;
        },
        setInitialized: (state) => {
            state.initialized = true;
        },
            logout:(state)=>{
                clearAuthData();
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = null;
            },
        },
    });

export const {loginSuccess,logout,restoreSession,setInitialized} = authSlice.actions;
export default authSlice.reducer;
