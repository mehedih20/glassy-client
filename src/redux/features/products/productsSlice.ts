import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "../../../types/product.types";

type initialStateType = {
  product: TProduct | object;
};

const initialState: initialStateType = {
  product: {},
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    clearProduct: (state) => {
      state.product = {};
    },
  },
});

export const { setProduct, clearProduct } = productsSlice.actions;

export default productsSlice.reducer;
