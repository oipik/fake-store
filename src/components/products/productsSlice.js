import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp"

const initialState = {
    products: [],
    filters: [
        {id: 1, name: "All", label: "All"},
        {id: 2, name: "electronics", label: "Electronics"},
        {id: 3, name: "jewelery", label: "Jewelery"},
        {id: 4, name: "men's clothing", label: "Men"},
        {id: 5, name: "women's clothing", label: "Women"},
    ],
    activeFilter: "All",
    productsLoadingStatus: "idle",
}

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    () => {
        const { request } = useHttp();
        return request('https://fakestoreapi.com/products');
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, state => { state.productsLoadingStatus = "loading" })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.productsLoadingStatus = "idle";
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, state => { state.productsLoadingStatus = "error" })
            .addDefaultCase(() => { })
    }
})

const { reducer, actions } = productsSlice;

export const { changeActiveFilter } = actions;
export default reducer;