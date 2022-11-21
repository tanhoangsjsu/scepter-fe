import { createSlice } from "@reduxjs/toolkit";

export const requestSlice = createSlice({
    name:"request",
    initialState:{
        requests: [
            {
                id:1,
                username:"",
                pickup:"",
                dropoff:"",
            },
        ],
    },
    reducers:{
        createRequest:(state,action)=>{
            state.requests = [...state.requests,action.payload]
        },
        deleteRequest:(state,action)=>{
            const nextRequest = state.requests.filter(request=> request.id !== action.payload.id)
            state.requests = nextRequest
        },
        updateRequest:(state,action)=>{
            state.requests = action.payload
        }
    }
})

export const {createRequest, deleteRequest,updateRequest} = requestSlice.actions;
export default requestSlice.reducer