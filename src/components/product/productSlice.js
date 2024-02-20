import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp"

const initialState = {
    product: {},
    productLoadingStatus: "idle",
}

export const fetchProduct = createAsyncThunk(
    "product/fetchProduct",
    (id) => {
        const { request } = useHttp();
        return request(`https://fakestoreapi.com/products/${id}`);
    }
)

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProduct.pending, state => { state.productLoadingStatus = "loading" })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.productLoadingStatus = "idle";
                state.product = action.payload;
            })
            .addCase(fetchProduct.rejected, state => { state.productLoadingStatus = "error" })
            .addDefaultCase(() => { })
    }
})

const { reducer } = productSlice;

export default reducer;
