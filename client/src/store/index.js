import { configureStore } from "@reduxjs/toolkit";
// import { blogReducer } from "../slices/blogSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { cartReducer } from "../slice/cartSlice";
import { productReducer } from "../slice/productSlice";
// import { userReducer } from "../slices/userSlice";

const persistCartConfig = {
  key: "e-commerce-cart",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistCart = persistReducer(persistCartConfig, cartReducer);
export const store = configureStore({
  reducer: {
    cart: persistCart,
    products: productReducer,
    // users: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    });
  },
});

export const newStore = persistStore(store);
