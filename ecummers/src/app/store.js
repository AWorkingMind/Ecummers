import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/slices/cartSlice";
import adminReducer from '../features/slices/AdminSlids';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    admin: adminReducer,
  },
});
