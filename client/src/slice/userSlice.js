import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  changePass,
  getAllUsers,
  getById,
  updateAddress,
  updateUsersDetails,
} from "../services/users";

const initialState = {
  users: [],
  user: {},
  page: 1,
  total: 0,
  limit: 5,
  loading: false,
  error: "",
  message: "",
};

export const listUsers = createAsyncThunk(
  "users/listUsers",
  async ({ limit, page }) => {
    try {
      const response = await getAllUsers(limit, page);

      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const getSingleUser = createAsyncThunk(
  "users/getSingleUser",
  async (email) => {
    try {
      console.log("we are inside slices");
      const response = await getById(email);
      // console.log("response slice", response?.data?.message?.data[0]);
      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const updateUserAdd = createAsyncThunk(
  "users/updateUserAdd",
  async (payload) => {
    try {
      console.log("we are user slices update", payload);
      const response = await updateAddress(payload);
      // console.log("response slice", response?.data?.message?.data[0]);
      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload) => {
    try {
      console.log("we are user slices update", payload);
      const response = await updateUsersDetails(payload);
      // console.log("response slice", response?.data?.message?.data[0]);
      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (payload) => {
    try {
      console.log("we are user slices update", payload);
      const response = await changePass(payload);
      // console.log("response slice", response?.data?.message?.data[0]);
      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);
const userSlice = createSlice({
  name: "users",
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
      .addCase(listUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.message.total;
        state.users = action.payload.message;
        state.error = "";
        state.message = "";
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.message.total;
        state.user = action.payload.message;
        state.error = "";
        state.message = "";
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserAdd.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAdd.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.message = action.payload.message;
      })
      .addCase(updateUserAdd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.message = action.payload.message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.message = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.message = "";
        state.error = action.error.message;
      });
  },
});

export const { setPage, setLimit } = userSlice.actions;
export const userReducer = userSlice.reducer;
