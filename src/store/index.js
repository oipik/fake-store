import { configureStore } from "@reduxjs/toolkit";
import products from "../components/products/productsSlice";
import product from "../components/product/productSlice";
import cart from "../components/cart/cartSlice"

const store = configureStore({
    reducer: {products, product, cart}
})

export default store;