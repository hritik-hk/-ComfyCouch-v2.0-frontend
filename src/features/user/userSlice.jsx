import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUser, fetchLoggedInUser } from "./userAPI";

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const data = await updateUser(update);
    return data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
    "user/fetchLoggedInUser",
    async (id) => {
      const data = await fetchLoggedInUser(id);
      return data;
    }
  );

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    status: "idle",
    error:null
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state,action) => {
        state.userData=action.payload;
        state.status = "idle";
      })
      .addCase(updateUserAsync.rejected, (state,action) => {
        state.error=action.error.message;
        state.status = "idle";
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state,action) => {
        state.userData=action.payload;
        state.status = "idle";
      })
      .addCase(fetchLoggedInUserAsync.rejected, (state,action) => {
        state.error=action.error.message;
        state.status = "idle";
      })
  },
});

export default userSlice.reducer;
