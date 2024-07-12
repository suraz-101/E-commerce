import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCarosel } from "../services/carosel";

const initialState = {
  carosels: [],
  carosel: {},
  page: 1,
  total: 0,
  limit: 10,
  loading: false,
  error: "",
  message: "",
};

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

const caroselSlice = createSlice({
  name: "carosels",
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
      });
  },
});

export const { setPage, setLimit } = caroselSlice.actions;
export const caroselReducer = caroselSlice.reducer;
