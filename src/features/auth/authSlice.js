import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser } from "./authAPI";

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: null,
    status: "idle",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createUserAsync.fulfilled, (state,action) => {
        state.status = "idle"
        state.loggedInUser=action.payload
      })
      .addCase(createUserAsync.rejected, (state,action) => {
        state.status = "idle"
        state.error=action.error.message
      });
  },
})

export default authSlice.reducer
