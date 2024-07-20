import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./reducers/products.api";
import { reviewsApi } from "./reducers/reviews.api";
import products from "./reducers/products.slice";
import cart from "./reducers/cart.slice";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    products,
    cart
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, reviewsApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
