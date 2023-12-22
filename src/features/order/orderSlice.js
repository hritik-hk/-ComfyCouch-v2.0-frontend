import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder } from "./orderAPI";

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const data = await createOrder(order);
    return data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    currentOrderPlaced: null,
    status: "idle",
    error: null,
  },

  reducers: {
    resetOrder: (state) => {
      state.currentOrderPlaced = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.currentOrderPlaced = action.payload;
        state.error = null;
        state.status = "idle";
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "idle";
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
