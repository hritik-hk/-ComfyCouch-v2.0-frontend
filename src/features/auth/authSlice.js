import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser ,  checkUser, signOut} from "./authAPI";

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response;
  }
);

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (userData) => {
    const response = await checkUser(userData);
    return response;
  }
);

export const signOutAsync = createAsyncThunk(
  "user/signOut",
  async (userId) => {
    const response = await signOut(userId);
    return response;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: null,
    status: "idle",
    error:null
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
        state.error=null
      })
      .addCase(createUserAsync.rejected, (state,action) => {
        state.status = "idle"
        state.error=action.error.message
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(checkUserAsync.fulfilled, (state,action) => {
        state.status = "idle"
        state.loggedInUser=action.payload
        state.error=null
      })
      .addCase(checkUserAsync.rejected, (state,action) => {
        state.status = "idle"
        state.error=action.error.message
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.status = "idle"
        state.loggedInUser=null
        state.error=null
      })
      .addCase(signOutAsync.rejected, (state,action) => {
        state.status = "idle"
        state.error=action.error.message
      })
  },
})

export default authSlice.reducer
