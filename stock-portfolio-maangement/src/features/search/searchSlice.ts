import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {SearchState, StockSearchResult} from "./searchTypes";

const initialState: SearchState = {
    results:[],
    loading: false,
    error:null,

}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers:{
        searchStart:(state)=>{
            state.loading = true;
            state.error = null;

        },
        searchSuccess:(state,action:PayloadAction<StockSearchResult[]>)=>{
            state.loading = false;
            state.results = action.payload;
            state.error = null;
        },
        searchFailure:(state,action:PayloadAction<string>)=>{
            state.loading = false;
            state.error = action.payload;
        }

    }

})
export const {searchStart, searchSuccess, searchFailure} = searchSlice.actions;
export default searchSlice.reducer;

