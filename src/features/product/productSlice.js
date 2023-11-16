import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProducts,fetchProductsByFilter, fetchBrands,fetchColors,fetchCategories} from "./productAPI";


//action fetchAllProductAsync
export const fetchAllProductAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const data = await fetchAllProducts();
    return data;
  }
);

export const fetchProductsByFilterAsync= createAsyncThunk(
  'product/fetchProductsByFilter',
  async (filter) => {
    const data = await fetchProductsByFilter(filter);
    return data;
  }
)

export const fetchBrandsAsync= createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const data = await fetchBrands();
    return data;
  }
)

export const fetchCategoriesAsync= createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const data = await fetchCategories();
    return data;
  }
)

export const fetchColorsAsync= createAsyncThunk(
  'product/fetchColors',
  async () => {
    const data = await fetchColors();
    return data;
  }
)

export const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
    colors:[],
    brands:[],
    categories:[],
    status: "idle"
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.productList=action.payload
      })
      .addCase(fetchAllProductAsync.rejected, (state,action) => {
        state.status = "idle"
        state.error=action.error.message
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.productList=action.payload
      })
      .addCase(fetchProductsByFilterAsync.rejected, (state, action) => {
        state.status = "idle"
        state.error=action.error.message
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.brands=action.payload
      })
      .addCase(fetchBrandsAsync.rejected, (state, action) => {
        state.status = "idle"
        state.error=action.error.message
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.categories=action.payload
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = "idle"
        state.error=action.error.message
      })
      .addCase(fetchColorsAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchColorsAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.colors=action.payload
      })
      .addCase(fetchColorsAsync.rejected, (state, action) => {
        state.status = "idle"
        state.error=action.error.message
      })
  },
});


export default productSlice.reducer