import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateUser,
  fetchLoggedInUser,
  fetchLoggedInUserOrders,
} from "./userAPI";

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const data = await updateUser(update);
    return data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async () => {
    const data = await fetchLoggedInUser();
    return data;
  }
);

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async () => {
    const data = await fetchLoggedInUserOrders();
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    userOrders: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.status = "idle";
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "idle";
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.status = "idle";
      })
      .addCase(fetchLoggedInUserAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "idle";
      })
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.error = null;
        state.status = "idle";
      })
      .addCase(fetchLoggedInUserOrdersAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "idle";
      });
  },
});

export default userSlice.reducer;
