import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts, getById } from "../services/products";

const initialState = {
  products: [],
  product: {},
  page: 1,
  total: 0,
  limit: 20,
  loading: false,
  error: "",
  message: "",
};

export const listProducts = createAsyncThunk(
  "products/listProducts",
  async () => {
    try {
      console.log("we are inside slices");
      const response = await getAllProducts();

      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (id) => {
    try {
      console.log("we are inside slices");
      const response = await getById(id);
      // console.log("response slice", response?.data?.message?.data[0]);
      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    setLimit: (state, { payload }) => {
      state.page = 1;
      state.limit = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.message.total;
        state.products = action.payload.message;
        state.error = "";
        state.message = "";
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.message.total;
        state.product = action.payload.message.data;
        state.error = "";
        state.message = "";
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, setLimit } = productSlice.actions;
export const productReducer = productSlice.reducer;
