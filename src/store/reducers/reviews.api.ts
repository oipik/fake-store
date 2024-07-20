import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IReview, IReviewAdd } from "../../models/types";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/"
  }),
  endpoints: (builder) => ({
    getReviews: builder.query<IReview[], string>({
      query: (id: string) => `posts/${id}/comments`,
    }),
    addReview: builder.mutation<void, IReviewAdd>({
      query: (review: IReviewAdd) => ({
        url: `/posts`,
        method: "POST",
        body: review
      }),
    })
  })
})

export const { useGetReviewsQuery, useAddReviewMutation } = reviewsApi;