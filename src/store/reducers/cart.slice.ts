import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../models/types";

export interface ICountExtend extends IProduct {
  count: number;
}

interface IInitialState {
  cart: ICountExtend[];
}

const initialState: IInitialState = {
  cart: JSON.parse(localStorage.getItem('cart') ?? "[]")
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ICountExtend>) => {
      state.cart = [...state.cart, action.payload];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateProduct: (state, action: PayloadAction<ICountExtend>) => {
      const index = state.cart.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state.cart[index] = action.payload;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const product = state.cart.filter(item => item.id !== action.payload);
      state.cart = [...product];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  },
})

const { actions, reducer } = cartSlice;
export default reducer;

export const { addProduct, updateProduct, removeProduct } = actions;