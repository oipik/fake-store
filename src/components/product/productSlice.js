import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp"

const initialState = {
    product: {},
    reviews: [],
    productLoadingStatus: "idle",
    reviewsLoadingStatus: "idle"
}

export const fetchProduct = createAsyncThunk(
    "product/fetchProduct",
    (id) => {
        const { request } = useHttp();
        return request(`https://fakestoreapi.com/products/${id}`);
    }
)

export const fetchReviews = createAsyncThunk(
    "product/fetchReviews",
    () => {
        const { request } = useHttp();
        return request(`http://localhost:3001/reviews`);
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

            .addCase(fetchReviews.pending, state => { state.reviewsLoadingStatus = "loading" })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.reviewsLoadingStatus = "idle";
                state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, state => { state.reviewsLoadingStatus = "error" })

            .addDefaultCase(() => { })
    }
})

const { reducer } = productSlice;

export default reducer;
