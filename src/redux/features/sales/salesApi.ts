import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSale: builder.mutation({
      query: (payload) => ({
        url: `/create-sale/${payload.productId}`,
        method: "POST",
        body: payload.data,
      }),
      invalidatesTags: ["products", "sales"],
    }),
    getSales: builder.query({
      query: (param) => ({
        url: `/sales/${param}`,
        method: "GET",
      }),
      providesTags: ["sales"],
    }),
  }),
});

export const { useCreateSaleMutation, useGetSalesQuery } = salesApi;
