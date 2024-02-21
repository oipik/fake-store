import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const json = JSON.parse(localStorage.getItem('cart'));
const data = json === null ? [] : json;

const cartAdapter = createEntityAdapter()
const initial = cartAdapter.getInitialState();
const initialState = cartAdapter.upsertMany(initial, data);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: cartAdapter.addOne,
        removeProduct: cartAdapter.removeOne,
        updateProduct: cartAdapter.upsertOne
    },
})

const { actions, reducer } = cartSlice;

export default reducer;

export const { addProduct, updateProduct, removeProduct } = actions;

export const { 
    selectAll,
    selectTotal 
} = cartAdapter.getSelectors(state => state.cart);