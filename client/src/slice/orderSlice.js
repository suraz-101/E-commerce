import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getOrdersOfUser } from "../services/order";
// import {
//   createProduct,
//   getAllProducts,
//   getById,
//   removeProduct,
// } from "../services/products";

const initialState = {
  orders: [],
  usersOrder: [],
  order: {},
  page: 1,
  total: 0,
  limit: 10,
  loading: false,
  error: "",
  message: "",
};

export const createNewOrder = createAsyncThunk(
  "orders/createNewOrder",
  async (payload) => {
    try {
      console.log("order slice", payload);
      const response = await createOrder(payload);
      console.log(response);

      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const getUserOrder = createAsyncThunk(
  "orders/getUserOrder",
  async (email) => {
    try {
      console.log("order slice", email);
      const response = await getOrdersOfUser(email);

      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

//

const orderSlice = createSlice({
  name: "orders",
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
      .addCase(createNewOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.message = action.payload.message;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.usersOrder = action.payload.message;
      })
      .addCase(getUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, setLimit } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
