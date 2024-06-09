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
    increaseQuantity: (state, action) => {
      state.quantity++;
      action.payload.quantity++;
    },
  },
});

export const { addToCart, removeCart, removeAll, increaseQuantity } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
