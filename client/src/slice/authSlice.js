// userSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, forgetPassword, login } from "../services/users";

const initialState = {
  token: "",
  error: "",
  message: "",
};

export const userLogin = createAsyncThunk(
  "users/userLogin",
  async (payload) => {
    try {
      const response = await login(payload);
      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const userRegistration = createAsyncThunk(
  "users/userRegistration",
  async (payload) => {
    try {
      const response = await createUser(payload);
      console.log(" slice response", response);
      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      console.log(error);
      throw Error(error.message);
    }
  }
);

export const sendOtp = createAsyncThunk("users/sendOtp", async (email) => {
  try {
    console.log("email slice", email);
    const response = await forgetPassword(email);
    console.log(" slice response", response);
    return response.data; // Assuming the response structure is { data: { total, data } }
  } catch (error) {
    console.log(error);
    throw Error(error.message);
  }
});

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
        state.token = action.payload.message;
        state.error = "";
        state.message = "";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(userRegistration.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.message;
        state.error = "";
        state.message = action.payload.message;
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.message;
        state.error = "";
        state.message = action.payload.message;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, setLimit } = authSlice.actions;
export const authReducer = authSlice.reducer;
