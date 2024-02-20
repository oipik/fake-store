import { createSlice } from "@reduxjs/toolkit";

const json = JSON.parse(localStorage.getItem('cart'));
const state = json === null ? { data: [], total: 0 } : json;

console.log(state);

const initialState = {
    data: state.data,
    total: state.total,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.data.push(action.payload);
            state.total++;
        },
        removeProduct: (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload);
            state.total--;
        },
        updateProduct: (state, action) => {
            const { id, count } = action.payload;
            state.data = state.data.map(item => {
                if (item.id === +id) {
                    return { ...item, count: item.count + count}
                } else {
                    return item;
                }
            })
        },
    },
})

const { actions, reducer } = cartSlice;

export default reducer;

export const { addProduct, updateProduct, removeProduct } = actions;