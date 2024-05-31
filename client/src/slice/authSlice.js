// userSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../services/users";

const initialState = {
  token: "",
};

export const userLogin = createAsyncThunk(
  "users/userLogin",
  async (payload) => {
    try {
      // console.log(email);
      const response = await login(payload);
      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
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
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.message.data;
        state.error = "";
        state.message = "";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, setLimit } = authSlice.actions;
export const authReducer = authSlice.reducer;
