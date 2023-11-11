import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProducts } from "./productAPI";

//action fetchAllProductAsync
export const fetchAllProductAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const data = await fetchAllProducts();
    return data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
    status: "idle",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.productList = action.payload;
      });
  },
});


export default productSlice.reducer