import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

//Initial State for the redux slice
let initialState ={
    success:false,
    message:"",
    user:{},
    loading:false,
}

//Create an asynchronous action for user registration
export const signUpUser = createAsyncThunk(
    "users/signUpUser",
    async (body,thunkAPI) => {
        const result = await axios.post("http://localhost:8000/user/signup",
        body,{
            headers:{"Content-Type":"multipart/form-data"}
        })
        //Handle server response
        if(result.data.success){
            console.log("Signup result",result.data)
            return result.data
        }
        else{
            return thunkAPI.rejectWithValue(result.data);
        }
    }

)
//Create a Redux slice for user authentication
const authSlice = createSlice({
    name: "user",
    initialState,

    reducers:{
        clearState: (state) => {
            state.message ="";
            state.user="";
            state.loading = false;
            return state;
        }
    },
    extraReducers: {
        
        //Handle pending registration
        [signUpUser.pending]: (state, {payload} ) => {
            state.loading = true;
            state.message = "";
        },
        //Handle successful registration
        [signUpUser.fulfilled]: (state, {payload} ) => {
            state.loading = false;
            state.message = payload.message
            state.success = payload.success
        },
        //Handle failed registration
        [signUpUser.rejected]: (state, {payload}) => {
            state.loading = false;
            state.message = ""
        }
    }
})

export const {clearState} = authSlice.actions
export default authSlice.reducer;