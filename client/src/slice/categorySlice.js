import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCategory, getAllCategories } from "../services/category";
// import { getAllProducts, getById, removeProduct } from "../services/products";

const initialState = {
  categories: [],
  category: {},
  page: 1,
  total: 0,
  limit: 20,
  loading: false,
  error: "",
  message: "",
};

export const listCategories = createAsyncThunk(
  "categories/listCategories",
  async () => {
    try {
      const response = await getAllCategories();
      console.log(response);

      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (payload) => {
    try {
      const response = await addCategory(payload);
      console.log(response);

      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

// export const getSingleProduct = createAsyncThunk(
//   "products/getSingleProduct",
//   async (id) => {
//     try {
//       console.log("we are inside slices");
//       const response = await getById(id);
//       // console.log("response slice", response?.data?.message?.data[0]);
//       return response.data; // Assuming the response structure is { data: { total, data } }
//     } catch (error) {
//       throw Error(error.message);
//     }
//   }
// );

// export const deleteSingleProduct = createAsyncThunk(
//   "products/deleteSingleProduct",
//   async (id) => {
//     try {
//       console.log("we are inside delete slices", id);
//       const response = await removeProduct(id);
//       // console.log("response slice", response?.data?.message?.data[0]);
//       return response.data; // Assuming the response structure is { data: { total, data } }
//     } catch (error) {
//       throw Error(error.message);
//     }
//   }
// );

const categorySlice = createSlice({
  name: "categories",
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
      .addCase(listCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(listCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.message.total;
        state.categories = action.payload.message;
        state.error = "";
        state.message = "";
      })
      .addCase(listCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        // state.total = action.payload.message.total;
        // state.categories = action.payload.message;
        state.error = "";
        state.message = action.payload.message;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.message = "";
        state.error = action.error.message;
      });
  },
});

export const { setPage, setLimit } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
