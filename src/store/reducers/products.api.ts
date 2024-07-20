import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../../models/types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com/",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: `products`,
      }),
    }),
    getProduct: builder.query<IProduct, string>({
      query: (id: string) => ({
        url: `products/${id}`,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
