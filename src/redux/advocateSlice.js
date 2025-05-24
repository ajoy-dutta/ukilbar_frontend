import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../Components/AxiosInstance";


export const fetchAdvocates = createAsyncThunk(
  "advocate/fetchAdvocates",
  async () =>{
    const response =await AxiosInstance.get("advocates/");
    return response.data;
  }
)


const advocateSlice = createSlice ({
    name: "advocate",
    initialState : {
        advocates : [],
        status : "idle",
        error : null,
    },
    reducers: {},
    extraReducers: (builder) => {
       builder
      .addCase(fetchAdvocates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdvocates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.advocates = action.payload;
      })
      .addCase(fetchAdvocates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    }
});

export default advocateSlice.reducer