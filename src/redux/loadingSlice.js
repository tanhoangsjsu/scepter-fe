import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name:"loading",
    initialState:{
        isLoading:false
    },
    reducers:{
        toggleLoading: (state)=>{
            state.isLoading = !state.isLoading;

        }
    }
})
export const {toggleLoading} = loadingSlice.actions;
export default loadingSlice.reducer;