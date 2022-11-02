import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "req",
    initialState:{
        request:{
            currentRequest:null,
            isFetching:false,
            error: false,
            success: true,
        }
    },
    reducers:{
        requestStart: (state)=>{
            state.request.isFetching = true; 
        },
        requestSuccess: (state, action) =>{
            state.request.isFetching = false;
            state.request.error = false;
            state.request.currentRequest = action.payload;
        },
        requestFailed:(state)=>{
            state.request.error = true; 
        }
    }
})
export const {requestStart, requestSuccess, requestFailed} = requestSlice.actions;
export default requestSlice.reducer