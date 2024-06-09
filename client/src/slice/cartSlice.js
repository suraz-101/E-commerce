import { createSlice, current } from "@reduxjs/toolkit";

const initialState = { carts: [], quantity: 0, currentItem: {} };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action);
      const existingItem = state.carts.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.carts.push({ ...action.payload, quantity: 1 });
        state.quantity++;
      }
    },
    removeCart: (state, action) => {
      console.log("action", action);
      const remainingItems = state.carts.filter(
        (item) => item._id !== action.payload
      );
      console.log("remaining", remainingItems);
      state.carts = remainingItems;
      const item = state.carts.find((item) => item._id !== action.payload);
      !item ? (state.quantity = 0) : (state.quantity = item.quantity);
    },
    removeAll: (state) => {
      state.carts = [];
      state.quantity = 0;
    },
    increaseQuantity: (state, action) => {
      const item = state.carts.find((item) => item._id === action.payload._id);
      if (item) {
        if (item.quantity < action.payload.stockQuantity) {
          item.quantity++;
          state.quantity++;
        }
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.carts.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity--;
        state.quantity--;
      }
    },
  },
});

export const {
  addToCart,
  removeCart,
  removeAll,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
