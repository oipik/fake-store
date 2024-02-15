import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    // total: 0,
    // count: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            console.log(typeof action.payload);
            console.log(action.payload);

            state.data.push(action.payload);
            console.log(state.data)
        },
    },
    // extraReducers: builder => {
    //     builder
    //         .addCase(fetchProducts.pending, state => { state.productsLoadingStatus = "loading" })
    //         .addCase(fetchProducts.fulfilled, (state, action) => {
    //             state.productsLoadingStatus = "idle";
    //             state.products = action.payload;
    //         })
    //         .addCase(fetchProducts.rejected, state => { state.productsLoadingStatus = "error" })
    //         .addDefaultCase(() => { })
    // }
})

const { actions, reducer } = cartSlice;

export default reducer;

export const { addProduct } = actions;

// export const {}