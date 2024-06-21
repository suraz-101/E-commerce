import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "../services/users";

const initialState = {
  users: [],
  user: {},
  page: 1,
  total: 0,
  limit: 20,
  loading: false,
  error: "",
  message: "",
};

export const listUsers = createAsyncThunk("users/listUsers", async () => {
  try {
    console.log("we are inside slices");
    const response = await getAllUsers();

    return response.data; // Assuming the response structure is { data: { total, data } }
  } catch (error) {
    throw Error(error.message);
  }
});

// export const getSingleUser = createAsyncThunk(
//   "users/getSingleUser",
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
      });
    //   .addCase(getSingleUser.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(getSingleUser.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.total = action.payload.message.total;
    //     state.user = action.payload.message.data;
    //     state.error = "";
    //     state.message = "";
    //   })
    //   .addCase(getSingleUser.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message;
    //   });
  },
});

export const { setPage, setLimit } = userSlice.actions;
export const userReducer = userSlice.reducer;
