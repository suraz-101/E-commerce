import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCarosel,
  createProduct,
  getAllProducts,
  getById,
  removeProduct,
  updateQuantity,
} from "../services/products";

const initialState = {
  products: [],
  product: {},
  newArrival: [],
  carosel: [],
  page: 1,
  total: 0,
  limit: 10,
  loading: false,
  error: "",
  message: "",
};

export const createNewProduct = createAsyncThunk(
  "products/createNewProduct",
  async (payload) => {
    try {
      const response = await createProduct(payload);
      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const createCaroselProduct = createAsyncThunk(
  "products/createCaroselProduct",
  async (payload) => {
    try {
      const response = await createCarosel(payload);
      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const listProducts = createAsyncThunk(
  "products/listProducts",
  async ({ sort, limit, page, category }) => {
    try {
      const response = await getAllProducts(sort, limit, page, category);
      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const newArrivals = createAsyncThunk(
  "products/newArrivals",
  async ({ sort, limit, page, category }) => {
    try {
      const response = await getAllProducts(sort, limit, page, category);
      console.log(response);
      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (slug) => {
    try {
      const response = await getById(slug);
      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const deleteSingleProduct = createAsyncThunk(
  "products/deleteSingleProduct",
  async (id) => {
    try {
      const response = await removeProduct(id);
      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const updateProductQuantity = createAsyncThunk(
  "products/updateProductQuantity",
  async (payload) => {
    try {
      console.log("we are inside update slices", payload);
      const response = await updateQuantity(payload);
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
      .addCase(createNewProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.message = action.payload.message;
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCaroselProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCaroselProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.message = action.payload.message;
      })
      .addCase(createCaroselProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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

      .addCase(newArrivals.pending, (state) => {
        state.loading = true;
      })
      .addCase(newArrivals.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.message.total;
        state.newArrival = action.payload.message;
        state.error = "";
        state.message = "";
      })
      .addCase(newArrivals.rejected, (state, action) => {
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
      })
      .addCase(deleteSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.message.total;
        state.error = "";
        state.message = "";
      })
      .addCase(deleteSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProductQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        state.loading = false;
        // state.total = action.payload.message.total;
        state.error = "";
        // state.message = action.payload.message;
      })
      .addCase(updateProductQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, setLimit } = productSlice.actions;
export const productReducer = productSlice.reducer;
