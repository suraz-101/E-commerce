import { createSlice } from "@reduxjs/toolkit";

const initialState = { carts: [], quantity: 0 };

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
        state.carts.push({ ...action.payload });
        state.quantity++;
      }
    },
    removeCart: (state, action) => {
      const remainingItems = state.carts.filter(
        (item) => item._id !== action.payload
      );
      state.carts = remainingItems;
      state.quantity = remainingItems.length;
    },
    removeAll: (state) => {
      state.carts = [];
      state.quantity = 0;
    },
  },
});

export const { addToCart, removeCart, removeAll } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
