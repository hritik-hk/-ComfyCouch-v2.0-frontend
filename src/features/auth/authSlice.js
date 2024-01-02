import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser , loginUser, signOut, checkAuth} from "./authAPI";

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response;
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (userData) => {
    const response = await loginUser(userData);
    return response;
  }
);

export const checkAuthAsync = createAsyncThunk(
  "user/checkAuth",
  async () => {
    const response = await checkAuth();
    return response;
  }
);

export const signOutAsync = createAsyncThunk(
  "user/signOut",
  async () => {
    const response = await signOut();
    return response;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUserToken: null, 
    status: "idle",
    error:null,
    userChecked:false, //to handle user is authenticated when browser is refreshed
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createUserAsync.fulfilled, (state,action) => {
        state.status = "idle"
        state.loggedInUserToken=action.payload
        state.error=null
      })
      .addCase(createUserAsync.rejected, (state,action) => {
        state.status = "idle"
        state.error=action.error.message
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loginUserAsync.fulfilled, (state,action) => {
        state.status = "idle"
        state.loggedInUserToken=action.payload
        state.error=null
      })
      .addCase(loginUserAsync.rejected, (state,action) => {
        state.status = "idle"
        state.error=action.error.message
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.status = "idle"
        state.loggedInUserToken=null
        state.error=null
      })
      .addCase(signOutAsync.rejected, (state,action) => {
        state.status = "idle"
        state.error=action.error.message
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(checkAuthAsync.fulfilled, (state,action) => {
        state.status = "idle"
        state.loggedInUserToken=action.payload
        state.userChecked=true //checks user is authenticated when browser is refreshed
        state.error=null
      })
      .addCase(checkAuthAsync.rejected, (state,action) => {
        state.status = "idle"
        state.userChecked=true
        state.error=action.error.message
      })
  },
})

export default authSlice.reducer
