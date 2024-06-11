import { createSlice } from "@reduxjs/toolkit";

const initialState = { carts: [], quantity: 0, currentItem: {} };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.carts.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.carts.push({ ...action.payload, quantity: 1 });
        state.quantity++;
      }
    },
    removeCart: (state, action) => {
      const remainingItems = state.carts.filter(
        (item) => item._id !== action.payload
      );
      state.carts = remainingItems;
      // state.quantity = remainingItems.reduce(
      //   (acc, item) => acc + item.quantity,
      //   0
      // );
      state.quantity = remainingItems.length;
    },
    removeAll: (state) => {
      state.carts = [];
      state.quantity = 0;
    },
    increaseQuantity: (state, action) => {
      const item = state.carts.find((item) => item._id === action.payload._id);
      if (item && item.quantity < action.payload.stockQuantity) {
        item.quantity++;
        // state.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.carts.find((item) => item._id === action.payload._id);
      if (item && item.quantity > 0) {
        item.quantity--;
        // state.quantity--;

        // Remove item from cart if quantity is 0
        if (item.quantity === 0) {
          state.carts = state.carts.filter(
            (cartItem) => cartItem._id !== action.payload._id
          );
          state.quantity--;
        }
      }
      // Ensure total quantity does not go negative
      if (state.quantity < 0) {
        state.quantity = 0;
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
